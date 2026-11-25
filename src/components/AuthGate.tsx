import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AlertTriangle, KeyRound, LogIn, LogOut, Mail, ShoppingCart } from 'lucide-react';
import { AuthContext, CHECKOUT_URL, authEnabled, calcularAreas, supabase, temAcesso, type Perfil } from '../lib/auth';
import { TODAS_AS_AREAS } from '../content/familia';
import { store } from '../store/store';
import { enviarPendencias, iniciarSync, pararSync } from '../lib/sync';
import { Logo } from './Layout';

type Modo = 'carregando' | 'entrar' | 'definir-senha' | 'app';

/** Lê, antes do Supabase limpar a URL, se o usuário chegou por um link de convite ou de nova senha. */
function chegadaPorLink(): boolean {
  const h = window.location.hash;
  const q = new URLSearchParams(window.location.search);
  return /type=(invite|recovery|signup)/.test(h) || q.has('acesso');
}

function Tela({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div className="panel stack" style={{ width: 'min(440px, 100%)', padding: 28 }}>
        <div className="row nowrap" style={{ gap: 10 }}>
          <Logo />
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.6rem' }}>Ensina<b style={{ color: 'var(--cyan)' }}>ê</b></span>
        </div>
        {children}
      </div>
    </div>
  );
}

function traduzirErro(m: string) {
  if (m.includes('Invalid login')) return 'E-mail ou senha incorretos.';
  if (m.includes('Email not confirmed')) return 'Confirme seu e-mail pelo link que enviamos antes de entrar.';
  if (m.includes('Failed to fetch') || m.includes('NetworkError')) return 'Não foi possível conectar. Verifique sua internet e tente de novo.';
  if (m.toLowerCase().includes('rate limit')) return 'Muitas tentativas seguidas. Aguarde alguns minutos.';
  return m;
}

function Entrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState<{ tipo: 'ok' | 'erro'; texto: string } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true); setMsg(null);
    const { error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password: senha });
    setEnviando(false);
    if (error) setMsg({ tipo: 'erro', texto: traduzirErro(error.message) });
  };
  const esqueci = async () => {
    if (!email.trim()) { setMsg({ tipo: 'erro', texto: 'Digite seu e-mail acima e clique de novo em “Esqueci minha senha”.' }); return; }
    setEnviando(true);
    const { error } = await supabase!.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/?acesso=senha` });
    setEnviando(false);
    setMsg(error ? { tipo: 'erro', texto: traduzirErro(error.message) } : { tipo: 'ok', texto: 'Se esse e-mail tiver acesso, você vai receber um link para criar uma nova senha.' });
  };
  return (
    <Tela>
      <div>
        <h1 style={{ fontSize: '1.6rem', margin: 0 }}>Entrar</h1>
        <p className="muted small" style={{ margin: '4px 0 0' }}>Use o e-mail da sua compra.</p>
      </div>
      <form className="stack-sm" onSubmit={entrar}>
        <label className="field"><span>E-mail</span><input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="field"><span>Senha</span><input className="input" type="password" autoComplete="current-password" required value={senha} onChange={(e) => setSenha(e.target.value)} /></label>
        <button className="btn primary block" type="submit" disabled={enviando}><LogIn /> {enviando ? 'Entrando…' : 'Entrar'}</button>
      </form>
      <button className="btn ghost sm" onClick={esqueci} disabled={enviando}><KeyRound /> Esqueci minha senha</button>
      {msg && <div className={`feedback ${msg.tipo === 'ok' ? 'ok' : 'no'}`} role="status">{msg.texto}</div>}
      <p className="xs faint" style={{ margin: 0 }}><Mail size={12} /> Comprou e não recebeu o e-mail de acesso? Confira a caixa de spam ou use “Esqueci minha senha”.</p>
      {CHECKOUT_URL && <a className="btn outline sm" href={CHECKOUT_URL} target="_blank" rel="noreferrer"><ShoppingCart /> Ainda não tenho acesso — assinar</a>}
    </Tela>
  );
}

function DefinirSenha({ email, pronto }: { email?: string; pronto: () => void }) {
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (s1.length < 8) return setErro('Use pelo menos 8 caracteres.');
    if (s1 !== s2) return setErro('As senhas não conferem.');
    setSalvando(true);
    const { error } = await supabase!.auth.updateUser({ password: s1 });
    setSalvando(false);
    if (error) return setErro(traduzirErro(error.message));
    pronto();
  };
  return (
    <Tela>
      <div>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Crie sua senha</h1>
        <p className="muted small" style={{ margin: '4px 0 0' }}>{email ? <>Conta: <strong>{email}</strong>. </> : null}Depois disso você entra com o e-mail e esta senha.</p>
      </div>
      <form className="stack-sm" onSubmit={salvar}>
        <label className="field"><span>Nova senha (mínimo 8 caracteres)</span><input className="input" type="password" autoComplete="new-password" value={s1} onChange={(e) => setS1(e.target.value)} /></label>
        <label className="field"><span>Repita a senha</span><input className="input" type="password" autoComplete="new-password" value={s2} onChange={(e) => setS2(e.target.value)} /></label>
        {erro && <div className="feedback no">{erro}</div>}
        <button className="btn primary block" type="submit" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar senha e entrar'}</button>
      </form>
    </Tela>
  );
}

function SemAcesso({ perfil, sair }: { perfil: Perfil | null; sair: () => void }) {
  return (
    <Tela>
      <h1 style={{ fontSize: '1.4rem', margin: 0 }}><AlertTriangle color="var(--amber)" /> Acesso inativo</h1>
      <p className="small">{perfil ? <>A assinatura de <strong>{perfil.email}</strong> não está ativa no momento (cancelada, reembolsada ou pausada).</> : 'Não encontramos o cadastro desta conta.'}</p>
      <p className="small muted">Se você acabou de pagar, aguarde alguns minutos e entre de novo. Em caso de dúvida, fale com o suporte.</p>
      {CHECKOUT_URL && <a className="btn primary" href={CHECKOUT_URL} target="_blank" rel="noreferrer"><ShoppingCart /> Renovar assinatura</a>}
      <button className="btn ghost sm" onClick={sair}><LogOut /> Sair</button>
    </Tela>
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  const [modo, setModo] = useState<Modo>('carregando');
  const [session, setSession] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [porLink] = useState(chegadaPorLink);

  const lerAreas = useCallback(async (p: Perfil | null) => {
    if (!p) { setAreas([]); return; }
    const { data } = await supabase!.from('acessos').select('areas, status').eq('user_id', p.id);
    setAreas(calcularAreas(p, (data ?? []) as { areas: string[]; status: string }[], TODAS_AS_AREAS));
  }, []);

  const carregarPerfil = useCallback(async (s: Session | null) => {
    setSession(s);
    if (!s) { setPerfil(null); setAreas([]); return null; }
    const { data } = await supabase!.from('profiles').select('id, email, nome, role, status, origem').eq('id', s.user.id).maybeSingle();
    const p = (data as Perfil | null) ?? null;
    setPerfil(p);
    await lerAreas(p);
    store.setScope(s.user.id, p?.nome);
    void iniciarSync(s.user.id);
    return p;
  }, [lerAreas]);

  useEffect(() => {
    if (!authEnabled) return;
    let vivo = true;
    supabase!.auth.getSession().then(async ({ data }) => {
      if (!vivo) return;
      await carregarPerfil(data.session);
      if (porLink && data.session) {
        window.history.replaceState(null, '', `${window.location.pathname}#/`);
        setModo('definir-senha');
      } else {
        setModo(data.session ? 'app' : 'entrar');
      }
    });
    const { data: sub } = supabase!.auth.onAuthStateChange(async (evento, s) => {
      if (evento === 'PASSWORD_RECOVERY') { await carregarPerfil(s); setModo('definir-senha'); return; }
      if (evento === 'SIGNED_OUT') { pararSync(); setSession(null); setPerfil(null); setModo('entrar'); return; }
      if (evento === 'SIGNED_IN') { await carregarPerfil(s); setModo((m) => (m === 'definir-senha' ? m : 'app')); }
    });
    return () => { vivo = false; sub.subscription.unsubscribe(); };
  }, [carregarPerfil, porLink]);

  if (!authEnabled) return <>{children}</>;
  const sair = async () => { await enviarPendencias().catch(() => {}); await supabase!.auth.signOut(); };

  if (modo === 'carregando') return <Tela><p className="muted">Carregando…</p></Tela>;
  if (modo === 'entrar' || !session) return <Entrar />;
  if (modo === 'definir-senha') return <DefinirSenha email={session.user.email} pronto={() => setModo('app')} />;
  if (!temAcesso(perfil)) return <SemAcesso perfil={perfil} sair={sair} />;

  return (
    <AuthContext.Provider value={{ ativo: true, session, perfil, areas, sair, recarregarAreas: () => lerAreas(perfil) }}>
      {perfil?.status === 'atrasado' && perfil.role !== 'superadmin' && (
        <div className="notice" style={{ borderRadius: 0, justifyContent: 'center' }}>
          <AlertTriangle size={18} /> <span>Seu pagamento está em atraso. Regularize na Cakto para não perder o acesso.</span>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}
