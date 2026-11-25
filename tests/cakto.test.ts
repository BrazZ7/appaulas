import { describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import { assinaturaValida, processarWebhook, type Admin, type PerfilResumo } from '../api/_lib/cakto';

const SEGREDO = 'b3f1a9c2-7b4d-4a8e-9f01-2c6d5b8a4e37';

/** Banco em memória que imita o Supabase. */
function bancoFalso() {
  const perfis = new Map<string, PerfilResumo & { email: string; dados: Record<string, unknown> }>();
  const eventos = new Map<string, boolean>();
  const convites: string[] = [];
  const acessos = new Map<string, { areas: string[]; status: 'ativo' | 'atrasado' | 'inativo' }>();
  const admin: Admin = {
    async salvarAcesso(userId, produto, dados) { acessos.set(`${userId}|${produto}`, { areas: dados.areas, status: dados.status }); },
    async statusDosAcessos(userId) { return [...acessos.entries()].filter(([k]) => k.startsWith(`${userId}|`)).map(([, v]) => v.status); },
    async registrarEvento(pedido, evento) { const k = `${pedido}|${evento}`; if (eventos.get(k)) return false; eventos.set(k, false); return true; },
    async finalizarEvento(pedido, evento) { eventos.set(`${pedido}|${evento}`, true); },
    async buscarPerfil(email) { return [...perfis.values()].find((p) => p.email === email) ?? null; },
    async convidar(email) { const id = `u${perfis.size + 1}`; perfis.set(id, { id, email, role: 'assinante', status: 'inativo', dados: {} }); convites.push(email); return id; },
    async atualizarPerfil(id, dados) { const p = perfis.get(id)!; Object.assign(p.dados, dados); if (dados.status) p.status = String(dados.status); },
  };
  /** Áreas liberadas (acessos ativos ou atrasados) de uma conta. */
  const areas = (userId: string) => [...acessos.entries()].filter(([k, v]) => k.startsWith(`${userId}|`) && v.status !== 'inativo').flatMap(([, v]) => v.areas).sort();
  return { admin, perfis, convites, acessos, areas };
}

const pedido = (id: string, email: string, extra: Record<string, unknown> = {}) => ({
  id, refId: 'X1', status: 'paid', offer_type: 'main',
  customer: { name: 'Maria Souza', email },
  product: { id: 'prod-uuid', short_id: '42bruPi', name: 'Ensinaê' },
  subscription: { id: 77 }, ...extra,
});
const corpo = (event: string, data: unknown, secret = SEGREDO) => JSON.stringify({ secret, event, data });
const semHeaders = { get: () => null };
const assinar = (raw: string, ts = Math.floor(Date.now() / 1000)) => {
  const sig = 'v1=' + crypto.createHmac('sha256', SEGREDO).update(`${ts}.`).update(raw).digest('hex');
  return { get: (n: string) => (n === 'x-cakto-timestamp' ? String(ts) : n === 'x-cakto-signature' ? sig : null) };
};
const cfg = { segredo: SEGREDO, produtos: ['42bruPi'], tudo: ['TUDO59'] };
const KIT_FOCO = 'b287bb51-d915-4c45-81a3-21253c2b8f25';
const PREMIUM = 'f2f25c1f-59d6-4b56-899a-0813e4bbc8d1';
const PRANCHAS = '329928de-c481-4eb3-9273-15a1579c6adc';
const comProduto = (id: string, email: string, prod: string) => pedido(id, email, { product: { id: prod, name: 'Kit' }, subscription: null });

describe('webhook da Cakto', () => {
  it('compra aprovada cria a conta, ativa e envia o convite ao e-mail do comprador', async () => {
    const db = bancoFalso();
    const r = await processarWebhook(corpo('purchase_approved', pedido('p1', 'Maria@Exemplo.com')), semHeaders, cfg, db.admin);
    expect(r.status).toBe(200);
    expect(db.convites).toEqual(['maria@exemplo.com']);
    const p = [...db.perfis.values()][0];
    expect(p.status).toBe('ativo');
    expect(p.dados).toMatchObject({ cakto_pedido: 'p1', cakto_produto: '42bruPi', cakto_assinatura: '77', origem: 'cakto' });
  });

  it('reentrega do mesmo evento não cria convite duplicado', async () => {
    const db = bancoFalso();
    const raw = corpo('purchase_approved', pedido('p1', 'a@b.com'));
    await processarWebhook(raw, semHeaders, cfg, db.admin);
    const r = await processarWebhook(raw, semHeaders, cfg, db.admin);
    expect(db.convites.length).toBe(1);
    expect(r.corpo.detalhes?.[0]).toMatch(/já processado/);
  });

  it('cancelamento, reembolso e chargeback bloqueiam; renovação reativa; atraso mantém o acesso', async () => {
    const db = bancoFalso();
    await processarWebhook(corpo('purchase_approved', pedido('p1', 'a@b.com')), semHeaders, cfg, db.admin);
    const st = () => [...db.perfis.values()][0].status;
    await processarWebhook(corpo('subscription_late', pedido('p2', 'a@b.com')), semHeaders, cfg, db.admin);
    expect(st()).toBe('atrasado');
    await processarWebhook(corpo('subscription_canceled', pedido('p3', 'a@b.com')), semHeaders, cfg, db.admin);
    expect(st()).toBe('inativo');
    await processarWebhook(corpo('subscription_renewed', pedido('p4', 'a@b.com')), semHeaders, cfg, db.admin);
    expect(st()).toBe('ativo');
    for (const ev of ['refund', 'chargeback']) {
      await processarWebhook(corpo('subscription_renewed', pedido(`r-${ev}`, 'a@b.com')), semHeaders, cfg, db.admin);
      await processarWebhook(corpo(ev, pedido(`x-${ev}`, 'a@b.com')), semHeaders, cfg, db.admin);
      expect(st()).toBe('inativo');
    }
    expect(db.convites.length).toBe(1);
  });

  it('superadmin nunca é bloqueado por evento da Cakto', async () => {
    const db = bancoFalso();
    db.perfis.set('adm', { id: 'adm', email: 'dono@x.com', role: 'superadmin', status: 'ativo', dados: {} });
    await processarWebhook(corpo('refund', pedido('p9', 'dono@x.com')), semHeaders, cfg, db.admin);
    expect(db.perfis.get('adm')!.status).toBe('ativo');
  });

  it('rejeita segredo errado e aceita assinatura HMAC válida no header', async () => {
    const db = bancoFalso();
    const falso = corpo('purchase_approved', pedido('p1', 'a@b.com'), 'segredo-errado');
    expect((await processarWebhook(falso, semHeaders, cfg, db.admin)).status).toBe(401);
    expect(db.convites.length).toBe(0);
    const semSecret = JSON.stringify({ event: 'purchase_approved', data: pedido('p2', 'c@d.com') });
    expect((await processarWebhook(semSecret, assinar(semSecret), cfg, db.admin)).status).toBe(200);
    expect(db.convites).toEqual(['c@d.com']);
  });

  it('assinatura antiga (mais de 5 minutos) é recusada', () => {
    const raw = '{"x":1}';
    const velho = Math.floor(Date.now() / 1000) - 600;
    const h = assinar(raw, velho);
    expect(assinaturaValida(raw, h.get('x-cakto-timestamp'), h.get('x-cakto-signature'), SEGREDO)).toBe(false);
  });

  it('aceita o formato V2 (data como lista) e filtra produtos de fora do Ensinaê', async () => {
    const db = bancoFalso();
    const outro = { ...pedido('p2', 'z@z.com'), product: { id: 'outro', short_id: 'OUTRO' } };
    const r = await processarWebhook(corpo('purchase_approved', [pedido('p1', 'a@b.com'), outro]), semHeaders, { segredo: SEGREDO, produtos: ['42bruPi'] }, db.admin);
    expect(r.status).toBe(200);
    expect(db.convites).toEqual(['a@b.com']);
  });

  it('cada kit libera só a sua área; o Premium libera foco, emoções e colorir', async () => {
    const db = bancoFalso();
    await processarWebhook(corpo('purchase_approved', comProduto('k1', 'mae@x.com', KIT_FOCO)), semHeaders, cfg, db.admin);
    const id = [...db.perfis.values()][0].id;
    expect(db.areas(id)).toEqual(['foco']);
    await processarWebhook(corpo('purchase_approved', comProduto('k2', 'mae@x.com', PREMIUM)), semHeaders, cfg, db.admin);
    expect([...new Set(db.areas(id))]).toEqual(['colorir', 'emocoes', 'foco']);
    expect(db.convites).toEqual(['mae@x.com']); // a segunda compra não cria outra conta
  });

  it('reembolso de um kit bloqueia só aquela área e mantém a conta ativa', async () => {
    const db = bancoFalso();
    await processarWebhook(corpo('purchase_approved', comProduto('k1', 'mae@x.com', KIT_FOCO)), semHeaders, cfg, db.admin);
    await processarWebhook(corpo('purchase_approved', comProduto('k2', 'mae@x.com', PRANCHAS)), semHeaders, cfg, db.admin);
    const r = await processarWebhook(corpo('refund', comProduto('k3', 'mae@x.com', PRANCHAS)), semHeaders, cfg, db.admin);
    const p = [...db.perfis.values()][0];
    expect(db.areas(p.id)).toEqual(['foco']);
    expect(p.status).toBe('ativo');
    expect(r.corpo.detalhes?.[0]).toMatch(/outras áreas continuam/);
  });

  it('o plano Tudo Liberado libera tudo e, ao cancelar, os kits comprados continuam', async () => {
    const db = bancoFalso();
    await processarWebhook(corpo('purchase_approved', comProduto('k1', 'mae@x.com', KIT_FOCO)), semHeaders, cfg, db.admin);
    await processarWebhook(corpo('purchase_approved', pedido('s1', 'mae@x.com', { product: { id: 'TUDO59' } })), semHeaders, cfg, db.admin);
    const id = [...db.perfis.values()][0].id;
    expect(db.areas(id)).toEqual(['foco', 'tudo']);
    await processarWebhook(corpo('subscription_canceled', pedido('s2', 'mae@x.com', { product: { id: 'TUDO59' } })), semHeaders, cfg, db.admin);
    expect(db.areas(id)).toEqual(['foco']);
    expect(db.perfis.get(id)!.status).toBe('ativo');
  });

  it('eventos sem efeito (pix gerado, abandono) são ignorados com 200', async () => {
    const db = bancoFalso();
    const r = await processarWebhook(corpo('pix_gerado', pedido('p1', 'a@b.com')), semHeaders, cfg, db.admin);
    expect(r.status).toBe(200);
    expect(db.convites.length).toBe(0);
  });
});
