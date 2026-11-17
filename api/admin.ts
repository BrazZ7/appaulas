/**
 * POST /api/admin — ações do superadmin que precisam da chave secreta.
 * Corpo: { acao: 'convidar', email, nome? }  → cria o acesso manual e envia o convite por e-mail
 *        { acao: 'reenviar', email }          → reenvia o e-mail para definir senha
 * Exige o token de sessão de um superadmin no header Authorization: Bearer <token>.
 */
import { adminSupabase, siteUrl, supabaseAdmin } from './_lib/supabase-admin';

export async function POST(request: Request): Promise<Response> {
  try {
    const sb = supabaseAdmin();
    const token = (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
    const { data: quem } = await sb.auth.getUser(token);
    if (!quem.user) return Response.json({ ok: false, mensagem: 'sessão inválida' }, { status: 401 });
    const { data: perfil } = await sb.from('profiles').select('role').eq('id', quem.user.id).maybeSingle();
    if (perfil?.role !== 'superadmin') return Response.json({ ok: false, mensagem: 'apenas superadmin' }, { status: 403 });

    const corpo = (await request.json()) as { acao?: string; email?: string; nome?: string };
    const email = (corpo.email ?? '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ ok: false, mensagem: 'e-mail inválido' }, { status: 400 });
    const admin = adminSupabase(sb);

    if (corpo.acao === 'convidar') {
      const existente = await admin.buscarPerfil(email);
      if (existente) {
        await admin.atualizarPerfil(existente.id, { status: 'ativo' });
        return Response.json({ ok: true, mensagem: 'Esse e-mail já tinha conta: acesso ativado.' });
      }
      const id = await admin.convidar(email, corpo.nome?.trim() || null);
      await admin.atualizarPerfil(id, { status: 'ativo', origem: 'manual', nome: corpo.nome?.trim() || null });
      return Response.json({ ok: true, mensagem: 'Acesso criado. O convite foi enviado por e-mail.' });
    }
    if (corpo.acao === 'reenviar') {
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${siteUrl()}/?acesso=senha` });
      if (error) throw new Error(error.message);
      return Response.json({ ok: true, mensagem: 'E-mail para definir senha enviado.' });
    }
    return Response.json({ ok: false, mensagem: 'ação desconhecida' }, { status: 400 });
  } catch (e) {
    console.error('admin', e);
    return Response.json({ ok: false, mensagem: (e as Error).message }, { status: 500 });
  }
}
