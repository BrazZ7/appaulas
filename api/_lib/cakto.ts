/**
 * Regras de integração com a Cakto (webhooks), sem dependência de rede — testável.
 * Documentação seguida: https://docs.cakto.com.br/conceitos/webhooks
 *  - corpo: { secret, event, data }  (data pode vir como lista no Webhook V2)
 *  - headers: X-Cakto-Timestamp e X-Cakto-Signature = "v1=<hmac-sha256(secret, `${timestamp}.${corpoCru}`)>"
 *  - responder 2xx em até 8 s; o mesmo evento pode chegar mais de uma vez (deduplicar por data.id + evento)
 */
import crypto from 'node:crypto';
import { areasDoProduto } from './areas.js';

export type Acao = 'ativar' | 'atrasar' | 'desativar' | 'ignorar';

export const EVENTOS: Record<string, Acao> = {
  purchase_approved: 'ativar',
  subscription_renewed: 'ativar',
  subscription_resumed: 'ativar',
  subscription_late_recovered: 'ativar',
  subscription_late: 'atrasar',
  subscription_renewal_refused: 'atrasar',
  refund: 'desativar',
  chargeback: 'desativar',
  subscription_canceled: 'desativar',
  subscription_paused: 'desativar',
};

const TOLERANCIA_S = 5 * 60;

function igualSeguro(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/** Assinatura no header (preferida). Aceita lista "v1=...,v2=..." e compara só a v1. */
export function assinaturaValida(corpoCru: string, timestamp: string | null, assinatura: string | null, segredo: string, agoraS = Date.now() / 1000) {
  if (!timestamp || !assinatura) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(agoraS - ts) > TOLERANCIA_S) return false;
  const esperado = 'v1=' + crypto.createHmac('sha256', segredo).update(`${timestamp}.`).update(corpoCru).digest('hex');
  return assinatura.split(',').map((s) => s.trim()).some((s) => igualSeguro(s, esperado));
}

export interface Pedido {
  id: string;
  status?: string;
  offer_type?: string;
  customer?: { name?: string; email?: string };
  product?: { id?: string; short_id?: string; name?: string };
  subscription?: { id?: string | number } | null;
}

export interface PerfilResumo { id: string; role: 'superadmin' | 'assinante'; status: string }

/** Operações no banco/autenticação — implementadas com Supabase no endpoint e com mocks nos testes. */
export interface Admin {
  registrarEvento(pedidoId: string, evento: string, email: string | null, payload: unknown): Promise<boolean>; // false = já processado
  finalizarEvento(pedidoId: string, evento: string, resultado: string): Promise<void>;
  buscarPerfil(email: string): Promise<PerfilResumo | null>;
  convidar(email: string, nome: string | null): Promise<string>; // cria o usuário e envia o e-mail de convite; devolve o id
  atualizarPerfil(id: string, dados: Record<string, unknown>): Promise<void>;
  /** Grava (ou atualiza) o acesso da conta a um produto: quais áreas ele libera e se está ativo. */
  salvarAcesso(userId: string, produto: string, dados: { areas: string[]; status: StatusAcesso; cakto_pedido: string; cakto_assinatura: string | null }): Promise<void>;
  /** Status de todos os acessos da conta, para calcular o status geral. */
  statusDosAcessos(userId: string): Promise<StatusAcesso[]>;
}

export type StatusAcesso = 'ativo' | 'atrasado' | 'inativo';

export interface Config {
  segredo: string;
  /** ids de produto que liberam tudo (plano Tudo Liberado) */
  tudo?: string[];
  /** ids de produto extras tratados como a plataforma do professor ("sala") */
  produtos: string[];
}

/** Status geral da conta: ativo se algum acesso está ativo; atrasado se só há atrasados; senão inativo. */
export function statusGeral(lista: StatusAcesso[]): StatusAcesso {
  if (lista.includes('ativo')) return 'ativo';
  if (lista.includes('atrasado')) return 'atrasado';
  return 'inativo';
}

export interface Resultado { status: number; corpo: { ok: boolean; mensagem: string; detalhes?: string[] } }

