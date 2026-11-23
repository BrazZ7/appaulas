/** Criador de provas: minhas provas, provas prontas, banco de questões, editor e impressão adaptada. */
import { useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowDown, ArrowUp, BookCopy, Copy, Eye, FilePlus2, ImagePlus, Library, ListChecks, Pencil, Plus, Printer, Search, Trash2, Users, X,
} from 'lucide-react';
import { Modal, Notice, PageHead, Tabs, toast } from '../components/ui';
import { FIGURAS, Figura, findFigura, padroes } from '../components/Figura';
import { ImagemQuestao, ProvaDoc } from '../components/ProvaDoc';
import { BANCO, PROVAS_PRONTAS, filtrarBanco } from '../content/questoes';
import { SUBJECTS } from '../content';
import { putFile } from '../lib/files';
import { PERFIS, TIPO_LABEL, copiarQuestao, totalPontos, validarProva } from '../lib/prova';
import { periodoDaData } from '../lib/diario';
import { actions, now, uid, useApp } from '../store/store';
import type { PerfilAdaptacao, Prova, Questao, QuestaoImagem, QuestaoTipo, SubjectId } from '../types/models';

const ANOS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const subjName = (id?: SubjectId) => SUBJECTS.find((s) => s.id === id)?.name ?? 'Geral';
const SUBJ_OPTS = SUBJECTS.filter((s) => s.status === 'disponivel');

function novaProva(): Prova {
  return { id: uid('prova'), title: '', instrucoes: 'Leia com atenção cada questão. Responda de forma legível. Boa prova!', questoes: [], perfil: 'padrao', createdAt: now(), updatedAt: now() };
}

function novaQuestao(tipo: QuestaoTipo): Questao {
  const base: Questao = { id: uid('q'), tipo, enunciado: '', itens: [], pontos: 1 };
  switch (tipo) {
    case 'multipla': return { ...base, itens: ['', '', '', ''], correta: 0 };
    case 'vf': return { ...base, enunciado: 'Escreva V para verdadeiro e F para falso.', itens: ['', '', ''], vf: [true, false, true] };
    case 'associacao': return { ...base, enunciado: 'Ligue as colunas.', itens: ['', '', ''], pares: ['', '', ''] };
    case 'ordenar': return { ...base, enunciado: 'Numere na ordem correta.', itens: ['', '', ''] };
    case 'dissertativa': return { ...base, linhas: 4 };
    case 'desenho': return { ...base, linhas: 6 };
    case 'completar': return { ...base, enunciado: 'Complete: ___' };
  }
}

/** Reduz a imagem enviada (máx. 1000 px) e guarda no IndexedDB deste navegador. */
async function guardarImagem(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, 1000 / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * k);
  c.height = Math.round(bmp.height * k);
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  const blob = await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('Falha ao converter a imagem'))), 'image/jpeg', 0.85));
  const id = uid('img');
  await putFile(id, blob);
  return id;
}

// ───────────── Lista ─────────────

