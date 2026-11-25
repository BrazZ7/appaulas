import { useState, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Download, ExternalLink, FileText, Lock, ShoppingCart, Sparkles, Unlock } from 'lucide-react';
import { supabase, useAreas, useAuth } from '../lib/auth';
import { AREAS, CATEGORIAS, PLANO_TUDO, SALA, areaPorId, checkoutUrl, reais, totalAvulso, type Area } from '../content/familia';
import { toast } from '../components/ui';

const capa = (id: string) => `${import.meta.env.BASE_URL}familia/${id}.jpg`;

function Cadeado({ aberto }: { aberto: boolean }) {
  return aberto
    ? <span className="fam-tag ok"><Unlock size={14} /> Liberada</span>
    : <span className="fam-tag lock"><Lock size={14} /> Bloqueada</span>;
}

/** Aviso para comprar com o mesmo e-mail da conta, senão a área não aparece aqui. */
function MesmoEmail() {
  const auth = useAuth();
  if (!auth.perfil?.email) return null;
  return <p className="xs faint" style={{ margin: 0 }}>Na compra, use o mesmo e-mail da sua conta (<strong>{auth.perfil.email}</strong>) para a área abrir aqui automaticamente.</p>;
}

function BotaoComprar({ oferta, children, variante = 'primary' }: { oferta: string; children: ReactNode; variante?: 'primary' | 'outline' }) {
  return <a className={`btn ${variante} block`} href={checkoutUrl(oferta)} target="_blank" rel="noreferrer"><ShoppingCart /> {children}</a>;
}

/** Banner do plano mensal que libera tudo. */
export function BannerTudo({ compacto }: { compacto?: boolean }) {
  const { areas } = useAreas();
  const auth = useAuth();
  if (auth.ativo && areas.length >= AREAS.length + 1) return null; // já tem tudo
  return (
    <section className="fam-tudo">
      <div className="fam-tudo-txt">
        <span className="kicker"><Sparkles size={14} /> Plano Tudo Liberado</span>
        <h2>Todas as {AREAS.length} áreas + a Sala de Aula por {reais(PLANO_TUDO.preco)}/mês</h2>
        {!compacto && <p className="muted small">Atividades, ajuda especial e a plataforma completa do professor, tudo aberto enquanto durar a assinatura. Comprando cada kit separado sairia {reais(totalAvulso())}, fora a Sala de Aula. Cancele quando quiser.</p>}
      </div>
      <div className="fam-tudo-cta">
        {PLANO_TUDO.oferta
          ? <BotaoComprar oferta={PLANO_TUDO.oferta}>Desbloquear tudo</BotaoComprar>
          : <span className="muted small">Em breve</span>}
      </div>
    </section>
  );
}

function CardArea({ a, aberto }: { a: Area; aberto: boolean }) {
  return (
    <Link to={`/familia/${a.id}`} className={`fam-card ${aberto ? '' : 'is-lock'}`} style={{ ['--c' as string]: a.cor }}>
      <div className="fam-card-img">
        <img src={capa(a.id)} alt="" loading="lazy" width={480} height={480} />
        {!aberto && <span className="fam-card-lock" aria-hidden="true"><Lock /></span>}
      </div>
      <div className="fam-card-body">
        <div className="row nowrap" style={{ justifyContent: 'space-between', gap: 8 }}>
          <strong className="fam-card-title"><span aria-hidden="true">{a.emoji}</span> {a.titulo}</strong>
          <Cadeado aberto={aberto} />
        </div>
        <p className="small muted" style={{ margin: 0 }}>{a.resumo}</p>
        <span className="fam-card-foot">{aberto ? <>Abrir área →</> : <>Desbloquear por {reais(a.preco)}{a.pacote ? ` (${a.pacote})` : ''}</>}</span>
      </div>
    </Link>
  );
}

function CardSala({ aberto }: { aberto: boolean }) {
  return (
    <Link to={aberto ? '/' : '/familia/sala'} className={`fam-card fam-sala ${aberto ? '' : 'is-lock'}`} style={{ ['--c' as string]: '#2ee6d6' }}>
      <div className="fam-card-body">
        <div className="row nowrap" style={{ justifyContent: 'space-between', gap: 8 }}>
          <strong className="fam-card-title"><span aria-hidden="true">{SALA.emoji}</span> {SALA.titulo}</strong>
          <Cadeado aberto={aberto} />
        </div>
        <p className="small muted" style={{ margin: 0 }}>{SALA.resumo}</p>
        <span className="fam-card-foot">{aberto ? 'Entrar na Sala de Aula →' : `Desbloquear por ${reais(SALA.preco)}/mês`}</span>
      </div>
    </Link>
  );
}

