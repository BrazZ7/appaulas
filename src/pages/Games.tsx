import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Clock, Flag, Gamepad2, Info, Lock, Package, Puzzle, Search, Users, WifiOff } from 'lucide-react';
import { Art } from '../components/Art';
import { FavButton, Modal, Notice, anosLabel, minutes } from '../components/ui';
import { GAME_ACTIVITIES, PRESENTIAL_GAMES, SUBJECT_MAP } from '../content';
import { FORMAT_LABEL } from '../engine/games';
import type { GameFormat } from '../types/models';

import scenes from '../content/diferencas.json';

const FORMAT_DESC: Record<GameFormat, string> = {
  quiz: 'Respondam juntos e avancem na missão.',
  pistas: 'Sigam pistas, resolvam enigmas e “escapem”.',
  memoria: 'Encontrem pares e expliquem a relação.',
  sequencia: 'Organizem etapas e justifiquem a ordem.',
  classificacao: 'Separem itens por critérios e debatam.',
  associacao: 'Liguem conceitos que se correspondem.',
};

const PLAY_LABEL: Record<string, string> = {
  bingo: 'Bingo temático', investigacao: 'Investigação', 'criacao-coletiva': 'Criação coletiva', 'caca-pistas': 'Caça às pistas',
  escape: 'Escape', movimento: 'Movimento', 'quiz-cooperativo': 'Quiz cooperativo',
};