export default function Provas() {
  const s = useApp();
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = (params.get('aba') as 'minhas' | 'prontas' | 'banco') || (s.provas.length ? 'minhas' : 'prontas');
  const [subj, setSubj] = useState<SubjectId | ''>('');
  const [usar, setUsar] = useState<Prova | null>(null);
  const duplicar = (p: Prova) => {
    const c: Prova = { ...structuredClone(p), id: uid('prova'), title: p.pronta ? p.title : `${p.title} (cópia)`, pronta: false, createdAt: now(), updatedAt: now(), questoes: p.questoes.map((q) => copiarQuestao(q, uid('q'))) };
    actions.saveProva(c);
    toast('Cópia criada em Minhas provas');
    nav(`/provas/${c.id}/editar`);
  };
  const prontas = PROVAS_PRONTAS.filter((p) => !subj || p.subject === subj);
  const minhas = s.provas.filter((p) => !subj || p.subject === subj);
  const Card = ({ p }: { p: Prova }) => (
    <article className="panel tight stack-sm">
      <div className="row between nowrap">
        <span className="badge cyan">{subjName(p.subject)}{p.ano ? ` · ${p.ano}º ano` : ''}</span>
        {p.perfil !== 'padrao' && <span className="badge violet">Adaptada: {PERFIS[p.perfil].nome}</span>}
      </div>
      <strong>{p.title || 'Prova sem título'}</strong>
      <span className="xs muted">{p.questoes.length} questões · {totalPontos(p).toLocaleString('pt-BR')} pontos{!p.pronta ? ` · editada em ${new Date(p.updatedAt).toLocaleDateString('pt-BR')}` : ''}</span>
      <div className="row">
        <Link className="btn sm" to={`/provas/${p.id}/imprimir`}><Eye /> Ver e imprimir</Link>
        {p.pronta ? <button className="btn sm primary" onClick={() => duplicar(p)}><Copy /> Usar e editar</button> : <Link className="btn sm primary" to={`/provas/${p.id}/editar`}><Pencil /> Editar</Link>}
        {!p.pronta && <button className="btn sm ghost" onClick={() => duplicar(p)} title="Duplicar"><Copy /></button>}
        {!p.pronta && <button className="btn sm ghost" onClick={() => setUsar(p)}><Users /> Usar com turma</button>}
        {!p.pronta && <button className="btn sm ghost danger" aria-label="Excluir prova" onClick={() => { if (confirm(`Excluir a prova “${p.title}”?`)) actions.deleteProva(p.id); }}><Trash2 /></button>}
      </div>
    </article>
  );
  return (
    <div className="stack">
      <PageHead kicker="Avaliação" title="Provas" sub="Monte provas com questões prontas, imagens e versões adaptadas para estudantes com TEA, TDAH, dislexia e baixa visão — e imprima ou salve em PDF."
        actions={<Link className="btn primary" to="/provas/nova"><FilePlus2 /> Nova prova</Link>} />
      <Tabs label="Provas" value={tab} onChange={(v) => setParams({ aba: v })} items={[
        { id: 'minhas', label: `Minhas provas (${s.provas.length})`, icon: <ListChecks size={16} /> },
        { id: 'prontas', label: `Provas prontas (${PROVAS_PRONTAS.length})`, icon: <BookCopy size={16} /> },
        { id: 'banco', label: `Banco de questões (${BANCO.length})`, icon: <Library size={16} /> },
      ]} />
      <div className="row" role="group" aria-label="Matéria">
        <button className={`chip ${!subj ? 'on' : ''}`} aria-pressed={!subj} onClick={() => setSubj('')}>Todas</button>
        {SUBJ_OPTS.filter((x) => BANCO.some((q) => q.subject === x.id)).map((x) => <button key={x.id} className={`chip ${subj === x.id ? 'on' : ''}`} aria-pressed={subj === x.id} onClick={() => setSubj(x.id)}>{x.name}</button>)}
      </div>
      {tab === 'minhas' && (minhas.length ? <div className="grid g2">{minhas.map((p) => <Card key={p.id} p={p} />)}</div> : <div className="empty">Você ainda não criou provas{subj ? ' desta matéria' : ''}. Comece por uma <button className="btn sm" onClick={() => setParams({ aba: 'prontas' })}>prova pronta</button> ou <Link className="btn sm primary" to="/provas/nova">crie do zero</Link>.</div>)}
      {tab === 'prontas' && <><Notice kind="info">Provas prontas abrem como cópia em “Minhas provas” — edite à vontade. As versões adaptadas podem ser geradas de <strong>qualquer</strong> prova na tela de impressão.</Notice><div className="grid g2">{prontas.map((p) => <Card key={p.id} p={p} />)}</div></>}
      {tab === 'banco' && <BancoView subj={subj} />}
      <UsarComTurma prova={usar} onClose={() => setUsar(null)} />
    </div>
  );
}

function BancoView({ subj }: { subj: SubjectId | '' }) {
  const [ano, setAno] = useState(0);
  const [txt, setTxt] = useState('');
  const qs = filtrarBanco(subj, ano || undefined, txt);
  return (
    <div className="stack">
      <div className="row">
        <label className="row nowrap small"><Search size={15} /><input className="input" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Buscar no banco" /></label>
        <select className="input" style={{ width: 'auto' }} value={ano} onChange={(e) => setAno(Number(e.target.value))} aria-label="Ano"><option value={0}>Todos os anos</option>{ANOS.map((a) => <option key={a} value={a}>{a}º ano</option>)}</select>
        <span className="small muted">{qs.length} questões — use “Do banco” no editor para adicioná-las a uma prova.</span>
      </div>
      <div className="grid g2">{qs.map((q) => <QuestaoResumo key={q.id} q={q} />)}</div>
    </div>
  );
}

