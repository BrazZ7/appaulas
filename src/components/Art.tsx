import { useState } from 'react';
import {
  BookOpen, Building2, Bot, Calendar, Drama, Film, FlaskConical, Gamepad2, Globe, Map, MessagesSquare, Mountain,
  Radio, ShoppingBasket, Sparkles, Trees, Users, Waves,
} from 'lucide-react';
import { ArtPlaceholder } from './ArtPlaceholder';
import { ASSET_MAP, AVAILABLE_ASSETS, type Motif } from '../content/assets';

const MOTIF_ICON: Record<Motif, typeof BookOpen> = {
  ilhas: Globe, livro: BookOpen, cidade: Building2, floresta: Trees, rio: Waves, feira: ShoppingBasket,
  laboratorio: FlaskConical, jogo: Gamepad2, pessoas: Users, tambor: Drama, mapa: Map, estrela: Sparkles,
  video: Film, conversa: MessagesSquare, radio: Radio, robo: Bot, calendario: Calendar, montanha: Mountain,
};

const fullWidth = (r: number) => (r > 2 ? 2520 : r > 1.5 ? 1920 : 1200);

const hash = (s: string) => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 10007; return h; };

interface Props {
  id: string;
  /** Força uma proporção diferente da definida no registro (ex.: card). */
  ratio?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Imagem decorativa (alt vazio) quando o texto ao lado já descreve o conteúdo. */
  decorative?: boolean;
  fill?: boolean;
  eager?: boolean;
  showTag?: boolean;
  /** Largura exibida, para o navegador escolher entre a versão pequena e a completa. */
  sizes?: string;
}

/**
 * Exibe a imagem gerada (quando disponível) ou um cenário provisório elegante,
 * sempre com a proporção correta para não deslocar o layout quando a imagem chegar.
 */
export function Art({ id, ratio, className = '', style, decorative, fill, eager, showTag, sizes }: Props) {
  const def = ASSET_MAP[id];
  const [failed, setFailed] = useState(false);
  const r = ratio ?? def?.ratio ?? 16 / 9;
  const box: React.CSSProperties = fill ? { position: 'absolute', inset: 0, ...style } : { aspectRatio: String(r), ...style };
  const alt = decorative ? '' : def?.alt ?? '';

  if (def && AVAILABLE_ASSETS.has(id) && !failed) {
    const base = `${import.meta.env.BASE_URL}assets/`;
    return (
      <div className={`art ${className}`} style={box}>
        <picture>
          {/* versão vertical recomposta só para cabeçalhos/capas que ocupam a tela no celular */}
          {def.hasMobile && fill && <source media="(max-width: 760px)" srcSet={`${base}${id}-mobile.webp`} />}
          <img
            src={`${base}${def.file}`}
            srcSet={`${base}${id}-sm.webp 640w, ${base}${def.file} ${fullWidth(def.ratio)}w`}
            sizes={sizes ?? (fill ? '100vw' : '(max-width: 760px) 100vw, 420px')}
            alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
        </picture>
      </div>
    );
  }

  const [c1, c2, c3] = def?.palette ?? ['#1e1b4b', '#4c1d95', '#0d9488'];
  const Icon = MOTIF_ICON[def?.motif ?? 'estrela'];
  return (
    <div className={`art ${className}`} style={box} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : alt} aria-hidden={decorative || undefined}>
      <ArtPlaceholder palette={[c1, c2, c3]} Icon={Icon} seed={hash(id)} />
      {showTag && <span className="art-tag">imagem provisória</span>}
    </div>
  );
}
