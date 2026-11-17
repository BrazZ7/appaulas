#!/usr/bin/env node
/**
 * Cria (ou redefine) contas de superadmin no Supabase do Ensinaê.
 * Uso:
 *   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=sb_secret_... \
 *     node scripts/criar-superadmin.mjs email1@dominio.com email2@dominio.com
 * Gera uma senha forte para cada conta e mostra no terminal. Troque a senha no primeiro acesso
 * (tela de login → “Esqueci minha senha”).
 */
import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;
const emails = process.argv.slice(2).map((e) => e.trim().toLowerCase()).filter(Boolean);
if (!url || !chave || emails.length === 0) {
  console.error('Uso: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/criar-superadmin.mjs email1 [email2 ...]');
  process.exit(1);
}
const sb = createClient(url, chave, { auth: { persistSession: false, autoRefreshToken: false } });

function senhaForte() {
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const bytes = crypto.randomBytes(16);
  const base = Array.from(bytes, (b) => alfabeto[b % alfabeto.length]).join('');
  return `${base.slice(0, 4)}-${base.slice(4, 8)}-${base.slice(8, 12)}-${base.slice(12, 16)}`;
}

async function acharUsuario(email) {
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const u = data.users.find((x) => x.email?.toLowerCase() === email);
    if (u) return u;
    if (data.users.length < 200) return null;
  }
  return null;
}

const resultado = [];
for (const email of emails) {
  const senha = senhaForte();
  let usuario = await acharUsuario(email);
  if (usuario) {
    const { error } = await sb.auth.admin.updateUserById(usuario.id, { password: senha, email_confirm: true });
    if (error) throw error;
  } else {
    const { data, error } = await sb.auth.admin.createUser({ email, password: senha, email_confirm: true });
    if (error) throw error;
    usuario = data.user;
  }
  const { error: e2 } = await sb.from('profiles').upsert({ id: usuario.id, email, role: 'superadmin', status: 'ativo', origem: 'superadmin' });
  if (e2) throw e2;
  resultado.push({ email, senha });
}
console.log('\nContas de superadmin prontas:\n');
for (const r of resultado) console.log(`  ${r.email}   senha: ${r.senha}`);
console.log('\nTroque a senha no primeiro acesso.\n');