function QuestaoResumo({ q, onAdd }: { q: Questao; onAdd?: () => void }) {
  return (
    <article className="panel tight stack-sm">
      <div className="row between nowrap"><span className="badge">{TIPO_LABEL[q.tipo]}</span><span className="xs muted">{subjName(q.subject)}{q.anos ? ` · ${q.anos[0]}º–${q.anos[q.anos.length - 1]}º ano` : ''}</span></div>
      <span className="small">{q.enunciado}</span>
      {q.imagem && <div style={{ background: '#fff', borderRadius: 8, padding: 6, maxWidth: 260 }}><ImagemQuestao img={q.imagem} /></div>}
      {q.itens.length > 0 && <span className="xs muted">{q.itens.join(' · ')}</span>}
      {onAdd && <button className="btn sm primary" style={{ alignSelf: 'flex-start' }} onClick={onAdd}><Plus /> Adicionar</button>}
    </article>
  );
}

// ───────────── Usar com turma ─────────────

function UsarComTurma({ prova, onClose }: { prova: Prova | null; onClose: () => void }) {
  const s = useApp();
  const [turmas, setTurmas] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notas, setNotas] = useState(true);
  if (!prova) return null;
  return (
    <Modal open={!!prova} onClose={onClose} title={`Usar “${prova.title}” com turmas`}>
      <div className="stack">
        <p className="small muted" style={{ margin: 0 }}>A prova entra no planejamento de cada turma escolhida{notas ? ' e já cria a avaliação para lançar as notas' : ''}.</p>
        <fieldset className="stack-sm" style={{ border: 0, padding: 0 }}><legend className="small" style={{ fontWeight: 700 }}>Turmas</legend>
          {s.turmas.map((t) => <label key={t.id} className="row nowrap"><input type="checkbox" checked={turmas.includes(t.id)} onChange={() => setTurmas(turmas.includes(t.id) ? turmas.filter((x) => x !== t.id) : [...turmas, t.id])} /> {t.name}</label>)}
        </fieldset>
        <label className="small row nowrap">Data da prova <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label className="row nowrap small"><input type="checkbox" checked={notas} onChange={(e) => setNotas(e.target.checked)} /> Criar avaliação para lançar notas (valor: {totalPontos(prova).toLocaleString('pt-BR')} pontos)</label>
        <button className="btn primary" disabled={!turmas.length} onClick={() => {
          for (const tid of turmas) {
            const itemId = uid('it');
            actions.saveItemTurma({ id: itemId, turmaId: tid, tipo: 'prova', title: prova.title, description: `${prova.questoes.length} questões · ${subjName(prova.subject)}. Abra em Provas para imprimir (versões adaptadas disponíveis).`, date, status: 'planejado', provaId: prova.id, createdAt: now(), updatedAt: now() });
            if (notas) actions.saveAvaliacao({ id: uid('av'), turmaId: tid, title: prova.title, tipo: 'prova', date, periodo: periodoDaData(date), notaMax: totalPontos(prova) || 10, peso: 1, notas: {}, itemId, createdAt: now() });
          }
          toast(`Prova adicionada a ${turmas.length} turma(s)`);
          setTurmas([]);
          onClose();
        }}><Users /> Adicionar às turmas</button>
      </div>
    </Modal>
  );
}

// ───────────── Editor ─────────────

function ListaEditavel({ label, values, onChange, min = 1, extra }: { label: string; values: string[]; onChange: (v: string[]) => void; min?: number; extra?: (i: number) => ReactNode }) {
  return (
    <div className="stack-sm">
      {values.map((v, i) => (
        <div key={i} className="row nowrap">
          {extra?.(i)}
          <input className="input" value={v} onChange={(e) => onChange(values.map((x, k) => (k === i ? e.target.value : x)))} placeholder={`${label} ${i + 1}`} aria-label={`${label} ${i + 1}`} />
          <button className="btn icon ghost" disabled={values.length <= min} aria-label={`Remover ${label} ${i + 1}`} onClick={() => onChange(values.filter((_, k) => k !== i))}><X /></button>
        </div>
      ))}
      <button className="btn sm ghost" style={{ alignSelf: 'flex-start' }} disabled={values.length >= 10} onClick={() => onChange([...values, ''])}><Plus /> {label}</button>
    </div>
  );
}