export async function processarWebhook(corpoCru: string, headers: { get(n: string): string | null }, cfg: Config, admin: Admin): Promise<Resultado> {
  if (!cfg.segredo) return { status: 500, corpo: { ok: false, mensagem: 'CAKTO_WEBHOOK_SECRET não configurado' } };

  let payload: { secret?: string; event?: string; data?: Pedido | Pedido[] };
  try {
    payload = JSON.parse(corpoCru);
  } catch {
    return { status: 400, corpo: { ok: false, mensagem: 'JSON inválido' } };
  }

  const porHeader = assinaturaValida(corpoCru, headers.get('x-cakto-timestamp'), headers.get('x-cakto-signature'), cfg.segredo);
  const porCorpo = typeof payload.secret === 'string' && igualSeguro(payload.secret, cfg.segredo);
  if (!porHeader && !porCorpo) return { status: 401, corpo: { ok: false, mensagem: 'origem não confirmada' } };

  const evento = payload.event ?? '';
  const acao = EVENTOS[evento] ?? 'ignorar';
  if (acao === 'ignorar' || !payload.data) return { status: 200, corpo: { ok: true, mensagem: `evento ${evento || '?'} ignorado` } };

  const pedidos = Array.isArray(payload.data) ? payload.data : [payload.data];
  const detalhes: string[] = [];
  for (const p of pedidos) detalhes.push(await processarPedido(evento, acao, p, cfg, admin));
  return { status: 200, corpo: { ok: true, mensagem: 'processado', detalhes } };
}

export async function processarPedido(evento: string, acao: Acao, p: Pedido, cfg: Config, admin: Admin): Promise<string> {
  const email = p.customer?.email?.trim().toLowerCase() || null;
  if (!p.id) return 'pedido sem id';
  const areas = areasDoProduto(p.product, { tudo: cfg.tudo ?? [], sala: cfg.produtos });
  if (!areas) return `${p.id}: produto fora do Ensinaê, ignorado`;
  const novo = await admin.registrarEvento(p.id, evento, email, p);
  if (!novo) return `${p.id}: ${evento} já processado`;
  if (!email) {
    await admin.finalizarEvento(p.id, evento, 'sem e-mail do comprador');
    return `${p.id}: sem e-mail`;
  }

  const resultado = await aplicar(acao, evento, p, email, areas, admin);
  await admin.finalizarEvento(p.id, evento, resultado);
  return `${p.id}: ${resultado}`;
}

async function aplicar(acao: Acao, evento: string, p: Pedido, email: string, areas: string[], admin: Admin): Promise<string> {
  const perfil = await admin.buscarPerfil(email);
  const produto = p.product?.id ?? p.product?.short_id ?? 'desconhecido';
  const assinatura = p.subscription?.id != null ? String(p.subscription.id) : null;
  const dadosCakto = {
    ultimo_evento: evento,
    cakto_pedido: p.id,
    cakto_produto: p.product?.short_id ?? p.product?.id ?? null,
    cakto_assinatura: assinatura,
  };
  const rotulo = areas.join(', ');

  if (acao === 'ativar') {
    let id = perfil?.id;
    let criado = false;
    if (!id) {
      id = await admin.convidar(email, p.customer?.name ?? null);
      criado = true;
    }
    await admin.salvarAcesso(id, produto, { areas, status: 'ativo', cakto_pedido: p.id, cakto_assinatura: assinatura });
    if (perfil?.role === 'superadmin') return `superadmin: área ${rotulo} registrada`;
    const geral = statusGeral(await admin.statusDosAcessos(id));
    await admin.atualizarPerfil(id, criado ? { ...dadosCakto, status: geral, origem: 'cakto', nome: p.customer?.name ?? null } : { ...dadosCakto, status: geral });
    if (criado) return `conta criada, área ${rotulo} liberada e convite enviado`;
    return perfil?.status === 'ativo' ? `área ${rotulo} liberada (conta já ativa)` : `área ${rotulo} liberada e conta reativada`;
  }

  if (!perfil) return 'sem conta para alterar';
  if (perfil.role === 'superadmin') return 'superadmin não é alterado por eventos da Cakto';
  const novo: StatusAcesso = acao === 'atrasar' ? 'atrasado' : 'inativo';
  await admin.salvarAcesso(perfil.id, produto, { areas, status: novo, cakto_pedido: p.id, cakto_assinatura: assinatura });
  const geral = statusGeral(await admin.statusDosAcessos(perfil.id));
  await admin.atualizarPerfil(perfil.id, { ...dadosCakto, status: geral });
  if (acao === 'atrasar') return `área ${rotulo} marcada como atrasada (acesso mantido)`;
  return geral === 'inativo' ? `área ${rotulo} bloqueada; conta sem acessos ativos` : `área ${rotulo} bloqueada; outras áreas continuam liberadas`;
}
