/**
 * POST /api/cakto-webhook — recebe os eventos da Cakto.
 * Compra aprovada → cria a conta e envia o convite por e-mail ao comprador.
 * Cancelamento, reembolso, chargeback e pausa → bloqueia o acesso. Atraso → mantém, marcado como atrasado.
 */
import { processarWebhook } from './_lib/cakto.js';
import { adminSupabase, env, supabaseAdmin } from './_lib/supabase-admin.js';

export async function POST(request: Request): Promise<Response> {
  const corpoCru = await request.text();
  try {
    const r = await processarWebhook(
      corpoCru,
      request.headers,
      {
        segredo: env('CAKTO_WEBHOOK_SECRET'),
        produtos: env('CAKTO_PRODUCT_IDS').split(',').map((s) => s.trim()).filter(Boolean),
      },
      adminSupabase(supabaseAdmin()),
    );
    return Response.json(r.corpo, { status: r.status });
  } catch (e) {
    // Erros internos: registra no log da Vercel. A Cakto não reenvia respostas não-2xx automaticamente;
    // o evento pode ser reenviado pelo painel (Histórico de eventos → Reenviar).
    console.error('cakto-webhook', e);
    return Response.json({ ok: false, mensagem: (e as Error).message }, { status: 500 });
  }
}

export function GET(): Response {
  return Response.json({ ok: true, mensagem: 'Webhook da Cakto do Ensinaê. Envie eventos via POST.' });
}