function QuestaoEditor({ q, n, onChange, onRemove, onMove, onImagem }: { q: Questao; n: number; onChange: (q: Questao) => void; onRemove: () => void; onMove: (d: -1 | 1) => void; onImagem: () => void }) {
  const set = (p: Partial<Questao>) => onChange({ ...q, ...p });
  return (
    <article className="panel stack-sm">
      <div className="row between nowrap">
        <strong>Questão {n} · <span className="muted">{TIPO_LABEL[q.tipo]}</span></strong>
        <div className="row nowrap">
          <label className="small row nowrap">Pontos <input className="input" type="number" min={0} step="0.25" value={q.pontos} onChange={(e) => set({ pontos: Math.max(0, Number(e.target.value)) })} style={{ width: 70 }} /></label>
          <button className="btn icon ghost" aria-label="Subir" onClick={() => onMove(-1)}><ArrowUp /></button>
          <button className="btn icon ghost" aria-label="Descer" onClick={() => onMove(1)}><ArrowDown /></button>
          <button className="btn icon ghost danger" aria-label="Remover questão" onClick={onRemove}><Trash2 /></button>
        </div>
      </div>
      <textarea className="input" rows={2} value={q.enunciado} onChange={(e) => set({ enunciado: e.target.value })} placeholder={q.tipo === 'completar' ? 'Use ___ (três sublinhados) onde o estudante completa' : 'Enunciado'} aria-label="Enunciado" />
      <details>
        <summary className="small">Enunciado simplificado (para as versões TEA, TDAH e dislexia)</summary>
        <input className="input mt" value={q.enunciadoSimples ?? ''} onChange={(e) => set({ enunciadoSimples: e.target.value || undefined })} placeholder="Frase curta, uma ação por vez. Ex.: “Que fração está pintada?”" />
      </details>
      <div className="row">
        {q.imagem ? (
          <div className="row nowrap" style={{ alignItems: 'flex-start' }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 6, width: 220 }}><ImagemQuestao img={q.imagem} /></div>
            <div className="stack-sm"><button className="btn sm" onClick={onImagem}><ImagePlus /> Trocar imagem</button><button className="btn sm ghost" onClick={() => set({ imagem: undefined })}><X /> Tirar imagem</button></div>
          </div>
        ) : <button className="btn sm" onClick={onImagem}><ImagePlus /> Imagem ou ilustração</button>}
      </div>
      {q.tipo === 'multipla' && (
        <ListaEditavel label="Alternativa" values={q.itens} min={2} onChange={(itens) => set({ itens, correta: Math.min(q.correta ?? 0, itens.length - 1) })}
          extra={(i) => <label className="row nowrap xs" title="Correta"><input type="radio" name={`c-${q.id}`} checked={q.correta === i} onChange={() => set({ correta: i })} /> certa</label>} />
      )}
      {q.tipo === 'vf' && (
        <ListaEditavel label="Afirmação" values={q.itens} onChange={(itens) => set({ itens, vf: itens.map((_, i) => q.vf?.[i] ?? true) })}
          extra={(i) => <button className="chip" aria-label="Alternar verdadeiro/falso" onClick={() => set({ vf: q.itens.map((_, k) => (k === i ? !(q.vf?.[k] ?? true) : (q.vf?.[k] ?? true))) })} style={{ minWidth: 34 }}>{q.vf?.[i] ?? true ? 'V' : 'F'}</button>} />
      )}
      {q.tipo === 'ordenar' && <><p className="xs muted" style={{ margin: 0 }}>Digite na ordem CORRETA — na prova os itens aparecem embaralhados.</p><ListaEditavel label="Item" values={q.itens} min={2} onChange={(itens) => set({ itens })} /></>}
      {q.tipo === 'associacao' && (
        <div className="grid g2" style={{ gap: 10 }}>
          <div><p className="xs muted">Coluna A</p><ListaEditavel label="Item A" values={q.itens} min={2} onChange={(itens) => set({ itens, pares: itens.map((_, i) => q.pares?.[i] ?? '') })} /></div>
          <div><p className="xs muted">Coluna B (par de cada item — será embaralhada)</p>{q.itens.map((_, i) => <input key={i} className="input" style={{ marginBottom: 8 }} value={q.pares?.[i] ?? ''} onChange={(e) => set({ pares: q.itens.map((__, k) => (k === i ? e.target.value : q.pares?.[k] ?? '')) })} placeholder={`Par do item ${i + 1}`} />)}</div>
        </div>
      )}
      {(q.tipo === 'dissertativa' || q.tipo === 'desenho') && <label className="small row nowrap">{q.tipo === 'desenho' ? 'Altura do quadro (linhas)' : 'Linhas para resposta'} <input className="input" type="number" min={1} max={20} value={q.linhas ?? 4} onChange={(e) => set({ linhas: Number(e.target.value) })} style={{ width: 70 }} /></label>}
      {(q.tipo === 'dissertativa' || q.tipo === 'completar' || q.tipo === 'desenho') && <input className="input" value={q.resposta ?? ''} onChange={(e) => set({ resposta: e.target.value || undefined })} placeholder="Resposta esperada / critérios (vai para o gabarito)" aria-label="Resposta esperada" />}
    </article>
  );
}

