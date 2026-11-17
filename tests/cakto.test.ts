import { describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import { assinaturaValida, processarWebhook, type Admin, type PerfilResumo } from '../api/_lib/cakto';

const SEGREDO = 'b3f1a9c2-7b4d-4a8e-9f01-2c6d5b8a4e37';

/** Banco em memória que imita o Supabase. */
function bancoFalso() {
  const perfis = new Map<string, PerfilResumo & { email: string; dados: Record<string, unknown> }>();
  const eventos = new Map<string, boolean>();
  const convites: string[] = [];
  const admin: Admin = {
    async registrarEvento(pedido, evento) { const k = `${pedido}|${evento}`; if (eventos.get(k)) return false; eventos.set(k, false); return true; },
    async finalizarEvento(pedido, evento) { eventos.set(`${pedido}|${evento}`, true); },
    async buscarPerfil(email) { return [...perfis.values()].find((p) => p.email === email) ?? null; },
    async convidar(email) { const id = `u${perfis.size + 1}`; perfis.set(id, { id, email, role: 'assinante', status: 'inativo', dados: {} }); convites.push(email); return id; },
    async atualizarPerfil(id, dados) { const p = perfis.get(id)!; Object.assign(p.dados, dados); if (dados.status) p.status = String(dados.status); },
  };
  return { admin, perfis, convites };
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
const cfg = { segredo: SEGREDO, produtos: [] as string[] };

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

  it('eventos sem efeito (pix gerado, abandono) são ignorados com 200', async () => {
    const db = bancoFalso();
    const r = await processarWebhook(corpo('pix_gerado', pedido('p1', 'a@b.com')), semHeaders, cfg, db.admin);
    expect(r.status).toBe(200);
    expect(db.convites.length).toBe(0);
  });
});
