import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import scenes from '../content/diferencas.json';
import { PrintOptions } from './Imprimiveis';

function Round({ scene }: { scene: typeof scenes[number] }) {
  const [found, setFound] = useState<number[]>([]);
  const [key, setKey] = useState(false);
  const [message, setMessage] = useState('');
  function mark(index: number) {
    if (found.includes(index)) return;
    setFound(previous => previous.includes(index) ? previous : [...previous, index]);
    setMessage('Encontrado: ' + scene.spots[index].label);
  }
  return <article className="stack activity-sheet">
    <div className="no-print"><Link to="/jogos">← Jogos</Link></div>
    <h1>Sete erros · {scene.title}</h1>
    <p>Compare as cenas A e B. Encontre sete objetos que aparecem em apenas uma delas.</p>
    <div className="scene-pair">{['a','b'].map(side => <figure key={side}>
      <figcaption>Cena {side.toUpperCase()}</figcaption>
      <div className="spot-scene" onClick={() => setMessage('Observe as duas cenas e tente outro ponto.')}>
        <img src={'/atividades/'+scene.id+'-'+side+'.webp'} alt={scene.title + ', cena ' + side.toUpperCase()} />
        {scene.spots.map((spot,i) => <button key={spot.label}
          className={'spot-target'+(found.includes(i) ? ' found' : '')}
          style={{ left: spot.x+'%', top: spot.y+'%' }}
          onClick={event => { event.stopPropagation(); mark(i); }}
          aria-label={'Examinar região '+(i+1)}>{found.includes(i) ? '✓' : ''}</button>)}
      </div></figure>)}</div>
    <div className="no-print panel stack-sm"><strong aria-live="polite">{found.length === 7 ? 'A turma encontrou as sete diferenças!' : found.length+' de 7 diferenças'} · {message}</strong>
      <div className="row"><button className="btn" onClick={() => {setFound([]);setMessage('');setKey(false);}}>Recomeçar</button>
      <label><input type="checkbox" checked={key} onChange={e=>setKey(e.target.checked)} /> Incluir gabarito</label></div>
      <PrintOptions /></div>
    {key && <section className="spot-key"><h2>Gabarito do professor</h2><ol>{scene.spots.map((p,i)=><li key={p.label}>{'desc' in p && p.desc ? <>{p.label}: {p.desc} —</> : <>{p.label} — cena {i%2===0?'A':'B'},</>} {p.y<36?'parte superior':p.y<66?'parte central':'parte inferior'}, {p.x<34?'à esquerda':p.x<67?'ao centro':'à direita'}.</li>)}</ol></section>}
  </article>;
}
export default function Diferencas() {
  const { id }=useParams();
  const scene=scenes.find(s=>s.id===id);
  return scene ? <Round key={scene.id} scene={scene}/> : <Link to="/jogos">Voltar aos jogos</Link>;
}
