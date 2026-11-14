import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  BarChart3, ChevronLeft, ClipboardCheck, Download, Eye, FolderOpen, MessageCircleQuestion, NotebookPen, Plus, Shuffle, Ticket,
  Trash2, Users, X,
} from 'lucide-react';
import { DemoBadge, Modal, Notice, Tabs, toast } from '../components/ui';
import { GAME_ACTIVITIES, STORIES, findLesson, refTitle } from '../content';
import { shuffle } from '../engine/games';
import { download } from '../lib/files';
import { actions, now, uid, useApp } from '../store/store';
import type { ExitTicket, Observation, Rubric, Turma } from '../types/models';

type Tab = 'visao' | 'grupos' | 'avaliacao' | 'portfolio';
const OBS_TAG: Record<Observation['tag'], string> = { avanco: 'Avanço', duvida: 'Dúvida', colaboracao: 'Colaboração', apoio: 'Precisa de apoio', outro: 'Outro' };
const SELF = ['Entendi o objetivo da aula', 'Consegui explicar meu raciocínio', 'Colaborei com meu grupo'];
const SELF_LEVELS = ['Ainda não', 'Um pouco', 'Quase', 'Sim!'];

function Overview({ t }: { t: Turma }) {
  const s = useApp();
  const prods = s.productions.filter((p) => p.turmaId === t.id);
  const games = s.gameSessions.filter((g) => g.turmaId === t.id && g.finishedAt);
  const tickets = s.exitTickets.filter((e) => e.turmaId === t.id);
  const responses = tickets.reduce((n, e) => n + e.responses.length, 0);
  const obs = s.observations.filter((o) => o.turmaId === t.id);
  const doubts = s.doubts.filter((d) => d.turmaId === t.id).sort((a, b) => b.count - a.count);
  const selfs = s.selfAssessments.filter((a) => a.turmaId === t.id);
  const supportGroups = obs.filter((o) => o.tag === 'apoio' && o.groupId).map((o) => t.groups.find((g) => g.id === o.groupId)?.name).filter(Boolean);
  const empty = !prods.length && !games.length && !responses && !obs.length;
  return (
    <div className="stack">
      <Notice kind="info">Este painel mostra apenas o que foi <strong>registrado nas atividades</strong> desta turma neste navegador. Não há pontuações individuais nem inferências diagnósticas.</Notice>
      {empty && <div className="empty">Ainda não há registros. Aplique um jogo, salve uma produção ou crie um bilhete de saída — os dados aparecerão aqui.</div>}
      <div className="grid g4">
        {[[prods.length, 'produções no portfólio'], [games.length, 'partidas concluídas'], [responses, 'respostas em bilhetes de saída'], [obs.length, 'observações registradas']].map(([n, l]) => (
          <div key={String(l)} className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{n}</div><span className="small muted">{l}</span></div>
        ))}
      </div>
      <div className="grid g3">
        <section className="panel">
          <div className="panel-title"><Users /><h3 style={{ margin: 0 }}>Quem precisa de apoio?</h3></div>
          {supportGroups.length ? <ul className="bullets small">{Array.from(new Set(supportGroups)).map((g) => <li key={g}>{g}</li>)}</ul> : <p className="small muted">Nenhuma observação marcada como “precisa de apoio”. Registre na aba Avaliação.</p>}
        </section>
        <section className="panel">
          <div className="panel-title"><BarChart3 /><h3 style={{ margin: 0 }}>Partidas recentes</h3></div>
          {games.length === 0 ? <p className="small muted">Nenhuma partida concluída com esta turma.</p> : (
            <ul className="clean stack-sm">{games.slice(0, 5).map((g) => {
              const solved = g.rounds.filter((r) => r.correct).length;
              return <li key={g.id} className="small"><strong>{GAME_ACTIVITIES.find((a) => a.id === g.activityId)?.title}</strong><br /><span className="muted">{solved}/{g.rounds.length} resolvidos · {g.cooperative ? 'cooperativo' : 'por equipes'} · {new Date(g.startedAt).toLocaleDateString('pt-BR')}</span></li>;
            })}</ul>
          )}
        </section>
        <section className="panel">
          <div className="panel-title"><MessageCircleQuestion /><h3 style={{ margin: 0 }}>Dúvidas recorrentes</h3></div>
          {doubts.length === 0 ? <p className="small muted">As dúvidas dos bilhetes de saída aparecem aqui, agrupadas.</p> : <ul className="clean stack-sm">{doubts.slice(0, 6).map((d) => <li key={d.id} className="row nowrap small"><span className="badge">{d.count}×</span> {d.text}</li>)}</ul>}
        </section>
      </div>
      {selfs.length > 0 && (
        <section className="panel">
          <h3>Autoavaliação da turma ({selfs.length} respostas)</h3>
          <p className="xs muted">Distribuição das respostas — sem identificar estudantes.</p>
          {SELF.map((q) => (
            <div key={q} className="mt"><span className="small">{q}</span>
              <div className="row nowrap" style={{ gap: 2, marginTop: 4 }}>{SELF_LEVELS.map((lv, i) => { const n = selfs.filter((a) => a.answers[q] === i).length; return n ? <div key={lv} title={`${lv}: ${n}`} style={{ flex: n, background: ['#fb7185', '#fbbf24', '#60a5fa', '#4ade80'][i], height: 18, borderRadius: 4, fontSize: 11, color: '#111', textAlign: 'center', fontWeight: 800 }}>{n}</div> : null; })}</div>
            </div>
          ))}
          <div className="row xs muted mt">{SELF_LEVELS.map((lv, i) => <span key={lv}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: ['#fb7185', '#fbbf24', '#60a5fa', '#4ade80'][i] }} /> {lv}</span>)}</div>
        </section>
      )}
    </div>
  );
}