export default function FamiliaHome() {
  const { tem } = useAreas();
  const auth = useAuth();
  const liberadas = AREAS.filter((a) => tem(a.id));
  const nome = auth.perfil?.nome?.split(' ')[0];
  return (
    <div className="stack" style={{ gap: 26 }}>
      <header className="anim-in">
        <p className="muted" style={{ margin: 0 }}>👋 Olá{nome ? `, ${nome}` : ''}!</p>
        <h1 style={{ margin: 0 }}>Sua <span className="grad-text">área</span> no Ensinaê</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          {liberadas.length
            ? <>Você tem {liberadas.length} {liberadas.length === 1 ? 'área liberada' : 'áreas liberadas'}. As outras ficam com cadeado e podem ser desbloqueadas quando quiser.</>
            : <>Escolha uma área para começar. Cada área tem os PDFs prontos para imprimir.</>}
        </p>
      </header>

      {liberadas.length > 0 && (
        <section className="stack-sm">
          <h2 className="fam-h2">Liberadas para você</h2>
          <div className="fam-grid">{liberadas.map((a) => <CardArea key={a.id} a={a} aberto />)}</div>
        </section>
      )}

      <BannerTudo />

      {CATEGORIAS.map((c) => {
        const lista = AREAS.filter((a) => a.categoria === c.id && !tem(a.id));
        if (!lista.length) return null;
        return (
          <section key={c.id} className="stack-sm" id={c.id}>
            <h2 className="fam-h2">{c.titulo} <span className="muted small" style={{ fontWeight: 500 }}>· {c.sub}</span></h2>
            <div className="fam-grid">{lista.map((a) => <CardArea key={a.id} a={a} aberto={false} />)}</div>
          </section>
        );
      })}

      <section className="stack-sm">
        <h2 className="fam-h2">Para professores</h2>
        <div className="fam-grid one"><CardSala aberto={tem('sala')} /></div>
      </section>
    </div>
  );
}

async function linkArquivo(caminho: string, baixar?: string) {
  const { data, error } = await supabase!.storage.from('conteudo').createSignedUrl(caminho, 60 * 60, baixar ? { download: baixar } : undefined);
  if (error || !data) throw new Error(error?.message ?? 'sem link');
  return data.signedUrl;
}