export default function Games() {
  const [params, setParams] = useSearchParams();
  const [format, setFormat] = useState<GameFormat | ''>('');
  const openPlay = PRESENTIAL_GAMES.find((g) => g.id === params.get('presencial'));
  const [codeInfo, setCodeInfo] = useState(false);
  const formats = Object.keys(FORMAT_LABEL) as GameFormat[];
  const shown = GAME_ACTIVITIES.filter((g) => !format || g.format === format);
  const featured = GAME_ACTIVITIES.find((g) => g.format === 'pistas') ?? GAME_ACTIVITIES[0];

  return (
    <div className="stack" style={{ gap: 22 }}>
      <div className="split">
        <section className="hero" style={{ minHeight: 330 }}>
          <Art id="hero-jogos" fill eager decorative />
          <div className="hero-content">
            <h1>A turma joga junto</h1>
            <p className="row nowrap muted" style={{ margin: 0 }}><Users /> Jogo colaborativo e participativo para aprender com toda a turma.</p>
            <div className="panel glow-violet stack-sm" style={{ background: 'rgba(14,18,60,.75)' }}>
              <span className="badge" style={{ alignSelf: 'flex-start' }}><Flag size={13} /> Missão</span>
              <h2 style={{ margin: 0 }}>{featured.title}</h2>
              <p className="small muted" style={{ margin: 0 }}>{featured.description}</p>
              <Link to={`/jogos/${featured.id}`} className="btn primary" style={{ alignSelf: 'flex-start' }}>Preparar a sala <ChevronRight /></Link>
            </div>
          </div>
        </section>
        <aside className="panel stack">
          <div className="panel-title"><Users /><h2 style={{ fontSize: '1.25rem' }}>Entrar na sala</h2></div>
          <Notice>
            <strong>Entrada por código em vários dispositivos ainda não está disponível.</strong> Ela exige um servidor de sessões, que não faz parte desta versão demonstrativa.
          </Notice>
          <p className="small">Todos os jogos funcionam no <strong>modo local</strong>: um computador ou projetor conduzido pelo professor, com equipes respondendo em voz alta, por plaquinhas ou revezando o mouse.</p>
          <ul className="bullets small">
            <li>Professor conduzindo no projetor</li>
            <li>Grupos compartilhando um dispositivo (uma partida por grupo)</li>
            <li>Sem dispositivos: use as brincadeiras presenciais abaixo</li>
          </ul>
          <button className="btn ghost sm" onClick={() => setCodeInfo(true)}><Info /> Como funcionaria a sala com código?</button>
        </aside>
      </div>

      <section><h2>Jogo dos sete erros</h2><div className="grid auto-fill">{scenes.map(s=><Link className="card-link" key={s.id} to={'/sete-erros/'+s.id}>
        <img loading="lazy" style={{width:'100%'}} src={'/atividades/'+s.id+'-a.webp'} alt=""/><div className="card-body"><h3>{s.title}</h3><span>Jogar ou imprimir →</span></div></Link>)}</div></section>
      <section aria-labelledby="modos">
        <div className="row between"><h2 id="modos"><Gamepad2 /> Modos de jogo</h2><span className="small muted">Escolha o formato da aventura com a sua turma.</span></div>
        <div className="grid auto-fill-sm">
          {formats.map((f) => (
            <button key={f} className={`panel tight ${format === f ? 'glow' : ''}`} style={{ textAlign: 'left', cursor: 'pointer', color: 'var(--text)' }} aria-pressed={format === f} onClick={() => setFormat(format === f ? '' : f)}>
              <div className="row nowrap"><span className="icon-tile">{f === 'pistas' ? <Lock /> : f === 'quiz' ? <Puzzle /> : <Search />}</span><strong>{FORMAT_LABEL[f]}</strong></div>
              <p className="xs muted" style={{ margin: '8px 0 0' }}>{FORMAT_DESC[f]}</p>
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Atividades prontas">
        <h2>Atividades prontas {format && <span className="muted small">· {FORMAT_LABEL[format]}</span>}</h2>
        <div className="grid auto-fill">
          {shown.map((g) => (
            <Link key={g.id} to={`/jogos/${g.id}`} className="card-link">
              <Art id={g.artId} ratio={16 / 9} decorative />
              <div className="card-body">
                <div className="row between nowrap"><span className="badge cyan">{FORMAT_LABEL[g.format]}</span><FavButton k={`game:${g.id}`} title={g.title} /></div>
                <h3>{g.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>{g.description}</p>
                <div className="xs muted" style={{ marginTop: 'auto' }}><Clock size={12} /> {minutes(g.durationMin)} · {anosLabel(g.anos)} · {g.subjects.map((s) => SUBJECT_MAP[s]?.name).join(', ')}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="presenciais">
        <h2 id="presenciais"><WifiOff /> Brincadeiras presenciais — sem tela</h2>
        <p className="muted small">Instruções, materiais e tempo de aplicação. Ideais para turmas sem dispositivos ou internet.</p>
        <div className="grid auto-fill">
          {PRESENTIAL_GAMES.map((g) => (
            <button key={g.id} className="panel tight stack-sm" style={{ textAlign: 'left', cursor: 'pointer', color: 'var(--text)' }} onClick={() => setParams({ presencial: g.id })}>
              <span className="badge amber" style={{ alignSelf: 'flex-start' }}>{PLAY_LABEL[g.kind] ?? g.kind}</span>
              <h3 style={{ margin: 0 }}>{g.title}</h3>
              <p className="small muted" style={{ margin: 0 }}>{g.learningFocus}</p>
              <span className="xs faint"><Clock size={12} /> {minutes(g.durationMin)} · {g.groupSize}</span>
            </button>
          ))}
        </div>
      </section>

      <Modal open={!!openPlay} onClose={() => setParams({})} title={openPlay?.title ?? ''} wide>
        {openPlay && (
          <div className="stack">
            <div className="row small muted"><span><Clock size={14} /> {minutes(openPlay.durationMin)}</span><span>· {openPlay.groupSize}</span><span>· {anosLabel(openPlay.anos)}</span></div>
            <p>{openPlay.learningFocus}</p>
            <div className="grid g2">
              <div><h3><Package size={17} /> Materiais</h3><ul className="bullets small">{openPlay.materials.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
              <div><h3>Variações</h3><ul className="bullets small">{openPlay.variations.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
            </div>
            <h3>Passo a passo</h3>
            <ol className="stack-sm">{openPlay.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
            <button className="btn" onClick={() => window.print()}>Imprimir instruções</button>
          </div>
        )}
      </Modal>
      <Modal open={codeInfo} onClose={() => setCodeInfo(false)} title="Sala com código (planejado)">
        <p>Em uma versão com servidor, o professor criaria uma sessão e um código; cada dispositivo entraria com o código e as respostas seriam sincronizadas em tempo real.</p>
        <p>Isso exige autenticação, controle de acesso por turma e proteção dos dados dos alunos no servidor. Por isso o recurso não é simulado aqui: um código falso daria a impressão de que outros dispositivos estão conectados.</p>
        <p className="small muted">O modelo de dados (<code>GameSession.transport</code>) já prevê essa extensão.</p>
      </Modal>
    </div>
  );
}
