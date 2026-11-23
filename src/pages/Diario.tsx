/**
 * Diário da turma: chamada, notas, planejamento (atividades, desafios, temas e provas),
 * histórico e relatórios exportáveis para o sistema da escola.
 */
import { useMemo, useState } from 'react';
import {
  CalendarCheck, Check, CopyPlus, Download, FileSpreadsheet, Pencil, Plus, Printer, Trash2, UserCheck,
} from 'lucide-react';
import { Modal, Notice, toast } from '../components/ui';
import { GAME_ACTIVITIES, findLesson } from '../content';
import { download } from '../lib/files';
import {
  PERIODOS, SITUACAO_LABEL, csvChamada, csvNotas, csvRelatorio, fmtNota, frequencia, media, nota10, ordenarAlunos,
  ordenarHistorico, parseNota, periodoDaData, relatorioTurma, type EventoHistorico,
} from '../lib/diario';
import { actions, now, uid, useApp } from '../store/store';
import type { Avaliacao, AvaliacaoTipo, Chamada, ItemTurma, ItemTurmaTipo, Presenca, Turma } from '../types/models';

const hoje = () => new Date().toISOString().slice(0, 10);
const br = (d: string) => d.slice(0, 10).split('-').reverse().join('/');
const slug = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();

const PRES_LABEL: Record<Presenca, string> = { P: 'Presente', F: 'Falta', J: 'Justificada' };
const PRES_COLOR: Record<Presenca, string> = { P: '#4ade80', F: '#fb7185', J: '#fbbf24' };
const TIPO_AV: Record<AvaliacaoTipo, string> = { prova: 'Prova', trabalho: 'Trabalho', atividade: 'Atividade', desafio: 'Desafio', participacao: 'Participação', recuperacao: 'Recuperação' };
const TIPO_ITEM: Record<ItemTurmaTipo, string> = { atividade: 'Atividade', desafio: 'Desafio', tema: 'Tema / projeto', prova: 'Prova' };
const TIPO_ITEM_COLOR: Record<ItemTurmaTipo, string> = { atividade: 'cyan', desafio: 'violet', tema: 'amber', prova: 'rose' };

function PeriodoSelect({ value, onChange, all }: { value: number; onChange: (v: number) => void; all?: boolean }) {
  return (
    <div className="row" role="group" aria-label="Período letivo">
      {all && <button className={`chip ${value === 0 ? 'on' : ''}`} aria-pressed={value === 0} onClick={() => onChange(0)}>Ano todo</button>}
      {PERIODOS.map((p) => <button key={p} className={`chip ${value === p ? 'on' : ''}`} aria-pressed={value === p} onClick={() => onChange(p)}>{p}º período</button>)}
    </div>
  );
}

// ───────────── Chamada ─────────────