function ListaArquivos({ a }: { a: Area }) {
  const [ocupado, setOcupado] = useState('');
  const abrir = async (caminho: string, baixar?: string) => {
    if (!supabase) { toast('No modo demonstrativo os PDFs não abrem. Entre com sua conta.'); return; }
    // abre a aba antes do await para o navegador não bloquear o pop-up
    const janela = baixar ? null : window.open('', '_blank');
    setOcupado(caminho + (baixar ? ':d' : ''));
    try {
      const url = await linkArquivo(caminho, baixar);
      if (janela) janela.location.href = url; else window.location.href = url;
    } catch {
      janela?.close();
      toast('Não foi possível abrir o arquivo agora. Tente de novo em instantes.');
    } finally { setOcupado(''); }
  };
  return (
    <ul className="fam-files">
      {a.arquivos.map((f) => {
        const nome = f.arquivo.split('/').pop()!;
        return (
          <li key={f.arquivo}>
            <FileText aria-hidden="true" />
            <div className="fam-file-txt"><strong>{f.titulo}</strong><span className="xs faint">{f.paginas} {f.paginas === 1 ? 'página' : 'páginas'} · PDF</span></div>
            <div className="row nowrap" style={{ gap: 6 }}>
              <button className="btn sm outline" onClick={() => abrir(f.arquivo)} disabled={!!ocupado}><ExternalLink /> {ocupado === f.arquivo ? 'Abrindo…' : 'Abrir'}</button>
              <button className="btn sm ghost" onClick={() => abrir(f.arquivo, nome)} disabled={!!ocupado} aria-label={`Baixar ${f.titulo}`}><Download /></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function AreaPage() {
  const { id = '' } = useParams();
  const { tem } = useAreas();
  if (id === 'sala') return <SalaBloqueada />;
  const a = areaPorId(id);
  if (!a) return <Navigate to="/familia" replace />;
  const aberto = tem(a.id);
  const paginas = a.arquivos.reduce((s, f) => s + f.paginas, 0);
  return (
    <div className="stack" style={{ gap: 22 }}>
      <Link to="/familia" className="btn ghost sm" style={{ alignSelf: 'flex-start' }}><ArrowLeft /> Minha área</Link>
      <section className="fam-hero" style={{ ['--c' as string]: a.cor }}>
        <img src={capa(a.id)} alt={`Capa: ${a.titulo}`} width={480} height={480} />
        <div className="stack-sm">
          <Cadeado aberto={aberto} />
          <h1 style={{ margin: 0 }}><span aria-hidden="true">{a.emoji}</span> {a.titulo}</h1>
          <p style={{ margin: 0 }}>{a.resumo}</p>
          <p className="small muted" style={{ margin: 0 }}><strong>Para quem:</strong> {a.paraQuem}</p>
          <ul className="fam-check">{a.destaques.map((d) => <li key={d}><Check size={16} /> {d}</li>)}</ul>
          <p className="xs faint" style={{ margin: 0 }}>{a.arquivos.length} {a.arquivos.length === 1 ? 'arquivo' : 'arquivos'} · {paginas} páginas para imprimir quantas vezes quiser</p>
        </div>
      </section>

      {aberto ? (
        <section className="panel stack-sm" style={{ padding: 18 }}>
          <h2 className="fam-h2" style={{ margin: 0 }}>Seus arquivos</h2>
          <p className="small muted" style={{ margin: 0 }}>Toque em “Abrir” para ver no celular ou em <Download size={14} style={{ verticalAlign: -2 }} /> para baixar e imprimir.</p>
          <ListaArquivos a={a} />
        </section>
      ) : (
        <section className="panel stack-sm fam-lockbox" style={{ padding: 18 }}>
          <h2 className="fam-h2" style={{ margin: 0 }}><Lock size={18} /> O que tem dentro</h2>
          <ul className="fam-files is-lock" aria-label="Arquivos desta área (bloqueados)">
            {a.arquivos.slice(0, 6).map((f) => <li key={f.arquivo}><FileText aria-hidden="true" /><div className="fam-file-txt"><strong>{f.titulo}</strong><span className="xs faint">{f.paginas} páginas</span></div><Lock size={16} /></li>)}
            {a.arquivos.length > 6 && <li className="muted small">+ {a.arquivos.length - 6} arquivos</li>}
          </ul>
          <div className="fam-buy">
            <BotaoComprar oferta={a.oferta}>{a.pacote ? `Liberar com o ${a.pacote} · ${reais(a.preco)}` : `Liberar esta área · ${reais(a.preco)}`}</BotaoComprar>
            {PLANO_TUDO.oferta && <BotaoComprar oferta={PLANO_TUDO.oferta} variante="outline">Ou libere tudo por {reais(PLANO_TUDO.preco)}/mês</BotaoComprar>}
          </div>
          <MesmoEmail />
          <p className="xs faint" style={{ margin: 0 }}>Pagamento único na Cakto, com garantia de 7 dias. Depois do pagamento, a área abre aqui em poucos minutos (atualize a página).</p>
        </section>
      )}
    </div>
  );
}

/** Mostrada no lugar das telas do professor quando a conta não tem a Sala de Aula. */
export function SalaBloqueada() {
  return (
    <div className="stack" style={{ gap: 20, maxWidth: 760 }}>
      <Link to="/familia" className="btn ghost sm" style={{ alignSelf: 'flex-start' }}><ArrowLeft /> Minha área</Link>
      <section className="panel stack-sm" style={{ padding: 22 }}>
        <span className="fam-tag lock" style={{ alignSelf: 'flex-start' }}><Lock size={14} /> Bloqueada</span>
        <h1 style={{ margin: 0 }}><span aria-hidden="true">{SALA.emoji}</span> Sala de Aula</h1>
        <p style={{ margin: 0 }}>{SALA.resumo}</p>
        <ul className="fam-check">
          {['Aulas imersivas prontas por matéria e ano', 'Jogos para a turma no projetor', 'Criador de provas com versões adaptadas', 'Diário da turma: chamada, notas e relatórios', 'Planejador de aulas por blocos'].map((d) => <li key={d}><Check size={16} /> {d}</li>)}
        </ul>
        <div className="fam-buy">
          <BotaoComprar oferta={SALA.oferta}>Assinar a Sala de Aula · {reais(SALA.preco)}/mês</BotaoComprar>
          {PLANO_TUDO.oferta && <BotaoComprar oferta={PLANO_TUDO.oferta} variante="outline">Ou tudo liberado por {reais(PLANO_TUDO.preco)}/mês</BotaoComprar>}
        </div>
        <MesmoEmail />
      </section>
    </div>
  );
}

/** Envolve as telas do professor: sem a Sala de Aula, mostra a tela de desbloqueio. */
export function SoSala({ children }: { children: ReactNode }) {
  const { tem } = useAreas();
  return tem('sala') ? <>{children}</> : <SalaBloqueada />;
}

/** Início: quem só tem áreas da família cai direto na Minha área. */
export function InicioOuFamilia({ children }: { children: ReactNode }) {
  const { tem } = useAreas();
  return tem('sala') ? <>{children}</> : <Navigate to="/familia" replace />;
}