function Groups({ t }: { t: Turma }) {
  const [n, setN] = useState(Math.max(2, t.groups.length || 4));
  const [newName, setNewName] = useState('');
  const save = (p: Partial<Turma>) => actions.saveTurma({ ...t, ...p });
  const groupOf = (sid: string) => t.groups.find((g) => g.studentIds.includes(sid))?.id ?? '';
  const assign = (sid: string, gid: string) => save({ groups: t.groups.map((g) => ({ ...g, studentIds: g.id === gid ? [...g.studentIds.filter((x) => x !== sid), sid] : g.studentIds.filter((x) => x !== sid) })) });
  const draw = () => {
    const ids = shuffle(t.students.map((x) => x.id), Date.now() % 99991);
    const names = ['Arvoredo', 'Rio Vivo', 'Horizonte', 'Aurora', 'Cometa', 'Floresta', 'Maré', 'Sol'];
    save({ groups: Array.from({ length: n }).map((_, i) => ({ id: t.groups[i]?.id ?? uid('g'), name: t.groups[i]?.name ?? `Equipe ${names[i % names.length]}`, studentIds: ids.filter((_, k) => k % n === i) })) });
    toast('Grupos formados');
  };
  return (
    <div className="split-wide">
      <section className="panel">
        <div className="row between mb"><h3 style={{ margin: 0 }}>Estudantes ({t.students.length})</h3>{t.demo && <DemoBadge />}</div>
        <ul className="clean stack-sm">
          {t.students.map((st) => (
            <li key={st.id} className="row nowrap list-item" style={{ margin: 0 }}>
              <span className="grow">{st.displayName}</span>
              <select className="input" style={{ width: 'auto' }} aria-label={`Grupo de ${st.displayName}`} value={groupOf(st.id)} onChange={(e) => assign(st.id, e.target.value)}>
                <option value="">Sem grupo</option>{t.groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
              <button className="btn icon ghost" aria-label={`Remover ${st.displayName}`} onClick={() => { if (confirm(`Remover ${st.displayName} da turma?`)) save({ students: t.students.filter((x) => x.id !== st.id), groups: t.groups.map((g) => ({ ...g, studentIds: g.studentIds.filter((x) => x !== st.id) })) }); }}><X /></button>
            </li>
          ))}
        </ul>
        <form className="row mt" onSubmit={(e) => { e.preventDefault(); if (!newName.trim()) return; save({ students: [...t.students, { id: uid('s'), displayName: newName.trim() }] }); setNewName(''); }}>
          <input className="input grow" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nome de exibição" aria-label="Novo estudante" />
          <button className="btn" type="submit"><Plus /> Adicionar</button>
        </form>
      </section>
      <aside className="stack">
        <section className="panel stack-sm">
          <h3 style={{ margin: 0 }}>Organização de grupos</h3>
          <label className="row small">Número de grupos <input className="input" type="number" min={2} max={8} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: 70 }} /></label>
          <button className="btn primary" onClick={draw}><Shuffle /> Sortear grupos equilibrados</button>
          <ul className="clean stack-sm mt">
            {t.groups.map((g) => (
              <li key={g.id} className="panel tight">
                <input className="input" value={g.name} aria-label="Nome do grupo" onChange={(e) => save({ groups: t.groups.map((x) => (x.id === g.id ? { ...x, name: e.target.value } : x)) })} />
                <p className="xs muted" style={{ margin: '6px 0 0' }}>{g.studentIds.map((sid) => t.students.find((x) => x.id === sid)?.displayName).filter(Boolean).join(', ') || 'Sem integrantes'}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel stack-sm">
          <h3 style={{ margin: 0 }}>Recursos da turma</h3>
          {(['projetor', 'computador-unico', 'dispositivos-grupo', 'dispositivos-individuais', 'sem-internet', 'impressora'] as const).map((r) => (
            <label key={r} className="row small"><input type="checkbox" checked={t.resources.includes(r)} onChange={(e) => save({ resources: e.target.checked ? [...t.resources, r] : t.resources.filter((x) => x !== r) })} /> {({ projetor: 'Projetor', 'computador-unico': 'Um computador', 'dispositivos-grupo': 'Dispositivos por grupo', 'dispositivos-individuais': 'Dispositivo por aluno', 'sem-internet': 'Sem internet', impressora: 'Impressora' })[r]}</label>
          ))}
        </section>
      </aside>
    </div>
  );
}

function Assessment({ t, lessonId }: { t: Turma; lessonId?: string }) {
  const s = useApp();
  const tickets = s.exitTickets.filter((e) => e.turmaId === t.id);
  const [prompt, setPrompt] = useState('Em poucas linhas: o que você aprendeu, uma dúvida e uma ideia.');
  const [active, setActive] = useState<string | null>(tickets[0]?.id ?? null);
  const ticket = tickets.find((x) => x.id === active);
  const [resp, setResp] = useState({ authorLabel: '', learned: '', doubt: '', idea: '' });
  const [obs, setObs] = useState<{ text: string; tag: Observation['tag']; groupId: string }>({ text: '', tag: 'avanco', groupId: '' });
  const [rubric, setRubric] = useState<Rubric | null>(null);
  const [applyRubric, setApplyRubric] = useState<Rubric | null>(null);
  const [rubricLevels, setRubricLevels] = useState<Record<string, number>>({});
  const [rubricGroup, setRubricGroup] = useState('');
  const [selfOpen, setSelfOpen] = useState(false);
  const [selfAns, setSelfAns] = useState<Record<string, number>>({});
  const lessonTitle = lessonId ? findLesson(lessonId, s.myLessons)?.title : undefined;

  const newTicket = () => {
    const tk: ExitTicket = { id: uid('bs'), turmaId: t.id, lessonId, prompt: lessonTitle ? `${lessonTitle}: ${prompt}` : prompt, responses: [], createdAt: now() };
    actions.saveExitTicket(tk);
    setActive(tk.id);
  };
  const addResp = () => {
    if (!ticket) return;
    actions.saveExitTicket({ ...ticket, responses: [...ticket.responses, { id: uid('r'), ...resp, authorLabel: resp.authorLabel.trim() || 'Anônimo', createdAt: now() }] });
    if (resp.doubt.trim()) actions.addDoubt(t.id, resp.doubt);
    setResp({ authorLabel: '', learned: '', doubt: '', idea: '' });
    toast('Resposta registrada');
  };

  return (
    <div className="stack">
      <div className="grid g2">
        <section className="panel stack-sm">
          <div className="panel-title"><Ticket /><h3 style={{ margin: 0 }}>Bilhete de saída</h3></div>
          {lessonTitle && <span className="badge cyan" style={{ alignSelf: 'flex-start' }}>Aula: {lessonTitle}</span>}
          <div className="row nowrap"><input className="input" value={prompt} onChange={(e) => setPrompt(e.target.value)} aria-label="Pergunta do bilhete" /><button className="btn" onClick={newTicket}><Plus /> Abrir</button></div>
          {tickets.length > 0 && <select className="input" value={active ?? ''} onChange={(e) => setActive(e.target.value)} aria-label="Bilhete">{tickets.map((tk) => <option key={tk.id} value={tk.id}>{new Date(tk.createdAt).toLocaleDateString('pt-BR')} — {tk.prompt.slice(0, 60)} ({tk.responses.length})</option>)}</select>}
          {ticket && (
            <>
              <p className="small muted" style={{ margin: 0 }}>Os estudantes podem preencher no mesmo dispositivo (um de cada vez) ou em papel — e o professor digita depois.</p>
              <input className="input" placeholder="Nome ou “Anônimo”" value={resp.authorLabel} onChange={(e) => setResp({ ...resp, authorLabel: e.target.value })} aria-label="Autor" />
              <textarea className="input" rows={2} placeholder="O que aprendi…" value={resp.learned} onChange={(e) => setResp({ ...resp, learned: e.target.value })} aria-label="O que aprendi" />
              <input className="input" placeholder="Uma dúvida…" value={resp.doubt} onChange={(e) => setResp({ ...resp, doubt: e.target.value })} aria-label="Dúvida" />
              <input className="input" placeholder="Uma ideia…" value={resp.idea} onChange={(e) => setResp({ ...resp, idea: e.target.value })} aria-label="Ideia" />
              <button className="btn primary" onClick={addResp} disabled={!resp.learned.trim() && !resp.doubt.trim() && !resp.idea.trim()}>Registrar resposta</button>
              <details><summary className="small" style={{ cursor: 'pointer' }}><Eye size={14} /> Ver respostas ({ticket.responses.length})</summary>
                <ul className="clean stack-sm mt">{ticket.responses.map((r) => <li key={r.id} className="small list-item" style={{ display: 'block', margin: 0 }}><strong>{r.authorLabel}</strong>{r.learned && <div>📘 {r.learned}</div>}{r.doubt && <div>❓ {r.doubt}</div>}{r.idea && <div>💡 {r.idea}</div>}</li>)}</ul>
              </details>
            </>
          )}
        </section>
        <section className="panel stack-sm">
          <div className="panel-title"><NotebookPen /><h3 style={{ margin: 0 }}>Registro de observações</h3></div>
          <textarea className="input" rows={3} value={obs.text} onChange={(e) => setObs({ ...obs, text: e.target.value })} placeholder="Ex.: A Equipe Rio Vivo explicou a porcentagem usando a fração 1/4." aria-label="Observação" />
          <div className="row">
            <select className="input" style={{ width: 'auto' }} value={obs.tag} onChange={(e) => setObs({ ...obs, tag: e.target.value as Observation['tag'] })} aria-label="Tipo">{Object.entries(OBS_TAG).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
            <select className="input" style={{ width: 'auto' }} value={obs.groupId} onChange={(e) => setObs({ ...obs, groupId: e.target.value })} aria-label="Grupo"><option value="">Turma toda</option>{t.groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select>
            <button className="btn primary" disabled={!obs.text.trim()} onClick={() => { actions.addObservation({ turmaId: t.id, text: obs.text.trim(), tag: obs.tag, groupId: obs.groupId || undefined }); setObs({ ...obs, text: '' }); toast('Observação registrada'); }}>Registrar</button>
          </div>
          <ul className="clean stack-sm" style={{ maxHeight: 260, overflow: 'auto' }}>
            {s.observations.filter((o) => o.turmaId === t.id).map((o) => (
              <li key={o.id} className="small list-item" style={{ margin: 0 }}><span className="badge">{OBS_TAG[o.tag]}</span><span className="grow">{o.text} <span className="xs faint">· {o.groupId ? t.groups.find((g) => g.id === o.groupId)?.name : 'turma'} · {new Date(o.createdAt).toLocaleDateString('pt-BR')}</span></span><button className="btn icon ghost" aria-label="Excluir observação" onClick={() => actions.removeObservation(o.id)}><Trash2 size={15} /></button></li>
            ))}
          </ul>
        </section>
      </div>
      <div className="grid g2">
        <section className="panel stack-sm">
          <div className="panel-title"><ClipboardCheck /><h3 style={{ margin: 0 }}>Rubricas editáveis</h3><button className="btn sm right" onClick={() => setRubric({ id: uid('rb'), title: 'Nova rubrica', criteria: [{ id: uid('c'), label: 'Critério', levels: ['Inicial', 'Em desenvolvimento', 'Proficiente', 'Avançado'] }] })}><Plus /> Nova</button></div>
          {s.rubrics.map((r) => (
            <div key={r.id} className="list-item" style={{ margin: 0 }}><span className="grow"><strong>{r.title}</strong> <span className="xs muted">· {r.criteria.length} critérios</span></span>
              <button className="btn sm ghost" onClick={() => setRubric(structuredClone(r))}>Editar</button>
              <button className="btn sm" onClick={() => { setApplyRubric(r); setRubricLevels({}); setRubricGroup(t.groups[0]?.id ?? ''); }}>Usar com um grupo</button></div>
          ))}
        </section>
        <section className="panel stack-sm">
          <div className="panel-title"><Users /><h3 style={{ margin: 0 }}>Autoavaliação</h3></div>
          <p className="small muted" style={{ margin: 0 }}>Três afirmações simples. As respostas são resumidas como distribuição da turma.</p>
          <button className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={() => { setSelfAns({}); setSelfOpen(true); }}>Abrir autoavaliação neste dispositivo</button>
          <span className="xs faint">{s.selfAssessments.filter((a) => a.turmaId === t.id).length} resposta(s) registradas.</span>
        </section>
      </div>

      <Modal open={!!rubric} onClose={() => setRubric(null)} title="Editar rubrica" wide>
        {rubric && (
          <div className="stack">
            <input className="input" value={rubric.title} onChange={(e) => setRubric({ ...rubric, title: e.target.value })} aria-label="Título da rubrica" />
            {rubric.criteria.map((c, ci) => (
              <div key={c.id} className="panel tight stack-sm">
                <div className="row nowrap"><input className="input" value={c.label} aria-label="Critério" onChange={(e) => setRubric({ ...rubric, criteria: rubric.criteria.map((x, k) => (k === ci ? { ...x, label: e.target.value } : x)) })} /><button className="btn icon ghost" aria-label="Remover critério" onClick={() => setRubric({ ...rubric, criteria: rubric.criteria.filter((_, k) => k !== ci) })}><Trash2 /></button></div>
                <div className="grid g4" style={{ gap: 6 }}>{c.levels.map((lv, li) => <input key={li} className="input xs" value={lv} aria-label={`Nível ${li + 1}`} onChange={(e) => setRubric({ ...rubric, criteria: rubric.criteria.map((x, k) => (k === ci ? { ...x, levels: x.levels.map((y, m) => (m === li ? e.target.value : y)) } : x)) })} />)}</div>
              </div>
            ))}
            <div className="row"><button className="btn" onClick={() => setRubric({ ...rubric, criteria: [...rubric.criteria, { id: uid('c'), label: 'Novo critério', levels: ['Inicial', 'Em desenvolvimento', 'Proficiente', 'Avançado'] }] })}><Plus /> Critério</button>
              <button className="btn primary" onClick={() => { actions.saveRubric(rubric); setRubric(null); toast('Rubrica salva'); }}>Salvar rubrica</button></div>
          </div>
        )}
      </Modal>
      <Modal open={!!applyRubric} onClose={() => setApplyRubric(null)} title={applyRubric?.title ?? ''} wide>
        {applyRubric && (
          <div className="stack">
            <select className="input" value={rubricGroup} onChange={(e) => setRubricGroup(e.target.value)} aria-label="Grupo">{t.groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select>
            {applyRubric.criteria.map((c) => (
              <fieldset key={c.id} className="panel tight" style={{ border: '1px solid var(--border)' }}><legend className="small" style={{ fontWeight: 700 }}>{c.label}</legend>
                <div className="row">{c.levels.map((lv, i) => <button key={i} className={`chip ${rubricLevels[c.id] === i ? 'on' : ''}`} aria-pressed={rubricLevels[c.id] === i} onClick={() => setRubricLevels({ ...rubricLevels, [c.id]: i })}>{lv}</button>)}</div>
              </fieldset>
            ))}
            <p className="xs muted">O registro descreve o momento do grupo — serve para planejar o próximo passo, não para rotular estudantes.</p>
            <button className="btn primary" disabled={!rubricGroup} onClick={() => {
              const text = `${applyRubric.title}: ${applyRubric.criteria.map((c) => `${c.label} — ${rubricLevels[c.id] !== undefined ? c.levels[rubricLevels[c.id]] : 'não observado'}`).join('; ')}`;
              actions.addObservation({ turmaId: t.id, groupId: rubricGroup, tag: 'avanco', text });
              setApplyRubric(null); toast('Registro da rubrica salvo nas observações');
            }}>Registrar</button>
          </div>
        )}
      </Modal>
      <Modal open={selfOpen} onClose={() => setSelfOpen(false)} title="Como foi a aula para você?">
        <div className="stack">
          {SELF.map((q) => (
            <fieldset key={q} style={{ border: 0, padding: 0 }}><legend style={{ fontWeight: 700, marginBottom: 6 }}>{q}</legend>
              <div className="row">{SELF_LEVELS.map((lv, i) => <button key={lv} className={`chip ${selfAns[q] === i ? 'on' : ''}`} aria-pressed={selfAns[q] === i} onClick={() => setSelfAns({ ...selfAns, [q]: i })} style={{ fontSize: '1rem', padding: '8px 14px' }}>{['😕', '🙂', '😀', '🤩'][i]} {lv}</button>)}</div>
            </fieldset>
          ))}
          <button className="btn primary" disabled={Object.keys(selfAns).length < SELF.length} onClick={() => { actions.addSelfAssessment({ id: uid('sa'), turmaId: t.id, authorLabel: 'Anônimo', answers: selfAns, comment: '', createdAt: now() }); setSelfAns({}); toast('Obrigado! Próximo estudante pode responder.'); }}>Enviar e passar para o próximo</button>
          <button className="btn ghost" onClick={() => setSelfOpen(false)}>Encerrar</button>
        </div>
      </Modal>
    </div>
  );
}

function Portfolio({ t }: { t: Turma }) {
  const s = useApp();
  const items = s.productions.filter((p) => p.turmaId === t.id);
  const [kind, setKind] = useState('');
  const shown = items.filter((p) => !kind || p.kind === kind);
  const exportAll = () => download(`portfolio-${t.name}.md`, `# Portfólio — ${t.name}\n\n${items.map((p) => `## ${p.title}\n_${p.authorLabel} · ${new Date(p.createdAt).toLocaleString('pt-BR')}_${p.sourceRef ? ` · ${refTitle(p.sourceRef)}` : ''}\n\n${p.content}\n`).join('\n')}`, 'text/markdown;charset=utf-8');
  return (
    <div className="stack">
      <div className="row between">
        <div className="row" role="group" aria-label="Filtrar por tipo">
          <button className={`chip ${!kind ? 'on' : ''}`} aria-pressed={!kind} onClick={() => setKind('')}>Tudo ({items.length})</button>
          {Array.from(new Set(items.map((p) => p.kind))).map((k) => <button key={k} className={`chip ${kind === k ? 'on' : ''}`} aria-pressed={kind === k} onClick={() => setKind(k)}>{k}</button>)}
        </div>
        <button className="btn sm" onClick={exportAll} disabled={!items.length}><Download /> Exportar portfólio</button>
      </div>
      {shown.length === 0 && <div className="empty">O portfólio reúne produções salvas em histórias, simulações, jogos e imersões.</div>}
      <div className="grid g3">
        {shown.map((p) => (
          <article key={p.id} className="panel tight stack-sm">
            <div className="row between nowrap"><span className="badge cyan">{p.kind}</span><button className="btn icon ghost" aria-label="Excluir produção" onClick={() => { if (confirm('Excluir esta produção?')) actions.removeProduction(p.id); }}><Trash2 size={15} /></button></div>
            <strong>{p.title}</strong>
            <span className="xs muted">{p.authorLabel} · {new Date(p.createdAt).toLocaleString('pt-BR')}{p.sourceRef ? ` · ${refTitle(p.sourceRef)}` : ''}</span>
            <p className="small" style={{ margin: 0, whiteSpace: 'pre-wrap', maxHeight: 180, overflow: 'auto' }}>{p.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function ClassPage() {
  const { id } = useParams();
  const s = useApp();
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const t = s.turmas.find((x) => x.id === id);
  const tab = (params.get('aba') as Tab) || 'visao';
  const releasable = useMemo(() => [...GAME_ACTIVITIES.map((g) => ({ key: `game:${g.id}`, title: g.title })), ...STORIES.map((x) => ({ key: `story:${x.id}`, title: x.title }))], []);
  if (!t) return <div className="empty">Turma não encontrada. <Link to="/turmas">Voltar</Link></div>;
  return (
    <div className="stack">
      <Link to="/turmas" className="small"><ChevronLeft size={14} /> Turmas</Link>
      <div className="row between">
        <div><h1 style={{ margin: 0 }}>{t.name}</h1><p className="muted" style={{ margin: 0 }}>{t.students.length} estudantes · {t.groups.length} grupos {t.demo && <DemoBadge />}</p></div>
        <div className="row">
          {s.activeTurmaId !== t.id && <button className="btn" onClick={() => actions.setTurma(t.id)}>Tornar turma ativa</button>}
          <button className="btn danger sm" onClick={() => { if (confirm(`Excluir a turma ${t.name}? Os registros ligados a ela permanecem no portfólio.`)) { actions.deleteTurma(t.id); nav('/turmas'); } }}><Trash2 /> Excluir</button>
        </div>
      </div>
      {t.demo && <Notice>Lista de estudantes demonstrativa (nomes fictícios). Os registros que você fizer, porém, são reais e ficam salvos neste navegador.</Notice>}
      <Tabs<Tab> label="Seções da turma" value={tab} onChange={(v) => setParams({ aba: v })} items={[
        { id: 'visao', label: 'Acompanhamento', icon: <BarChart3 size={16} /> },
        { id: 'grupos', label: 'Estudantes e grupos', icon: <Users size={16} /> },
        { id: 'avaliacao', label: 'Avaliação formativa', icon: <ClipboardCheck size={16} /> },
        { id: 'portfolio', label: 'Portfólio', icon: <FolderOpen size={16} /> },
      ]} />
      {tab === 'visao' && <Overview t={t} />}
      {tab === 'grupos' && <Groups t={t} />}
      {tab === 'avaliacao' && <Assessment t={t} lessonId={params.get('aula') ?? undefined} />}
      {tab === 'portfolio' && <Portfolio t={t} />}
      {tab === 'visao' && (
        <section className="panel">
          <h3>Atividades liberadas para o perfil Aluno</h3>
          <p className="small muted">Escolha o que aparece quando alguém usa o AulaViva no perfil Aluno (no mesmo dispositivo ou nos dispositivos da escola com este navegador).</p>
          <div className="row">{releasable.map((r) => <button key={r.key} className={`chip ${s.released.includes(r.key) ? 'on' : ''}`} aria-pressed={s.released.includes(r.key)} onClick={() => actions.toggleRelease(r.key)}>{r.title}</button>)}</div>
        </section>
      )}
    </div>
  );
}