export function ChamadaTab({ t }: { t: Turma }) {
  const s = useApp();
  const chamadas = s.chamadas.filter((c) => c.turmaId === t.id).sort((a, b) => b.date.localeCompare(a.date));
  const alunos = ordenarAlunos(t.students);
  const novo = (date: string): Chamada => ({ id: uid('ch'), turmaId: t.id, date, aulas: 1, conteudo: '', presencas: Object.fromEntries(alunos.map((a) => [a.id, 'P' as Presenca])), createdAt: now() });
  const [edit, setEdit] = useState<Chamada>(() => chamadas.find((c) => c.date === hoje()) ?? novo(hoje()));
  const salvo = s.chamadas.some((c) => c.id === edit.id);
  const pickDate = (date: string) => setEdit(chamadas.find((c) => c.date === date) ?? novo(date));
  const setP = (sid: string, p: Presenca) => setEdit({ ...edit, presencas: { ...edit.presencas, [sid]: p } });
  const cycle: Record<Presenca, Presenca> = { P: 'F', F: 'J', J: 'P' };
  const faltas = alunos.filter((a) => edit.presencas[a.id] === 'F').length;

  if (!alunos.length) return <div className="empty">Cadastre os estudantes na aba “Estudantes e grupos” para fazer a chamada.</div>;
  return (
    <div className="split-wide">
      <section className="panel stack">
        <div className="row between">
          <h3 style={{ margin: 0 }}><UserCheck size={18} /> Chamada de {br(edit.date)}</h3>
          {salvo && <span className="badge">salva</span>}
        </div>
        <div className="row">
          <label className="small row nowrap">Data <input className="input" type="date" value={edit.date} onChange={(e) => e.target.value && pickDate(e.target.value)} /></label>
          <label className="small row nowrap">Aulas no dia <input className="input" type="number" min={1} max={6} value={edit.aulas} onChange={(e) => setEdit({ ...edit, aulas: Math.max(1, Number(e.target.value) || 1) })} style={{ width: 70 }} /></label>
          <button className="btn sm" onClick={() => setEdit({ ...edit, presencas: Object.fromEntries(alunos.map((a) => [a.id, 'P' as Presenca])) })}><Check /> Todos presentes</button>
        </div>
        <p className="xs muted" style={{ margin: 0 }}>Toque no nome para alternar: Presente → Falta → Justificada.</p>
        <ul className="clean stack-sm">
          {alunos.map((a) => {
            const p = edit.presencas[a.id] ?? 'P';
            return (
              <li key={a.id} className="row nowrap list-item" style={{ margin: 0 }}>
                <button className="grow" style={{ all: 'unset', cursor: 'pointer', flex: 1 }} onClick={() => setP(a.id, cycle[p])} aria-label={`${a.displayName}: ${PRES_LABEL[p]}. Alterar`}>
                  {a.numero && <span className="xs muted">{a.numero}. </span>}{a.displayName}
                </button>
                <div className="row nowrap" role="group" aria-label={`Presença de ${a.displayName}`}>
                  {(['P', 'F', 'J'] as Presenca[]).map((v) => (
                    <button key={v} className="chip" aria-pressed={p === v} title={PRES_LABEL[v]} onClick={() => setP(a.id, v)}
                      style={p === v ? { background: PRES_COLOR[v], color: '#111', borderColor: PRES_COLOR[v], fontWeight: 800 } : undefined}>{v}</button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <label className="stack-sm small">Conteúdo da aula (vai para o histórico e o relatório)
          <textarea className="input" rows={2} value={edit.conteudo} onChange={(e) => setEdit({ ...edit, conteudo: e.target.value })} placeholder="Ex.: Frações equivalentes — jogo da memória em grupos" />
        </label>
        <div className="row">
          <button className="btn primary" onClick={() => { actions.saveChamada(edit); toast(`Chamada salva: ${alunos.length - faltas} presentes, ${faltas} falta(s)`); }}><CalendarCheck /> Salvar chamada</button>
          {salvo && <button className="btn ghost danger" onClick={() => { if (confirm('Excluir esta chamada?')) { actions.deleteChamada(edit.id); setEdit(novo(edit.date)); } }}><Trash2 /> Excluir</button>}
        </div>
      </section>
      <aside className="stack">
        <section className="panel stack-sm">
          <h3 style={{ margin: 0 }}>Chamadas feitas ({chamadas.length})</h3>
          {chamadas.length === 0 && <p className="small muted">Nenhuma chamada salva ainda.</p>}
          <ul className="clean stack-sm" style={{ maxHeight: 420, overflow: 'auto' }}>
            {chamadas.map((c) => {
              const f = Object.values(c.presencas).filter((p) => p === 'F').length;
              return (
                <li key={c.id}>
                  <button className={`list-item ${c.id === edit.id ? 'on' : ''}`} style={{ width: '100%', margin: 0, textAlign: 'left' }} onClick={() => setEdit(c)}>
                    <span className="grow"><strong>{br(c.date)}</strong> <span className="xs muted">· {c.aulas} aula(s) · {f} falta(s)</span>{c.conteudo && <><br /><span className="xs muted">{c.conteudo}</span></>}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="panel stack-sm">
          <h3 style={{ margin: 0 }}>Frequência acumulada</h3>
          <ul className="clean stack-sm small">
            {alunos.map((a) => {
              const f = frequencia(a.id, chamadas);
              const low = f.percentual !== null && f.percentual < s.diarioConfig.freqMinima;
              return <li key={a.id} className="row between nowrap"><span>{a.displayName}</span><span className={low ? 'badge rose' : 'muted'}>{f.percentual === null ? '—' : `${f.percentual.toLocaleString('pt-BR')}%`} · {f.faltas}F</span></li>;
            })}
          </ul>
        </section>
      </aside>
    </div>
  );
}

// ───────────── Notas ─────────────

function novaAvaliacao(turmaId: string, periodo: number, from?: Partial<Avaliacao>): Avaliacao {
  return { id: uid('av'), turmaId, title: '', tipo: 'prova', date: hoje(), periodo, notaMax: 10, peso: 1, notas: {}, createdAt: now(), ...from };
}

function AvaliacaoForm({ a, onChange }: { a: Avaliacao; onChange: (a: Avaliacao) => void }) {
  return (
    <div className="stack">
      <input className="input" value={a.title} onChange={(e) => onChange({ ...a, title: e.target.value })} placeholder="Título (ex.: Prova de frações)" aria-label="Título da avaliação" />
      <div className="grid g3" style={{ gap: 10 }}>
        <label className="stack-sm small">Tipo<select className="input" value={a.tipo} onChange={(e) => onChange({ ...a, tipo: e.target.value as AvaliacaoTipo })}>{Object.entries(TIPO_AV).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        <label className="stack-sm small">Data<input className="input" type="date" value={a.date} onChange={(e) => onChange({ ...a, date: e.target.value, periodo: periodoDaData(e.target.value) })} /></label>
        <label className="stack-sm small">Período<select className="input" value={a.periodo} onChange={(e) => onChange({ ...a, periodo: Number(e.target.value) })}>{PERIODOS.map((p) => <option key={p} value={p}>{p}º período</option>)}</select></label>
        <label className="stack-sm small">Nota máxima<input className="input" type="number" min={1} step="0.5" value={a.notaMax} onChange={(e) => onChange({ ...a, notaMax: Math.max(0.5, Number(e.target.value) || 10) })} /></label>
        <label className="stack-sm small">Peso na média<input className="input" type="number" min={0} step="0.5" value={a.peso} onChange={(e) => onChange({ ...a, peso: Math.max(0, Number(e.target.value)) })} /></label>
      </div>
      {a.tipo === 'recuperacao' && <p className="xs muted" style={{ margin: 0 }}>Recuperação: se a nota (convertida para 0–10) for maior que a média do período, ela substitui a média.</p>}
    </div>
  );
}

function NotaInput({ a, sid, name }: { a: Avaliacao; sid: string; name: string }) {
  const saved = a.notas[sid];
  const [txt, setTxt] = useState(saved === undefined ? '' : String(saved).replace('.', ','));
  const n = parseNota(txt);
  const invalid = n !== undefined && (Number.isNaN(n) || n < 0 || n > a.notaMax);
  const commit = () => {
    if (invalid) return;
    if (n !== saved) actions.setNota(a.id, sid, n);
  };
  return (
    <input className="input" inputMode="decimal" value={txt} onChange={(e) => setTxt(e.target.value)} onBlur={commit}
      onKeyDown={(e) => { if (e.key === 'Enter') { commit(); (e.target as HTMLInputElement).blur(); } }}
      aria-label={`Nota de ${name} em ${a.title}`} aria-invalid={invalid}
      style={{ width: 64, textAlign: 'center', padding: '6px 4px', borderColor: invalid ? '#fb7185' : undefined }} title={invalid ? `Use um número entre 0 e ${a.notaMax}` : undefined} />
  );
}

export function NotasTab({ t }: { t: Turma }) {
  const s = useApp();
  const [periodo, setPeriodo] = useState(() => periodoDaData(hoje()));
  const [edit, setEdit] = useState<Avaliacao | null>(null);
  const avs = s.avaliacoes.filter((a) => a.turmaId === t.id && a.periodo === periodo).sort((a, b) => a.date.localeCompare(b.date));
  const alunos = ordenarAlunos(t.students);
  const min = s.diarioConfig.mediaMinima;
  return (
    <div className="stack">
      <div className="row between">
        <PeriodoSelect value={periodo} onChange={setPeriodo} />
        <div className="row">
          <button className="btn sm" disabled={!avs.length} onClick={() => download(`notas-${slug(t.name)}-${periodo}periodo.csv`, csvNotas(t, s.avaliacoes, periodo), 'text/csv;charset=utf-8')}><FileSpreadsheet /> Exportar notas (CSV)</button>
          <button className="btn primary sm" onClick={() => setEdit(novaAvaliacao(t.id, periodo))}><Plus /> Nova avaliação</button>
        </div>
      </div>
      {!alunos.length && <div className="empty">Cadastre os estudantes na aba “Estudantes e grupos”.</div>}
      {alunos.length > 0 && !avs.length && <div className="empty">Nenhuma avaliação no {periodo}º período. Crie uma avaliação para lançar notas — ou transforme uma prova/atividade do Planejamento em avaliação.</div>}
      {alunos.length > 0 && avs.length > 0 && (
        <div className="panel" style={{ overflowX: 'auto', padding: 0 }}>
          <table className="data" style={{ minWidth: 420 + avs.length * 90 }}>
            <thead>
              <tr>
                <th style={{ position: 'sticky', left: 0, background: 'var(--panel)' }}>Estudante</th>
                {avs.map((a) => (
                  <th key={a.id} style={{ textAlign: 'center', textTransform: 'none' }}>
                    <button className="btn sm ghost" style={{ padding: '2px 6px' }} onClick={() => setEdit(structuredClone(a))} title="Editar avaliação">
                      <span style={{ display: 'block', fontWeight: 800 }}>{a.title || TIPO_AV[a.tipo]}</span>
                    </button>
                    <span className="xs faint" style={{ display: 'block', fontWeight: 400 }}>{br(a.date)} · máx {a.notaMax} · p{a.peso}</span>
                  </th>
                ))}
                <th style={{ textAlign: 'center' }}>Média</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((st) => {
                const m = media(st.id, avs);
                return (
                  <tr key={st.id}>
                    <td style={{ position: 'sticky', left: 0, background: 'var(--panel)', whiteSpace: 'nowrap' }}>{st.numero && <span className="xs muted">{st.numero}. </span>}{st.displayName}</td>
                    {avs.map((a) => <td key={a.id} style={{ textAlign: 'center' }}><NotaInput key={`${a.id}-${a.notas[st.id] ?? ''}`} a={a} sid={st.id} name={st.displayName} /></td>)}
                    <td style={{ textAlign: 'center', fontWeight: 800, color: m !== null && m < min ? '#fb7185' : undefined }}>{fmtNota(m)}</td>
                  </tr>
                );
              })}
              <tr>
                <td style={{ position: 'sticky', left: 0, background: 'var(--panel)' }} className="muted small">Média da turma</td>
                {avs.map((a) => {
                  const v = Object.values(a.notas);
                  return <td key={a.id} className="small muted" style={{ textAlign: 'center' }}>{v.length ? fmtNota(nota10(v.reduce((x, y) => x + y, 0) / v.length, a.notaMax)) : '—'}<span className="xs faint"> ({v.length}/{alunos.length})</span></td>;
                })}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <p className="xs muted">Médias em escala 0–10, ponderadas pelo peso de cada avaliação. Notas em vermelho: abaixo da média mínima ({fmtNota(min)}). Ajuste a média mínima em Relatórios.</p>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit && s.avaliacoes.some((a) => a.id === edit.id) ? 'Editar avaliação' : 'Nova avaliação'}>
        {edit && (
          <div className="stack">
            <AvaliacaoForm a={edit} onChange={setEdit} />
            <div className="row">
              <button className="btn primary" disabled={!edit.title.trim()} onClick={() => { actions.saveAvaliacao(edit); setPeriodo(edit.periodo); setEdit(null); toast('Avaliação salva'); }}>Salvar</button>
              {s.avaliacoes.some((a) => a.id === edit.id) && <button className="btn ghost danger" onClick={() => { if (confirm('Excluir esta avaliação e todas as notas lançadas nela?')) { actions.deleteAvaliacao(edit.id); setEdit(null); } }}><Trash2 /> Excluir</button>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ───────────── Planejamento (atividades, desafios, temas, provas) ─────────────

function novoItem(turmaId: string, tipo: ItemTurmaTipo = 'atividade'): ItemTurma {
  return { id: uid('it'), turmaId, tipo, title: '', description: '', date: hoje(), status: 'planejado', createdAt: now(), updatedAt: now() };
}

export function PlanejamentoTab({ t }: { t: Turma }) {
  const s = useApp();
  const [filtro, setFiltro] = useState<ItemTurmaTipo | ''>('');
  const [edit, setEdit] = useState<ItemTurma | null>(null);
  const [sel, setSel] = useState<string[]>([]);
  const [importar, setImportar] = useState(false);
  const itens = s.itensTurma.filter((i) => i.turmaId === t.id).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const shown = itens.filter((i) => !filtro || i.tipo === filtro);
  const outras = s.turmas.filter((x) => x.id !== t.id);
  const toggle = (id: string) => setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]);
  const avDoItem = (id: string) => s.avaliacoes.find((a) => a.itemId === id);

  const virarAvaliacao = (i: ItemTurma) => {
    const date = i.date ?? hoje();
    const tipo: AvaliacaoTipo = i.tipo === 'prova' ? 'prova' : i.tipo === 'desafio' ? 'desafio' : i.tipo === 'tema' ? 'trabalho' : 'atividade';
    actions.saveAvaliacao(novaAvaliacao(t.id, periodoDaData(date), { title: i.title, tipo, date, itemId: i.id }));
    toast('Avaliação criada — lance as notas na aba Notas');
  };

  return (
    <div className="stack">
      <Notice kind="info">Monte aqui o que esta turma vai fazer: <strong>atividades, desafios, temas de projeto e provas</strong>. Cada turma tem o seu planejamento — e você pode copiar itens para outras turmas.</Notice>
      <div className="row between">
        <div className="row" role="group" aria-label="Filtrar por tipo">
          <button className={`chip ${!filtro ? 'on' : ''}`} aria-pressed={!filtro} onClick={() => setFiltro('')}>Tudo ({itens.length})</button>
          {(Object.keys(TIPO_ITEM) as ItemTurmaTipo[]).map((k) => <button key={k} className={`chip ${filtro === k ? 'on' : ''}`} aria-pressed={filtro === k} onClick={() => setFiltro(k)}>{TIPO_ITEM[k]} ({itens.filter((i) => i.tipo === k).length})</button>)}
        </div>
        <div className="row">
          <button className="btn sm" disabled={!sel.length || !outras.length} onClick={() => setImportar(true)} title={!outras.length ? 'Crie outra turma para copiar' : undefined}><CopyPlus /> Copiar {sel.length || ''} para outra turma</button>
          <button className="btn primary sm" onClick={() => setEdit(novoItem(t.id, filtro || 'atividade'))}><Plus /> Novo item</button>
        </div>
      </div>
      {shown.length === 0 && <div className="empty">Nada planejado {filtro ? `do tipo “${TIPO_ITEM[filtro]}”` : ''} ainda. Clique em “Novo item”.</div>}
      <div className="grid g2">
        {shown.map((i) => {
          const av = avDoItem(i.id);
          const origem = i.importadoDe ? s.itensTurma.find((x) => x.id === i.importadoDe) : undefined;
          return (
            <article key={i.id} className="panel tight stack-sm" style={{ outline: sel.includes(i.id) ? '2px solid var(--accent)' : undefined }}>
              <div className="row between nowrap">
                <label className="row nowrap small"><input type="checkbox" checked={sel.includes(i.id)} onChange={() => toggle(i.id)} aria-label={`Selecionar ${i.title}`} /> <span className={`badge ${TIPO_ITEM_COLOR[i.tipo]}`}>{TIPO_ITEM[i.tipo]}</span></label>
                <span className={`badge ${i.status === 'aplicado' ? 'green' : ''}`}>{i.status === 'aplicado' ? 'Aplicado' : 'Planejado'}</span>
              </div>
              <strong>{i.title}</strong>
              {i.date && <span className="xs muted">Previsto para {br(i.date)}{origem ? ` · copiado de ${s.turmas.find((x) => x.id === origem.turmaId)?.name ?? 'outra turma'}` : ''}</span>}
              {i.description && <p className="small" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{i.description}</p>}
              <div className="row">
                <button className="btn sm ghost" onClick={() => setEdit(structuredClone(i))}><Pencil /> Editar</button>
                <button className="btn sm ghost" onClick={() => actions.saveItemTurma({ ...i, status: i.status === 'aplicado' ? 'planejado' : 'aplicado' })}><Check /> {i.status === 'aplicado' ? 'Desmarcar' : 'Marcar aplicado'}</button>
                {av ? <span className="xs muted">Notas em: {av.title}</span> : <button className="btn sm ghost" onClick={() => virarAvaliacao(i)}><Plus /> Lançar notas</button>}
              </div>
            </article>
          );
        })}
      </div>

      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit && s.itensTurma.some((x) => x.id === edit.id) ? 'Editar item' : 'Novo item da turma'}>
        {edit && (
          <div className="stack">
            <div className="row" role="group" aria-label="Tipo">{(Object.keys(TIPO_ITEM) as ItemTurmaTipo[]).map((k) => <button key={k} className={`chip ${edit.tipo === k ? 'on' : ''}`} aria-pressed={edit.tipo === k} onClick={() => setEdit({ ...edit, tipo: k })}>{TIPO_ITEM[k]}</button>)}</div>
            <input className="input" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} placeholder="Título" aria-label="Título" />
            <textarea className="input" rows={5} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} placeholder="Descrição, passo a passo, materiais, critérios…" aria-label="Descrição" />
            <div className="row">
              <label className="small row nowrap">Data prevista <input className="input" type="date" value={edit.date ?? ''} onChange={(e) => setEdit({ ...edit, date: e.target.value || undefined })} /></label>
              <label className="small row nowrap"><input type="checkbox" checked={edit.status === 'aplicado'} onChange={(e) => setEdit({ ...edit, status: e.target.checked ? 'aplicado' : 'planejado' })} /> Já aplicado</label>
            </div>
            <div className="row">
              <button className="btn primary" disabled={!edit.title.trim()} onClick={() => { actions.saveItemTurma(edit); setEdit(null); toast('Item salvo'); }}>Salvar</button>
              {s.itensTurma.some((x) => x.id === edit.id) && <button className="btn ghost danger" onClick={() => { if (confirm('Excluir este item?')) { actions.deleteItemTurma(edit.id); setEdit(null); } }}><Trash2 /> Excluir</button>}
            </div>
          </div>
        )}
      </Modal>
      <ImportarModal open={importar} onClose={() => setImportar(false)} origem={t} itemIds={sel} onDone={() => setSel([])} />
    </div>
  );
}

function ImportarModal({ open, onClose, origem, itemIds, onDone }: { open: boolean; onClose: () => void; origem: Turma; itemIds: string[]; onDone: () => void }) {
  const s = useApp();
  const [destinos, setDestinos] = useState<string[]>([]);
  const [comAvaliacoes, setComAvaliacoes] = useState(true);
  const outras = s.turmas.filter((x) => x.id !== origem.id);
  const avIds = comAvaliacoes ? s.avaliacoes.filter((a) => a.itemId && itemIds.includes(a.itemId)).map((a) => a.id) : [];
  return (
    <Modal open={open} onClose={onClose} title={`Copiar ${itemIds.length} item(ns) de ${origem.name}`}>
      <div className="stack">
        <p className="small muted" style={{ margin: 0 }}>Os itens chegam como “planejado”. Notas e presenças não são copiadas — cada turma tem as suas.</p>
        <fieldset className="stack-sm" style={{ border: 0, padding: 0 }}><legend className="small" style={{ fontWeight: 700 }}>Para quais turmas?</legend>
          {outras.map((o) => <label key={o.id} className="row nowrap"><input type="checkbox" checked={destinos.includes(o.id)} onChange={() => setDestinos(destinos.includes(o.id) ? destinos.filter((d) => d !== o.id) : [...destinos, o.id])} /> {o.name}</label>)}
        </fieldset>
        <label className="row nowrap small"><input type="checkbox" checked={comAvaliacoes} onChange={(e) => setComAvaliacoes(e.target.checked)} /> Copiar também as avaliações ligadas (sem as notas)</label>
        <button className="btn primary" disabled={!destinos.length} onClick={() => { actions.importarParaTurmas(itemIds, avIds, destinos); toast(`Copiado para ${destinos.length} turma(s)`); setDestinos([]); onDone(); onClose(); }}><CopyPlus /> Copiar</button>
      </div>
    </Modal>
  );
}

// ───────────── Histórico ─────────────

export function HistoricoTab({ t }: { t: Turma }) {
  const s = useApp();
  const [kind, setKind] = useState<EventoHistorico['kind'] | ''>('');
  const eventos = useMemo(() => {
    const ev: EventoHistorico[] = [];
    for (const c of s.chamadas.filter((x) => x.turmaId === t.id)) {
      const f = Object.values(c.presencas).filter((p) => p === 'F').length;
      ev.push({ date: c.date, kind: 'chamada', title: c.conteudo || 'Chamada', detail: `${c.aulas} aula(s) · ${f} falta(s)` });
    }
    for (const a of s.avaliacoes.filter((x) => x.turmaId === t.id)) ev.push({ date: a.date, kind: 'avaliacao', title: a.title, detail: `${TIPO_AV[a.tipo]} · ${a.periodo}º período · ${Object.keys(a.notas).length} nota(s) lançada(s)` });
    for (const i of s.itensTurma.filter((x) => x.turmaId === t.id)) ev.push({ date: i.date ?? i.createdAt, kind: 'item', title: i.title, detail: `${TIPO_ITEM[i.tipo]} · ${i.status === 'aplicado' ? 'aplicado' : 'planejado'}` });
    for (const a of s.agenda.filter((x) => x.turmaId === t.id)) ev.push({ date: a.date, kind: 'aula', title: a.title, detail: `${a.time}${a.lessonId ? ` · ${findLesson(a.lessonId, s.myLessons)?.title ?? ''}` : ''}` });
    for (const g of s.gameSessions.filter((x) => x.turmaId === t.id)) ev.push({ date: g.startedAt, kind: 'jogo', title: GAME_ACTIVITIES.find((x) => x.id === g.activityId)?.title ?? 'Jogo', detail: `${g.rounds.filter((r) => r.correct).length}/${g.rounds.length} resolvidos` });
    for (const p of s.productions.filter((x) => x.turmaId === t.id)) ev.push({ date: p.createdAt, kind: 'producao', title: p.title, detail: `${p.kind} · ${p.authorLabel}` });
    for (const o of s.observations.filter((x) => x.turmaId === t.id)) ev.push({ date: o.createdAt, kind: 'observacao', title: o.text.slice(0, 90), detail: o.studentId ? t.students.find((x) => x.id === o.studentId)?.displayName : t.groups.find((x) => x.id === o.groupId)?.name });
    return ordenarHistorico(ev);
  }, [s, t]);
  const LABEL: Record<EventoHistorico['kind'], string> = { chamada: 'Chamada', avaliacao: 'Avaliação', item: 'Planejamento', aula: 'Aula agendada', jogo: 'Jogo', producao: 'Produção', observacao: 'Observação' };
  const shown = eventos.filter((e) => !kind || e.kind === kind);
  let lastMonth = '';
  return (
    <div className="stack">
      <div className="row" role="group" aria-label="Filtrar histórico">
        <button className={`chip ${!kind ? 'on' : ''}`} aria-pressed={!kind} onClick={() => setKind('')}>Tudo ({eventos.length})</button>
        {(Object.keys(LABEL) as EventoHistorico['kind'][]).filter((k) => eventos.some((e) => e.kind === k)).map((k) => <button key={k} className={`chip ${kind === k ? 'on' : ''}`} aria-pressed={kind === k} onClick={() => setKind(k)}>{LABEL[k]}</button>)}
      </div>
      {shown.length === 0 && <div className="empty">O histórico junta chamadas, avaliações, planejamento, aulas agendadas, jogos, produções e observações desta turma.</div>}
      <ol className="clean stack-sm">
        {shown.map((e, i) => {
          const month = new Date(e.date.length === 10 ? `${e.date}T12:00` : e.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
          const head = month !== lastMonth;
          lastMonth = month;
          return (
            <li key={i}>
              {head && <h3 style={{ margin: '14px 0 6px' }}>{month.charAt(0).toUpperCase() + month.slice(1)}</h3>}
              <div className="list-item" style={{ margin: 0 }}>
                <span className="badge" style={{ minWidth: 92, justifyContent: 'center' }}>{LABEL[e.kind]}</span>
                <span className="grow"><strong>{e.title}</strong>{e.detail && <span className="xs muted"> · {e.detail}</span>}</span>
                <span className="xs muted">{br(e.date)}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ───────────── Relatórios ─────────────

export function RelatoriosTab({ t }: { t: Turma }) {
  const s = useApp();
  const [periodo, setPeriodo] = useState(0);
  const [alunoId, setAlunoId] = useState<string | null>(null);
  const cfg = s.diarioConfig;
  const linhas = relatorioTurma(t, s.chamadas, s.avaliacoes, periodo || undefined, cfg);
  const chamadasT = s.chamadas.filter((c) => c.turmaId === t.id);
  const avsT = s.avaliacoes.filter((a) => a.turmaId === t.id && (!periodo || a.periodo === periodo)).sort((a, b) => a.date.localeCompare(b.date));
  const itensT = s.itensTurma.filter((i) => i.turmaId === t.id && i.status === 'aplicado');
  const conteudos = chamadasT.filter((c) => c.conteudo && (!periodo || periodoDaData(c.date) === periodo)).sort((a, b) => a.date.localeCompare(b.date));
  const nomePeriodo = periodo ? `${periodo}º período` : 'Ano letivo';
  const base = `${slug(t.name)}-${periodo ? `${periodo}periodo` : 'ano'}`;
  const resumo = {
    abaixo: linhas.filter((l) => l.mediaGeral !== null && l.mediaGeral < cfg.mediaMinima).length,
    freq: linhas.filter((l) => l.freq.percentual !== null && l.freq.percentual < cfg.freqMinima).length,
    mediaTurma: (() => { const v = linhas.map((l) => l.mediaGeral).filter((m): m is number => m !== null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; })(),
  };
  const aluno = alunoId ? t.students.find((x) => x.id === alunoId) : undefined;
  const linhaAluno = linhas.find((l) => l.student.id === alunoId);
  const obsAluno = alunoId ? s.observations.filter((o) => o.turmaId === t.id && o.studentId === alunoId) : [];

  const doc = aluno && linhaAluno ? (
    <div className="print-only print-doc">
      <div className="print-band" />
      <h1>Relatório individual — {aluno.displayName}</h1>
      <p>{s.org.name} · Turma {t.name} · {nomePeriodo} · Professor(a) {s.user.displayName} · emitido em {new Date().toLocaleDateString('pt-BR')}</p>
      <h2>Frequência</h2>
      <p>{linhaAluno.freq.aulas} aulas registradas · {linhaAluno.freq.faltas} faltas ({linhaAluno.freq.justificadas} justificadas) · presença de {linhaAluno.freq.percentual ?? '—'}%</p>
      <h2>Avaliações</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr><th align="left">Avaliação</th><th>Data</th><th>Nota</th><th>Máx.</th><th>Peso</th></tr></thead>
        <tbody>{avsT.map((a) => <tr key={a.id}><td>{a.title} ({TIPO_AV[a.tipo]})</td><td align="center">{br(a.date)}</td><td align="center">{a.notas[aluno.id] ?? '—'}</td><td align="center">{a.notaMax}</td><td align="center">{a.peso}</td></tr>)}</tbody></table>
      <p><strong>Média {periodo ? 'do período' : 'geral'}: {fmtNota(linhaAluno.mediaGeral)}</strong> · Situação: {SITUACAO_LABEL[linhaAluno.situacao]}</p>
      {obsAluno.length > 0 && <><h2>Observações do professor</h2><ul>{obsAluno.map((o) => <li key={o.id}>{br(o.createdAt)} — {o.text}</li>)}</ul></>}
      <h2>Parecer</h2>
      <div className="lines" /><div className="lines" /><div className="lines" />
    </div>
  ) : (
    <div className="print-only print-doc">
      <div className="print-band" />
      <h1>Relatório da turma {t.name} — {nomePeriodo}</h1>
      <p>{s.org.name} · Professor(a) {s.user.displayName} · emitido em {new Date().toLocaleDateString('pt-BR')} · média mínima {fmtNota(cfg.mediaMinima)} · frequência mínima {cfg.freqMinima}%</p>
      <h2>Resumo</h2>
      <p>{t.students.length} estudantes · {chamadasT.length} chamadas · {avsT.length} avaliações · média da turma {fmtNota(resumo.mediaTurma)} · {resumo.abaixo} abaixo da média · {resumo.freq} com frequência baixa</p>
      <h2>Notas e frequência</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
        <thead><tr><th align="left">Nº</th><th align="left">Estudante</th>{periodo ? <th>Média</th> : PERIODOS.map((p) => <th key={p}>{p}º</th>)}{!periodo && <th>Geral</th>}<th>Faltas</th><th>Freq.</th><th align="left">Situação</th></tr></thead>
        <tbody>{linhas.map((l) => <tr key={l.student.id}><td>{l.student.numero ?? ''}</td><td>{l.student.displayName}</td>{periodo ? <td align="center">{fmtNota(l.mediaGeral)}</td> : PERIODOS.map((p) => <td key={p} align="center">{fmtNota(l.medias[p])}</td>)}{!periodo && <td align="center">{fmtNota(l.mediaGeral)}</td>}<td align="center">{l.freq.faltas}</td><td align="center">{l.freq.percentual ?? '—'}%</td><td>{SITUACAO_LABEL[l.situacao]}</td></tr>)}</tbody>
      </table>
      {conteudos.length > 0 && <><h2>Conteúdos trabalhados</h2><ul>{conteudos.map((c) => <li key={c.id}>{br(c.date)} — {c.conteudo}</li>)}</ul></>}
      {itensT.length > 0 && <><h2>Atividades, desafios e projetos aplicados</h2><ul>{itensT.map((i) => <li key={i.id}>{i.date ? `${br(i.date)} — ` : ''}{TIPO_ITEM[i.tipo]}: {i.title}</li>)}</ul></>}
    </div>
  );

  return (
    <div className="has-print">
      <div className="stack no-print">
        <div className="row between">
          <PeriodoSelect value={periodo} onChange={setPeriodo} all />
          <div className="row">
            <label className="small row nowrap">Média mínima <input className="input" type="number" min={0} max={10} step="0.5" value={cfg.mediaMinima} onChange={(e) => actions.setDiarioConfig({ mediaMinima: Number(e.target.value) })} style={{ width: 70 }} /></label>
            <label className="small row nowrap">Frequência mínima % <input className="input" type="number" min={0} max={100} value={cfg.freqMinima} onChange={(e) => actions.setDiarioConfig({ freqMinima: Number(e.target.value) })} style={{ width: 70 }} /></label>
          </div>
        </div>
        <div className="grid g4">
          {[[t.students.length, 'estudantes'], [fmtNota(resumo.mediaTurma), 'média da turma'], [resumo.abaixo, 'abaixo da média'], [resumo.freq, 'com frequência baixa']].map(([n, l]) => (
            <div key={String(l)} className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{n}</div><span className="small muted">{l}</span></div>
          ))}
        </div>
        <section className="panel stack-sm">
          <h3 style={{ margin: 0 }}><Download size={18} /> Exportar para o sistema da escola</h3>
          <p className="small muted" style={{ margin: 0 }}>Arquivos CSV (separados por ponto e vírgula) abrem no Excel/Google Planilhas e podem ser importados nos sistemas escolares. Preencha o <strong>Nº</strong> de cada estudante (aba Estudantes e grupos) para facilitar a importação.</p>
          <div className="row">
            <button className="btn" onClick={() => download(`relatorio-${base}.csv`, csvRelatorio(t, linhas, periodo || undefined), 'text/csv;charset=utf-8')}><FileSpreadsheet /> Médias e frequência</button>
            <button className="btn" onClick={() => download(`notas-${base}.csv`, csvNotas(t, s.avaliacoes, periodo || undefined), 'text/csv;charset=utf-8')}><FileSpreadsheet /> Todas as notas</button>
            <button className="btn" onClick={() => download(`chamada-${base}.csv`, csvChamada(t, s.chamadas, periodo || undefined), 'text/csv;charset=utf-8')}><FileSpreadsheet /> Chamada (dia a dia)</button>
            <button className="btn primary" onClick={() => { setAlunoId(null); setTimeout(() => window.print(), 50); }}><Printer /> Imprimir / salvar PDF da turma</button>
          </div>
        </section>
        <div className="panel" style={{ overflowX: 'auto', padding: 0 }}>
          <table className="data">
            <thead><tr><th>Estudante</th>{periodo ? <th>Média</th> : PERIODOS.map((p) => <th key={p} style={{ textAlign: 'center' }}>{p}º</th>)}{!periodo && <th style={{ textAlign: 'center' }}>Geral</th>}<th style={{ textAlign: 'center' }}>Faltas</th><th style={{ textAlign: 'center' }}>Freq.</th><th>Situação</th><th /></tr></thead>
            <tbody>
              {linhas.map((l) => (
                <tr key={l.student.id}>
                  <td>{l.student.numero && <span className="xs muted">{l.student.numero}. </span>}{l.student.displayName}</td>
                  {periodo ? <td style={{ textAlign: 'center' }}>{fmtNota(l.mediaGeral)}</td> : PERIODOS.map((p) => <td key={p} style={{ textAlign: 'center' }}>{fmtNota(l.medias[p])}</td>)}
                  {!periodo && <td style={{ textAlign: 'center', fontWeight: 800 }}>{fmtNota(l.mediaGeral)}</td>}
                  <td style={{ textAlign: 'center' }}>{l.freq.faltas}</td>
                  <td style={{ textAlign: 'center' }}>{l.freq.percentual === null ? '—' : `${l.freq.percentual.toLocaleString('pt-BR')}%`}</td>
                  <td><span className={`badge ${l.situacao === 'aprovado' ? 'green' : l.situacao === 'sem-dados' ? '' : 'rose'}`}>{SITUACAO_LABEL[l.situacao]}</span></td>
                  <td><button className="btn sm ghost" onClick={() => { setAlunoId(l.student.id); setTimeout(() => window.print(), 50); }} title="Relatório individual (imprimir / PDF)"><Printer size={14} /> Individual</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="xs muted">“Abaixo da média” e “frequência baixa” são alertas para planejar apoio — não substituem o conselho de classe nem as regras de aprovação da sua escola.</p>
      </div>
      {doc}
    </div>
  );
}

/** Campo para editar o número de chamada / matrícula de um estudante. */
export function NumeroInput({ t, sid }: { t: Turma; sid: string }) {
  const st = t.students.find((x) => x.id === sid);
  const [v, setV] = useState(st?.numero ?? '');
  if (!st) return null;
  return (
    <input className="input" value={v} onChange={(e) => setV(e.target.value)} onBlur={() => { if (v.trim() !== (st.numero ?? '')) actions.saveTurma({ ...t, students: t.students.map((x) => (x.id === sid ? { ...x, numero: v.trim() || undefined } : x)) }); }}
      placeholder="Nº" aria-label={`Número de ${st.displayName}`} style={{ width: 64 }} />
  );
}