function ImagemPicker({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (img: QuestaoImagem) => void }) {
  const [figId, setFigId] = useState(FIGURAS[0].id);
  const def = findFigura(figId)!;
  const [params, setParams] = useState<Record<string, number | string>>(() => padroes(FIGURAS[0]));
  const [alt, setAlt] = useState('');
  const [busy, setBusy] = useState(false);
  const pick = (id: string) => { setFigId(id); setParams(padroes(findFigura(id)!)); };
  return (
    <Modal open={open} onClose={onClose} title="Imagem da questão" wide>
      <div className="stack">
        <section className="panel tight stack-sm">
          <strong>Enviar uma imagem do seu dispositivo</strong>
          <p className="xs muted" style={{ margin: 0 }}>Foto, recorte de livro, mapa… A imagem é reduzida e fica salva só neste navegador.</p>
          <div className="row nowrap">
            <input className="input" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Descrição da imagem (para leitores de tela)" />
            <label className="btn" style={{ cursor: busy ? 'wait' : 'pointer' }}><ImagePlus /> {busy ? 'Enviando…' : 'Escolher arquivo'}
              <input type="file" accept="image/*" hidden disabled={busy} onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setBusy(true);
                try { const id = await guardarImagem(f); onPick({ kind: 'arquivo', fileId: id, alt: alt.trim() || f.name }); onClose(); } catch { toast('Não foi possível usar esta imagem'); } finally { setBusy(false); e.target.value = ''; }
              }} />
            </label>
          </div>
        </section>
        <section className="stack-sm">
          <strong>Ou use uma ilustração do Ensinaê (ajustável)</strong>
          <div className="row" role="group" aria-label="Ilustrações">{FIGURAS.map((f) => <button key={f.id} className={`chip ${figId === f.id ? 'on' : ''}`} aria-pressed={figId === f.id} onClick={() => pick(f.id)}>{f.nome}</button>)}</div>
          <div className="split-wide">
            <div style={{ background: '#fff', borderRadius: 10, padding: 12 }}><Figura id={figId} params={params} /></div>
            <div className="stack-sm">
              {def.params.map((p) => (
                <label key={p.key} className="stack-sm small">{p.label}
                  {p.tipo === 'opcao' ? <select className="input" value={String(params[p.key])} onChange={(e) => setParams({ ...params, [p.key]: e.target.value })}>{p.opcoes!.map((o) => <option key={o}>{o}</option>)}</select>
                    : <input className="input" type={p.tipo === 'numero' ? 'number' : 'text'} min={p.min} max={p.max} value={params[p.key]} onChange={(e) => setParams({ ...params, [p.key]: p.tipo === 'numero' ? Number(e.target.value) : e.target.value })} />}
                </label>
              ))}
              <button className="btn primary" onClick={() => { onPick({ kind: 'figura', id: figId, params }); onClose(); }}><Plus /> Usar esta ilustração</button>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
}

