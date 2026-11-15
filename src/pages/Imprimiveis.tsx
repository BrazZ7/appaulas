import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GAME_ACTIVITIES, LESSONS, STORIES } from '../content';
import { FEIRA_PRODUCTS } from '../content/simulations';
import scenes from '../content/diferencas.json';
import { brl } from '../engine/feira';
import { actions, useApp } from '../store/store';
import { Switch } from '../components/ui';
import { ItemIcon } from '../components/ItemIcon';

export function PrintOptions() {
  const { settings } = useApp();
  return <div className="row no-print"><Switch label="Economia de tinta" checked={settings.inkSaver} onChange={value=>actions.setSettings({inkSaver:value})}/>
    <button className="btn primary" onClick={()=>window.print()}>Imprimir / salvar PDF</button></div>;
}
type Card = { title: string; description?: string; image?: string; icon?: string };
const kits: {id:string;title:string;instruction:string;cards:Card[]}[]=[];
for (const game of GAME_ACTIVITIES) {
  const c=game.content;
  if(c.kind==='memoria') kits.push({id:game.id,title:game.title,instruction:'Recorte e embaralhe as cartas. Encontre os pares de imagem e descrição.',cards:[...c.pairs.map(p=>({title:p.a,image:p.id})),...c.pairs.map(p=>({title:p.b}))]});
  if(c.kind==='sequencia') kits.push({id:game.id,title:game.title,instruction:'Recorte, embaralhe e coloque as etapas em ordem. Explique o que acontece em cada uma.',cards:c.items.map(it=>({title:it.label,description:it.detail,icon:it.id}))});
  if(game.id==='classificacao-residuos' && c.kind==='classificacao') kits.push({id:game.id,title:game.title,instruction:'Separe os rótulos das lixeiras e classifique cada resíduo.',cards:[...c.categories.map(cat=>({title:cat.label})),...c.items.map(it=>({title:it.label,icon:it.id}))]});
}
kits.push({id:'feira',title:'Feira das decisões',instruction:'Recorte as cartas de preço. Escolha os produtos e calcule o valor de uma cesta com seu grupo.',cards:FEIRA_PRODUCTS.map(p=>({title:p.name,image:p.id,description:brl(p.priceCents)+' / '+p.unit}))});
for (const story of STORIES) kits.push({id:story.id,title:'Personagens · '+story.title,instruction:'Distribua as fichas. Cada estudante interpreta seu personagem e propõe uma continuação para a história.',cards:story.characters.map(c=>({title:c.name,description:c.description,image:c.id}))});

export default function Imprimiveis() {
  const [id,setId]=useState(kits[0].id);
  const { myLessons }=useApp();
  const kit=kits.find(k=>k.id===id)!;
  const lessons=[...myLessons,...LESSONS.filter(l=>!myLessons.some(m=>m.id===l.id))];
  return <div className="stack activity-sheet">
    <section className="no-print stack-sm"><h1>Central de imprimíveis</h1>
    <label className="field"><span>Escolha o material para recortar</span><select className="input" value={id} onChange={e=>setId(e.target.value)}>{kits.map(k=><option key={k.id} value={k.id}>{k.title}</option>)}</select></label>
    <PrintOptions/></section>
    <article className="paper"><h2>{kit.title}</h2><p>{kit.instruction}</p>
    <div className="cut-grid">{kit.cards.map(c=><div className="cut-card" key={c.title}>{c.image && <img src={'/atividades/'+c.image+'.webp'} alt=""/>}{c.icon && <ItemIcon id={c.icon}/>}<strong>{c.title}</strong>{c.description && <small>{c.description}</small>}</div>)}</div></article>
    <section className="no-print"><h2>Folhas dos jogos com gabarito</h2><p className="small muted">Cartas, cartões de recorte, perguntas e gabarito em folha separada.</p><div className="row">{GAME_ACTIVITIES.map(g=><Link className="btn" key={g.id} to={'/jogos/'+g.id+'/imprimir'}>{g.title}</Link>)}<Link className="btn primary" to="/jogos/bingo/imprimir">Gerador de cartelas de bingo</Link></div></section>
    <section className="no-print"><h2>Sete erros com gabarito</h2><div className="row">{scenes.map(s=><Link className="btn" key={s.id} to={'/sete-erros/'+s.id}>{s.title}</Link>)}</div></section>
    <section className="no-print"><h2>Folhas de aula por matéria</h2><div className="grid auto-fill">{lessons.map(l=><Link className="panel tight" key={l.id} to={'/aulas/'+l.id+'/imprimir'}>{l.title}</Link>)}</div></section>
  </div>;
}
