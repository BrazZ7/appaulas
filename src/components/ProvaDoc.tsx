/** Folha da prova: mesma renderização na pré-visualização e na impressão/PDF. */
import { useEffect, useState, type CSSProperties } from 'react';
import { Figura } from './Figura';
import { getFile } from '../lib/files';
import {
  PERFIS, TIPO_ACAO, adaptarQuestoes, embaralharPares, gabarito, letra, paginar, partesComComando, semente, totalPontos, type QuestaoExibida,
} from '../lib/prova';
import type { PerfilAdaptacao, Prova, QuestaoImagem } from '../types/models';

export function useFileUrl(fileId?: string) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!fileId) return;
    let u: string | undefined;
    let vivo = true;
    getFile(fileId).then((b) => { if (b && vivo) { u = URL.createObjectURL(b); setUrl(u); } }).catch(() => {});
    return () => { vivo = false; if (u) URL.revokeObjectURL(u); };
  }, [fileId]);
  return url;
}

export function ImagemQuestao({ img, escala = 1 }: { img: QuestaoImagem; escala?: number }) {
  const url = useFileUrl(img.kind === 'arquivo' ? img.fileId : undefined);
  if (img.kind === 'figura') return <Figura id={img.id} params={img.params} escala={escala} />;
  if (!url) return <div className="xs muted">[imagem]</div>;
  return <img src={url} alt={img.alt} style={{ maxWidth: Math.min(520, 380 * escala), maxHeight: 300 * escala, display: 'block', margin: '8px 0', borderRadius: 6 }} />;
}

function Enunciado({ texto, destaca }: { texto: string; destaca: boolean }) {
  if (!destaca) return <>{texto}</>;
  return <>{partesComComando(texto).map((p, i) => (p.cmd ? <mark key={i} className="cmd">{p.t.toUpperCase()}</mark> : <span key={i}>{p.t}</span>))}</>;
}

function Linhas({ n }: { n: number }) {
  return <div>{Array.from({ length: n }).map((_, i) => <div key={i} className="lines" />)}</div>;
}

function Corpo({ q }: { q: QuestaoExibida }) {
  switch (q.tipo) {
    case 'multipla':
      return <ol className="alts">{q.itens.map((t, i) => <li key={i}><span className="box" /> <b>{letra(i)})</b> {t}</li>)}</ol>;
    case 'vf':
      return <ol className="alts">{q.itens.map((t, i) => <li key={i}><span className="box wide" /> {t}</li>)}</ol>;
    case 'ordenar': {
      const emb = embaralharPares(q.itens, semente(q.id));
      return <ul className="alts">{emb.map((e, i) => <li key={i}><span className="box" /> {e.texto}</li>)}</ul>;
    }
    case 'associacao': {
      const emb = embaralharPares(q.pares ?? [], semente(q.id));
      return (
        <div className="assoc">
          <ol>{q.itens.map((t, i) => <li key={i}><strong>{i + 1}.</strong> {t} <span className="dot">●</span></li>)}</ol>
          <ol>{emb.map((e, i) => <li key={i}><span className="dot">●</span> <span className="box" /> <strong>{letra(i)})</strong> {e.texto}</li>)}</ol>
        </div>
      );
    }
    case 'dissertativa':
      return <Linhas n={q.linhasFinal || 4} />;
    case 'desenho':
      return q.imagem ? null : <div className="draw" style={{ height: (q.linhasFinal || 6) * 26 }} />;
    default:
      return null;
  }
}

export interface Cabecalho { escola: string; professor: string; turma: string; data: string }

export function ProvaDoc({ prova, perfil, cab, comGabarito }: { prova: Prova; perfil: PerfilAdaptacao; cab: Cabecalho; comGabarito: boolean }) {
  const cfg = PERFIS[perfil];
  const qs = adaptarQuestoes(prova.questoes, perfil);
  const paginas = paginar(qs, cfg.porPagina);
  const style = { '--prova-fs': cfg.fonte, '--prova-lh': cfg.entrelinhas } as CSSProperties;
  const total = totalPontos(prova);
  const head = (
    <header className="prova-head">
      <div className="print-band" />
      <h1>{prova.title}</h1>
      <div className="prova-campos">
        <span>Escola: <b>{cab.escola || '______________________'}</b></span>
        <span>Professor(a): <b>{cab.professor || '______________'}</b></span>
        <span>Turma: <b>{cab.turma || '______'}</b></span>
        <span>Data: <b>{cab.data || '___/___/______'}</b></span>
        <span className="full">Nome: _____________________________________________ Nº ____</span>
        {!cfg.checklist && <span>Valor: <b>{total.toLocaleString('pt-BR')} ponto(s)</b></span>}
        {!cfg.checklist && <span>Nota: ________</span>}
      </div>
      {prova.instrucoes && <p className="prova-inst">{prova.instrucoes}</p>}
      {cfg.rotina && (
        <ol className="rotina">
          <li><b>1.</b> Leia a pergunta</li><li><b>2.</b> Pense</li><li><b>3.</b> Responda</li><li><b>4.</b> Marque ✔ em “Terminei”</li>
        </ol>
      )}
      {cfg.checklist && (
        <div className="progresso"><b>Meu progresso:</b> {qs.map((q) => <span key={q.id} className="chk">☐ {q.numero}</span>)}</div>
      )}
    </header>
  );
  return (
    <div className={`prova-doc print-doc perfil-${perfil}`} style={style}>
      {paginas.map((pg, pi) => (
        <section key={pi} className={pi > 0 ? 'page-break' : undefined}>
          {pi === 0 && head}
          {pi > 0 && <div className="prova-mini">{prova.title} — {cab.turma} · página {pi + 1}</div>}
          {pg.map((q) => (
            <article key={q.id} className="questao">
              <div className="q-top">
                <span className="q-num">{q.numero}</span>
                <div className="q-text">
                  {cfg.mostraAcao && <div className="q-acao"><span className="q-ico">{TIPO_ACAO[q.tipo].icone}</span> {TIPO_ACAO[q.tipo].acao}</div>}
                  <p><Enunciado texto={q.tipo === 'completar' ? q.texto.replace(/___/g, '__________') : q.texto} destaca={cfg.destacaComando} /> {!cfg.checklist && <span className="q-pts">({q.pontos.toLocaleString('pt-BR')} pt)</span>}</p>
                </div>
              </div>
              {q.imagem && <ImagemQuestao img={q.imagem} escala={cfg.imagem} />}
              <Corpo q={q} />
              {cfg.checklist && <div className="terminei">☐ Terminei esta questão</div>}
            </article>
          ))}
        </section>
      ))}
      {comGabarito && (
        <section className="page-break gabarito">
          <h2>Gabarito — {prova.title} {perfil !== 'padrao' ? `(versão ${cfg.nome})` : ''}</h2>
          <ol>{qs.map((q) => <li key={q.id}><b>Questão {q.numero}</b> ({q.pontos.toLocaleString('pt-BR')} pt): {gabarito(q)}</li>)}</ol>
          <p className="xs">Total: {total.toLocaleString('pt-BR')} ponto(s).</p>
        </section>
      )}
    </div>
  );
}