function BancoPicker({ open, onClose, onAdd, subject, ano }: { open: boolean; onClose: () => void; onAdd: (q: Questao) => void; subject?: SubjectId; ano?: number }) {
  const [subj, setSubj] = useState<SubjectId | ''>(subject ?? '');
  const [a, setA] = useState(ano ?? 0);
  const [txt, setTxt] = useState('');
  const qs = filtrarBanco(subj, a || undefined, txt);
  return (
    <Modal open={open} onClose={onClose} title="Adicionar do banco de questões" wide>
      <div className="stack">
        <div className="row">
          <select className="input" style={{ width: 'auto' }} value={subj} onChange={(e) => setSubj(e.target.value as SubjectId | '')} aria-label="Matéria"><option value="">Todas as matérias</option>{SUBJ_OPTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          <select className="input" style={{ width: 'auto' }} value={a} onChange={(e) => setA(Number(e.target.value))} aria-label="Ano"><option value={0}>Todos os anos</option>{ANOS.map((x) => <option key={x} value={x}>{x}º ano</option>)}</select>
          <input className="input grow" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Buscar" aria-label="Buscar" />
        </div>
        {qs.length === 0 && <div className="empty">Nenhuma questão com esses filtros.</div>}
        <div className="grid g2">{qs.map((q) => <QuestaoResumo key={q.id} q={q} onAdd={() => { onAdd(copiarQuestao(q, uid('q'))); toast('Questão adicionada'); }} />)}</div>
      </div>
    </Modal>
  );
}

export function ProvaEditor() {
  const { id } = useParams();
  const s = useApp();
  const nav = useNavigate();
  const existente = s.provas.find((p) => p.id === id);
  const [p, setP] = useState<Prova>(() => (existente ? structuredClone(existente) : novaProva()));
  const [banco, setBanco] = useState(false);
  const [imgFor, setImgFor] = useState<string | null>(null);
  const erros = validarProva(p);
  if (id && !existente) return <div className="empty">Prova não encontrada. <Link to="/provas">Voltar</Link></div>;
  const setQ = (qid: string, q: Questao) => setP({ ...p, questoes: p.questoes.map((x) => (x.id === qid ? q : x)) });
  const move = (i: number, d: -1 | 1) => { const j = i + d; if (j < 0 || j >= p.questoes.length) return; const qs = [...p.questoes]; [qs[i], qs[j]] = [qs[j], qs[i]]; setP({ ...p, questoes: qs }); };
  const salvar = (depois?: string) => { actions.saveProva(p); toast('Prova salva'); nav(depois ?? `/provas/${p.id}/editar`, { replace: !depois }); };
  return (
    <div className="stack">
      <Link to="/provas?aba=minhas" className="small">← Provas</Link>
      <div className="row between">
        <h1 style={{ margin: 0 }}>{existente ? 'Editar prova' : 'Nova prova'}</h1>
        <div className="row">
          <span className="small muted">{p.questoes.length} questões · {totalPontos(p).toLocaleString('pt-BR')} pontos</span>
          <button className="btn" disabled={!p.title.trim()} onClick={() => salvar(`/provas/${p.id}/imprimir`)}><Printer /> Salvar e ver</button>
          <button className="btn primary" disabled={!p.title.trim()} onClick={() => salvar()}>Salvar</button>
        </div>
      </div>
      <section className="panel stack-sm">
        <input className="input" style={{ fontSize: '1.15rem', fontWeight: 700 }} value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} placeholder="Título da prova (ex.: Avaliação de Ciências — 2º período)" aria-label="Título" />
        <div className="row">
          <select className="input" style={{ width: 'auto' }} value={p.subject ?? ''} onChange={(e) => setP({ ...p, subject: (e.target.value || undefined) as SubjectId | undefined })} aria-label="Matéria"><option value="">Matéria…</option>{SUBJ_OPTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          <select className="input" style={{ width: 'auto' }} value={p.ano ?? 0} onChange={(e) => setP({ ...p, ano: Number(e.target.value) || undefined })} aria-label="Ano"><option value={0}>Ano…</option>{ANOS.map((a) => <option key={a} value={a}>{a}º ano</option>)}</select>
          <select className="input" style={{ width: 'auto' }} value={p.perfil} onChange={(e) => setP({ ...p, perfil: e.target.value as PerfilAdaptacao })} aria-label="Versão padrão">{Object.values(PERFIS).map((x) => <option key={x.id} value={x.id}>Versão: {x.nome}</option>)}</select>
        </div>
        <textarea className="input" rows={2} value={p.instrucoes} onChange={(e) => setP({ ...p, instrucoes: e.target.value })} placeholder="Instruções para os estudantes" aria-label="Instruções" />
      </section>
      {p.questoes.map((q, i) => <QuestaoEditor key={q.id} q={q} n={i + 1} onChange={(nq) => setQ(q.id, nq)} onRemove={() => { if (confirm(`Remover a questão ${i + 1}?`)) setP({ ...p, questoes: p.questoes.filter((x) => x.id !== q.id) }); }} onMove={(d) => move(i, d)} onImagem={() => setImgFor(q.id)} />)}
      <section className="panel stack-sm">
        <strong>Adicionar questão</strong>
        <div className="row">
          {(Object.keys(TIPO_LABEL) as QuestaoTipo[]).map((t) => <button key={t} className="btn sm" onClick={() => setP({ ...p, questoes: [...p.questoes, novaQuestao(t)] })}><Plus /> {TIPO_LABEL[t]}</button>)}
          <button className="btn sm primary" onClick={() => setBanco(true)}><Library /> Do banco de questões</button>
        </div>
      </section>
      {erros.length > 0 && p.questoes.length > 0 && <Notice>Antes de imprimir: <ul className="bullets small" style={{ margin: '4px 0 0' }}>{erros.map((e) => <li key={e}>{e}</li>)}</ul></Notice>}
      <BancoPicker open={banco} onClose={() => setBanco(false)} subject={p.subject} ano={p.ano} onAdd={(q) => setP((cur) => ({ ...cur, questoes: [...cur.questoes, q] }))} />
      <ImagemPicker key={imgFor ?? 'x'} open={!!imgFor} onClose={() => setImgFor(null)} onPick={(img) => imgFor && setP((cur) => ({ ...cur, questoes: cur.questoes.map((x) => (x.id === imgFor ? { ...x, imagem: img } : x)) }))} />
    </div>
  );
}

// ───────────── Visualizar e imprimir ─────────────

export function ProvaPrint() {
  const { id } = useParams();
  const s = useApp();
  const [params, setParams] = useSearchParams();
  const prova = useMemo(() => s.provas.find((p) => p.id === id) ?? PROVAS_PRONTAS.find((p) => p.id === id), [s.provas, id]);
  const turmaAtiva = s.turmas.find((t) => t.id === s.activeTurmaId);
  const [cab, setCab] = useState({ escola: s.org.name, professor: s.user.displayName, turma: turmaAtiva?.name ?? '', data: '' });
  const [gab, setGab] = useState(false);
  if (!prova) return <div className="empty">Prova não encontrada. <Link to="/provas">Voltar</Link></div>;
  const perfil = (params.get('perfil') as PerfilAdaptacao) || prova.perfil;
  const erros = validarProva(prova);
  return (
    <div className="stack">
      <div className="stack no-print">
        <Link to={prova.pronta ? '/provas?aba=prontas' : '/provas?aba=minhas'} className="small">← Provas</Link>
        <div className="row between">
          <h1 style={{ margin: 0 }}>{prova.title}</h1>
          <div className="row">
            {!prova.pronta && <Link className="btn" to={`/provas/${prova.id}/editar`}><Pencil /> Editar</Link>}
            <button className="btn primary" onClick={() => window.print()}><Printer /> Imprimir / salvar PDF</button>
          </div>
        </div>
        <section className="panel stack-sm">
          <strong>Versão da prova</strong>
          <div className="row" role="group" aria-label="Adaptação">{Object.values(PERFIS).map((x) => <button key={x.id} className={`chip ${perfil === x.id ? 'on' : ''}`} aria-pressed={perfil === x.id} onClick={() => setParams({ perfil: x.id })}>{x.nome}</button>)}</div>
          <p className="small muted" style={{ margin: 0 }}>{PERFIS[perfil].resumo}</p>
          {perfil !== 'padrao' && <p className="xs muted" style={{ margin: 0 }}>Adaptações ajudam no acesso — ajuste também tempo, ambiente e apoio de leitura conforme o plano (PEI/PDI) de cada estudante.</p>}
          <div className="grid g4" style={{ gap: 8 }}>
            {(['escola', 'professor', 'turma', 'data'] as const).map((k) => <input key={k} className="input" value={cab[k]} onChange={(e) => setCab({ ...cab, [k]: e.target.value })} placeholder={k[0].toUpperCase() + k.slice(1)} aria-label={k} />)}
          </div>
          <label className="row nowrap small"><input type="checkbox" checked={gab} onChange={(e) => setGab(e.target.checked)} /> Incluir gabarito (em página separada)</label>
        </section>
        {erros.length > 0 && <Notice>Esta prova tem pendências: {erros.join(' ')}</Notice>}
      </div>
      <div className="prova-sheet">
        <ProvaDoc prova={prova} perfil={perfil} cab={cab} comGabarito={gab} />
      </div>
    </div>
  );
}
