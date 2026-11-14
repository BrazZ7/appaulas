import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowDown, ArrowUp, Captions, CheckCircle2, Circle, Clapperboard, Download, FileVideo, Film, Image, Mic, Plus, Sparkles,
  Trash2, Upload, Wand2, FolderOpen, ShieldCheck, Clock,
} from 'lucide-react';
import { Art } from '../components/Art';
import { Modal, Notice, Steps, toast } from '../components/ui';
import { LESSONS } from '../content';
import { deleteFile, download, getFile, putFile, scenesToVtt } from '../lib/files';
import { actions, uid, useApp } from '../store/store';
import type { VideoProject, VideoScene, VideoStep } from '../types/models';

const STEPS: { id: VideoStep; label: string }[] = [
  { id: 'tema', label: 'Tema' }, { id: 'objetivo', label: 'Objetivo' }, { id: 'roteiro', label: 'Roteiro' }, { id: 'cenas', label: 'Cenas' },
  { id: 'visuais', label: 'Recursos visuais' }, { id: 'narracao', label: 'Narração e legendas' }, { id: 'revisao', label: 'Revisão' }, { id: 'video', label: 'Vídeo' },
];
const REVIEW = ['Informações conferidas em fontes confiáveis', 'Linguagem adequada à faixa etária', 'Representação diversa e sem estereótipos', 'Legendas revisadas', 'Direitos de imagem e música verificados', 'Perguntas antes/depois definidas'];

const blank = (): VideoProject => ({
  id: uid('vid'), title: 'Novo vídeo', theme: '', objective: '', audience: '7º ano (12 a 13 anos)', scenes: [], fileIds: [],
  questionsBefore: [], questionsAfter: [], status: 'rascunho', source: 'producao-propria', reviewNotes: '', updatedAt: new Date().toISOString(),
});

const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

function templateScenes(theme: string): VideoScene[] {
  const t = theme || 'o tema';
  return [
    { id: uid('sc'), title: 'Abertura', script: `Pergunta que desperta curiosidade sobre ${t}.`, visuals: 'Plano aberto do lugar ou objeto principal.', narration: '', captions: '', durationSec: 15 },
    { id: uid('sc'), title: 'Descoberta', script: `Apresentar 2 ou 3 informações essenciais sobre ${t}, com fontes.`, visuals: 'Imagens de apoio, mapa ou linha do tempo.', narration: '', captions: '', durationSec: 40 },
    { id: uid('sc'), title: 'Desafio', script: 'Mostrar um problema ou dilema atual ligado ao tema.', visuals: 'Pessoas reais da comunidade (com autorização).', narration: '', captions: '', durationSec: 30 },
    { id: uid('sc'), title: 'Reflexão', script: 'Encerrar com uma pergunta aberta para a turma.', visuals: 'Retorno ao plano inicial.', narration: '', captions: '', durationSec: 20 },
  ];
}

export default function Studio() {
  const s = useApp();
  const [params] = useSearchParams();
  const [curId, setCurId] = useState<string | null>(params.get('video') ?? s.videoProjects[0]?.id ?? null);
  const cur = s.videoProjects.find((v) => v.id === curId) ?? null;
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [vttUrl, setVttUrl] = useState<string | null>(null);
  const [higgs, setHiggs] = useState(false);
  const [review, setReview] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const vttRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<Record<string, string>>(() => JSON.parse(localStorage.getItem('aulaviva:fileNames') ?? '{}'));
  const allLessons = useMemo(() => [...s.myLessons, ...LESSONS], [s.myLessons]);

  useEffect(() => {
    let revoke: string | null = null;
    setUrl(null);
    if (cur?.mainVideoId) getFile(cur.mainVideoId).then((b) => { if (b) { revoke = URL.createObjectURL(b); setUrl(revoke); } }).catch(() => setUrl(null));
    return () => { if (revoke) URL.revokeObjectURL(revoke); };
  }, [cur?.mainVideoId]);
  useEffect(() => {
    if (!cur) return;
    const vtt = cur.captionsVtt ?? (cur.scenes.length ? scenesToVtt(cur.scenes) : null);
    if (!vtt) { setVttUrl(null); return; }
    const u = URL.createObjectURL(new Blob([vtt], { type: 'text/vtt' }));
    setVttUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [cur?.captionsVtt, cur?.scenes]);
  useEffect(() => setReview({}), [curId]);

  const save = (p: Partial<VideoProject>) => cur && actions.saveVideo({ ...cur, ...p, status: p.status ?? (cur.status === 'aprovado' ? 'em-revisao' : cur.status) });
  const create = () => { const v = blank(); actions.saveVideo(v); setCurId(v.id); setStep(0); };
  const scene = cur?.scenes[sel];
  const setScene = (p: Partial<VideoScene>) => cur && scene && save({ scenes: cur.scenes.map((x, i) => (i === sel ? { ...x, ...p } : x)) });
  const totalSec = cur?.scenes.reduce((a, b) => a + b.durationSec, 0) ?? 0;

  const importVideo = async (f: File, source: VideoProject['source']) => {
    if (!cur) return;
    try {
      const id = uid('file');
      await putFile(id, f);
      const names = { ...fileNames, [id]: `${f.name} (${(f.size / 1048576).toFixed(1)} MB)` };
      setFileNames(names);
      localStorage.setItem('aulaviva:fileNames', JSON.stringify(names));
      if (cur.mainVideoId) await deleteFile(cur.mainVideoId).catch(() => {});
      save({ mainVideoId: id, fileIds: [...cur.fileIds.filter((x) => x !== cur.mainVideoId), id], source, status: 'em-revisao' });
      toast('Vídeo importado — aguardando sua revisão');
    } catch {
      toast('Não foi possível armazenar o arquivo neste navegador');
    }
  };

  if (!cur) return (
    <div className="stack">
      <section className="hero" style={{ minHeight: 230 }}>
        <Art id="hero-estudio" fill decorative eager />
        <div className="hero-content"><div className="kicker"><Clapperboard size={14} /> Estúdio de vídeo educacional</div><h1>Do tema à cena</h1><p className="muted" style={{ margin: 0 }}>Planeje roteiro e storyboard, importe vídeos, revise legendas e associe às aulas.</p>
          <button className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={create}><Plus /> Criar projeto de vídeo</button></div>
      </section>
    </div>
  );

  const checklistDone = REVIEW.every((r) => review[r]);

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row between">
        <div>
          <div className="kicker"><Clapperboard size={14} /> Estúdio de vídeo educacional</div>
          <h1 style={{ margin: 0 }}>Do tema à cena</h1>
        </div>
        <div className="row">
          <button className="chip" onClick={() => setHiggs(true)}><Sparkles size={15} color="var(--cyan)" /> Integração Higgsfield <span className="faint">● Não conectado</span></button>
          <select className="input" style={{ width: 'auto' }} value={cur.id} onChange={(e) => setCurId(e.target.value)} aria-label="Projeto de vídeo">{s.videoProjects.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}</select>
          <button className="btn sm" onClick={create}><Plus /> Novo</button>
        </div>
      </div>
      <div className="panel tight"><Steps items={STEPS.map((x) => x.label)} current={step} /></div>

      <div className="split">
        <div className="stack">
          <section className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            {url ? (
              <video key={url} controls style={{ width: '100%', aspectRatio: '16/9', background: '#000', display: 'block' }} crossOrigin="anonymous">
                <source src={url} />
                {s.settings.captions && vttUrl && <track kind="captions" srcLang="pt-BR" label="Português" src={vttUrl} default />}
              </video>
            ) : (
              <div style={{ position: 'relative' }}>
                <Art id="hero-estudio" ratio={16 / 9} decorative />
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(6,10,34,.55)' }}>
                  <div className="center stack-sm">
                    <FileVideo size={44} style={{ margin: '0 auto' }} />
                    <strong>Nenhum vídeo importado</strong>
                    <span className="small muted">Planeje as cenas e, quando o vídeo estiver pronto, importe-o aqui.</span>
                    <button className="btn primary" style={{ alignSelf: 'center' }} onClick={() => fileRef.current?.click()}><Upload /> Importar vídeo</button>
                  </div>
                </div>
              </div>
            )}
          </section>
          <input ref={fileRef} type="file" accept="video/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) importVideo(f, 'producao-propria'); e.target.value = ''; }} />

          <section aria-labelledby="sb-t">
            <div className="row between"><h2 id="sb-t" style={{ margin: 0 }}>Roteiro em cenas <span className="grad-text">(storyboard)</span></h2>
              <button className="btn sm outline-cyan" onClick={() => { save({ scenes: [...cur.scenes, { id: uid('sc'), title: `Cena ${cur.scenes.length + 1}`, script: '', visuals: '', narration: '', captions: '', durationSec: 20 }] }); setSel(cur.scenes.length); }}><Plus /> Adicionar cena</button></div>
            {cur.scenes.length === 0 ? <div className="empty mt">Nenhuma cena. Use o modelo de roteiro ao lado ou adicione cenas.</div> : (
              <div className="grid mt keep-cols" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                {cur.scenes.map((sc, i) => (
                  <button key={sc.id} className={`panel tight ${sel === i ? 'glow' : ''}`} style={{ textAlign: 'left', cursor: 'pointer', color: 'var(--text)', padding: 0, overflow: 'hidden' }} onClick={() => { setSel(i); setStep(Math.max(step, 3)); }} aria-pressed={sel === i}>
                    <div style={{ position: 'relative' }}><Art id={['story-biblioteca-carta', 'hero-estudio', 'sim-cidade', 'imm-patrimonio'][i % 4]} ratio={16 / 9} decorative /><span className="badge" style={{ position: 'absolute', top: 6, left: 6 }}>{i + 1}</span></div>
                    <div style={{ padding: '8px 10px' }}><strong className="small">{sc.title}</strong><div className="xs muted">{fmt(sc.durationSec)}</div></div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {cur.scenes.length > 0 && (
            <section className="panel" aria-label="Linha do tempo">
              <div className="row between"><h3 style={{ margin: 0 }}><Film size={18} /> Linha do tempo</h3><span className="small muted num">Duração total {fmt(totalSec)}</span></div>
              {[['Cenas', <Image size={15} key="i" />], ['Voz', <Mic size={15} key="m" />], ['Legendas', <Captions size={15} key="c" />]].map(([label, icon], row) => (
                <div key={String(label)} className="row nowrap mt" style={{ gap: 8 }}>
                  <span className="xs muted row nowrap" style={{ width: 84, gap: 5 }}>{icon} {label}</span>
                  <div className="row nowrap grow" style={{ gap: 3 }}>
                    {cur.scenes.map((sc, i) => (
                      <button key={sc.id} onClick={() => setSel(i)} title={sc.title} className="xs" style={{ flex: sc.durationSec, minWidth: 0, padding: '6px 6px', borderRadius: 8, border: `1px solid ${sel === i ? 'var(--cyan)' : 'var(--border-strong)'}`, background: row === 0 ? 'rgba(139,92,246,.35)' : row === 1 ? (sc.narration ? 'rgba(46,230,214,.25)' : 'rgba(255,255,255,.04)') : (sc.captions ? 'rgba(96,165,250,.25)' : 'rgba(255,255,255,.04)'), color: 'var(--text)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                        {row === 0 ? sc.title : row === 1 ? (sc.narration ? sc.narration.slice(0, 24) : '—') : (sc.captions ? sc.captions.slice(0, 24) : '—')}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <aside className="panel stack">
          <div className="panel-title"><Wand2 /><h2 style={{ fontSize: '1.25rem' }}>Preparar vídeo</h2><span className={`badge right ${cur.status === 'aprovado' ? 'green' : cur.status === 'em-revisao' ? 'amber' : ''}`}>{cur.status === 'aprovado' ? 'Aprovado' : cur.status === 'em-revisao' ? 'Em revisão' : 'Rascunho'}</span></div>
          <div className="row" style={{ gap: 4 }}>{STEPS.map((x, i) => <button key={x.id} className={`chip xs ${step === i ? 'on' : ''}`} style={{ padding: '3px 9px' }} onClick={() => setStep(i)} aria-pressed={step === i}>{i + 1}</button>)}</div>
          <h3 style={{ margin: 0 }}>{step + 1}. {STEPS[step].label}</h3>

          {step === 0 && (<>
            <label className="field"><span>Título</span><input className="input" value={cur.title} onChange={(e) => save({ title: e.target.value })} /></label>
            <label className="field"><span>Tema</span><textarea className="input" maxLength={200} rows={3} value={cur.theme} onChange={(e) => save({ theme: e.target.value })} placeholder="Ex.: Uma viagem pela história da nossa cidade" /><span className="xs faint" style={{ alignSelf: 'flex-end' }}>{cur.theme.length}/200</span></label>
            <label className="field"><span>Faixa etária</span><select className="input" value={cur.audience} onChange={(e) => save({ audience: e.target.value })}>{['6º ano (11 a 12 anos)', '7º ano (12 a 13 anos)', '8º ano (13 a 14 anos)', '9º ano (14 a 15 anos)', 'Anos iniciais'].map((a) => <option key={a}>{a}</option>)}</select></label>
          </>)}
          {step === 1 && (<>
            <label className="field"><span>Objetivo de aprendizagem</span><textarea className="input" rows={4} value={cur.objective} onChange={(e) => save({ objective: e.target.value })} placeholder="Ao final, os estudantes devem ser capazes de…" /></label>
            <label className="field"><span>Associar à aula</span><select className="input" value={cur.lessonId ?? ''} onChange={(e) => save({ lessonId: e.target.value || undefined })}><option value="">Nenhuma</option>{allLessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}</select></label>
          </>)}
          {step === 2 && (<>
            <p className="small muted" style={{ margin: 0 }}>Comece com um modelo de 4 cenas (abertura, descoberta, desafio, reflexão) e edite tudo. <strong>Não é gerado por IA</strong> — é um modelo de estrutura.</p>
            <button className="btn primary" onClick={() => { if (cur.scenes.length && !confirm('Substituir as cenas atuais pelo modelo?')) return; save({ scenes: templateScenes(cur.theme) }); setSel(0); setStep(3); }}><Sparkles /> Usar modelo de roteiro</button>
            <Notice kind="info">Para usar IA (ex.: Higgsfield ou outra ferramenta), gere fora do AulaViva, revise e cole o texto nas cenas. Nada é salvo ou publicado sem sua edição.</Notice>
          </>)}
          {(step === 3 || step === 4 || step === 5) && scene && (<>
            <div className="row between"><strong>Cena {sel + 1}</strong>
              <div className="row" style={{ gap: 2 }}>
                <button className="btn icon ghost" aria-label="Mover cena para cima" disabled={sel === 0} onClick={() => { const a = [...cur.scenes]; [a[sel - 1], a[sel]] = [a[sel], a[sel - 1]]; save({ scenes: a }); setSel(sel - 1); }}><ArrowUp /></button>
                <button className="btn icon ghost" aria-label="Mover cena para baixo" disabled={sel === cur.scenes.length - 1} onClick={() => { const a = [...cur.scenes]; [a[sel + 1], a[sel]] = [a[sel], a[sel + 1]]; save({ scenes: a }); setSel(sel + 1); }}><ArrowDown /></button>
                <button className="btn icon ghost" aria-label="Excluir cena" onClick={() => { save({ scenes: cur.scenes.filter((_, i) => i !== sel) }); setSel(Math.max(0, sel - 1)); }}><Trash2 /></button>
              </div>
            </div>
            {step === 3 && (<>
              <label className="field"><span>Título da cena</span><input className="input" value={scene.title} onChange={(e) => setScene({ title: e.target.value })} /></label>
              <label className="field"><span>Roteiro</span><textarea className="input" rows={4} value={scene.script} onChange={(e) => setScene({ script: e.target.value })} /></label>
              <label className="field"><span><Clock size={13} /> Duração (segundos)</span><input className="input" type="number" min={1} max={600} value={scene.durationSec} onChange={(e) => setScene({ durationSec: Math.max(1, Number(e.target.value)) })} /></label>
            </>)}
            {step === 4 && <label className="field"><span>Recursos visuais</span><textarea className="input" rows={5} value={scene.visuals} onChange={(e) => setScene({ visuals: e.target.value })} placeholder="Imagens, enquadramento, mapas, arquivos necessários…" /></label>}
            {step === 5 && (<>
              <label className="field"><span>Narração</span><textarea className="input" rows={4} value={scene.narration} onChange={(e) => setScene({ narration: e.target.value })} /></label>
              <label className="field"><span>Legenda</span><textarea className="input" rows={2} value={scene.captions} onChange={(e) => setScene({ captions: e.target.value })} /></label>
              <button className="btn sm ghost" onClick={() => setScene({ captions: scene.narration })} disabled={!scene.narration}>Copiar narração para a legenda</button>
            </>)}
          </>)}
          {step === 5 && (
            <div className="row">
              <button className="btn sm" onClick={() => download(`${cur.title}.vtt`, cur.captionsVtt ?? scenesToVtt(cur.scenes), 'text/vtt')} disabled={!cur.scenes.length}><Download /> Baixar legendas (.vtt)</button>
              <button className="btn sm" onClick={() => vttRef.current?.click()}><Upload /> Importar .vtt</button>
              {cur.captionsVtt && <button className="btn sm ghost" onClick={() => save({ captionsVtt: undefined })}>Usar legendas das cenas</button>}
              <input ref={vttRef} type="file" accept=".vtt,text/vtt" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const t = await f.text(); if (!t.startsWith('WEBVTT')) { toast('Arquivo .vtt inválido'); return; } save({ captionsVtt: t }); toast('Legendas importadas'); } e.target.value = ''; }} />
              <button className="btn sm ghost" onClick={() => download(`${cur.title}-transcricao.txt`, cur.scenes.map((x, i) => `[${i + 1}. ${x.title}]\n${x.narration}`).join('\n\n'))} disabled={!cur.scenes.length}>Transcrição (.txt)</button>
            </div>
          )}
          {(step === 3 || step === 4 || step === 5) && !scene && <p className="small muted">Adicione uma cena ao storyboard.</p>}

          {step === 6 && (<>
            <span className="label">Checklist de revisão do professor</span>
            <ul className="clean stack-sm">{REVIEW.map((r) => <li key={r}><button className="btn ghost block" style={{ justifyContent: 'flex-start', fontWeight: 500, whiteSpace: 'normal', textAlign: 'left', fontFamily: 'var(--font-body)' }} aria-pressed={!!review[r]} onClick={() => setReview({ ...review, [r]: !review[r] })}>{review[r] ? <CheckCircle2 color="var(--green)" /> : <Circle />} {r}</button></li>)}</ul>
            <label className="field"><span>Perguntas antes da exibição (uma por linha)</span><textarea className="input" rows={3} value={cur.questionsBefore.join('\n')} onChange={(e) => save({ questionsBefore: e.target.value.split('\n') })} /></label>
            <label className="field"><span>Perguntas depois da exibição</span><textarea className="input" rows={3} value={cur.questionsAfter.join('\n')} onChange={(e) => save({ questionsAfter: e.target.value.split('\n') })} /></label>
            <label className="field"><span>Notas de revisão</span><textarea className="input" rows={2} value={cur.reviewNotes} onChange={(e) => save({ reviewNotes: e.target.value })} /></label>
            <button className="btn primary" disabled={!checklistDone || !cur.mainVideoId} onClick={() => { save({ status: 'aprovado' }); toast('Vídeo aprovado para uso nas suas aulas'); }}><ShieldCheck /> Aprovar para uso em aula</button>
            {(!checklistDone || !cur.mainVideoId) && <span className="xs faint">{!cur.mainVideoId ? 'Importe o vídeo final antes de aprovar. ' : ''}{!checklistDone ? 'Complete o checklist.' : ''}</span>}
            <span className="xs faint">Nenhum vídeo é publicado automaticamente. Qualquer edição depois da aprovação volta o status para revisão.</span>
          </>)}
          {step === 7 && (<>
            <button className="btn primary" onClick={() => fileRef.current?.click()}><Upload /> {cur.mainVideoId ? 'Substituir vídeo' : 'Importar vídeo'}</button>
            <button className="btn outline" onClick={() => setHiggs(true)}><Sparkles /> Importar vídeo exportado do Higgsfield</button>
            {cur.questionsBefore.filter(Boolean).length > 0 && <div><span className="label">Antes de assistir</span><ul className="bullets small">{cur.questionsBefore.filter(Boolean).map((q, i) => <li key={i}>{q}</li>)}</ul></div>}
            {cur.questionsAfter.filter(Boolean).length > 0 && <div><span className="label">Depois de assistir</span><ul className="bullets small">{cur.questionsAfter.filter(Boolean).map((q, i) => <li key={i}>{q}</li>)}</ul></div>}
          </>)}

          <hr className="sep" />
          <div>
            <span className="label"><FolderOpen size={13} /> Arquivos do projeto</span>
            <ul className="clean stack-sm mt">{cur.fileIds.length === 0 ? <li className="xs muted">Nenhum arquivo.</li> : cur.fileIds.map((f) => <li key={f} className="xs row between nowrap"><span><FileVideo size={13} /> {fileNames[f] ?? f}</span>{f === cur.mainVideoId && <span className="badge cyan">principal</span>}</li>)}</ul>
            <span className="xs faint">Arquivos guardados no IndexedDB deste navegador. Origem: {cur.source === 'higgsfield-importado' ? 'Higgsfield (importado manualmente)' : 'produção própria'}.</span>
          </div>
          <button className="btn danger sm" onClick={async () => { if (!confirm(`Excluir “${cur.title}” e seus arquivos?`)) return; for (const f of cur.fileIds) await deleteFile(f).catch(() => {}); actions.deleteVideo(cur.id); setCurId(s.videoProjects.find((v) => v.id !== cur.id)?.id ?? null); }}><Trash2 /> Excluir projeto</button>
          <div className="row between">
            <button className="btn sm ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>← Anterior</button>
            <button className="btn sm" disabled={step === STEPS.length - 1} onClick={() => setStep(step + 1)}>Próximo →</button>
          </div>
        </aside>
      </div>

      <Modal open={higgs} onClose={() => setHiggs(false)} title="Higgsfield — conceito de integração">
        <div className="stack">
          <Notice><strong>Não conectado.</strong> A conexão direta com o Higgsfield não está implementada nesta versão — nenhuma credencial é pedida ou armazenada.</Notice>
          <p>Fluxo disponível hoje:</p>
          <ol className="stack-sm"><li>Use o roteiro e as cenas daqui como base no Higgsfield.</li><li>Exporte o vídeo gerado (MP4/WebM).</li><li>Importe abaixo. O vídeo entra como <strong>em revisão</strong> e só fica disponível para aulas depois do seu checklist.</li></ol>
          <p className="small muted">Uma integração real exigiria um servidor para guardar a chave de API (nunca no navegador) e um fluxo de autorização da conta do professor.</p>
          <label className="btn primary" style={{ alignSelf: 'flex-start' }}><Upload /> Escolher vídeo exportado
            <input type="file" accept="video/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) { importVideo(f, 'higgsfield-importado'); setHiggs(false); } e.target.value = ''; }} />
          </label>
        </div>
      </Modal>
    </div>
  );
}
