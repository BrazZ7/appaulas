/**
 * Ilustrações para provas e atividades, desenhadas em SVG pelo próprio app.
 * Várias são paramétricas (fração, relógio, reta numérica, gráfico…), então o professor
 * monta a imagem exata da questão sem precisar procurar figura na internet.
 * Traço escuro e preenchimentos claros: imprimem bem em preto e branco.
 */
import type { ReactNode } from 'react';

type P = Record<string, number | string>;
const num = (p: P | undefined, k: string, d: number) => { const v = Number(p?.[k]); return Number.isFinite(v) ? v : d; };
const str = (p: P | undefined, k: string, d: string) => (p?.[k] !== undefined && String(p[k]).trim() ? String(p[k]) : d);
const list = (s: string) => s.split(/[,;]/).map((x) => x.trim()).filter(Boolean);

const INK = '#1f2937';
const FILL = '#a5b4fc';
const FILL2 = '#fde68a';
const FILL3 = '#99f6e4';

export interface FiguraParam { key: string; label: string; tipo: 'numero' | 'texto' | 'opcao'; padrao: number | string; min?: number; max?: number; opcoes?: string[] }
export interface FiguraDef { id: string; nome: string; grupo: 'Matemática' | 'Ciências' | 'Geografia' | 'História' | 'Geral'; params: FiguraParam[]; alt: (p?: P) => string; render: (p?: P) => ReactNode }

function Svg({ w, h, children, label }: { w: number; h: number; children: ReactNode; label: string }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} style={{ width: '100%', height: 'auto', maxWidth: w * 1.4 }} fontFamily="system-ui, sans-serif">{children}</svg>;
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1},${y1} Z`;
}

export const FIGURAS: FiguraDef[] = [
  {
    id: 'fracao-pizza', nome: 'Fração (círculo)', grupo: 'Matemática',
    params: [{ key: 'partes', label: 'Partes', tipo: 'numero', padrao: 8, min: 2, max: 16 }, { key: 'pintadas', label: 'Pintadas', tipo: 'numero', padrao: 3, min: 0, max: 16 }],
    alt: (p) => `Círculo dividido em ${num(p, 'partes', 8)} partes iguais, ${num(p, 'pintadas', 3)} pintadas`,
    render: (p) => {
      const n = Math.max(2, Math.min(16, num(p, 'partes', 8)));
      const k = Math.max(0, Math.min(n, num(p, 'pintadas', 3)));
      return <Svg w={160} h={160} label={`Fração ${k}/${n}`}>{Array.from({ length: n }).map((_, i) => { const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n; return <path key={i} d={arcPath(80, 80, 70, a0, a0 + (2 * Math.PI) / n)} fill={i < k ? FILL : '#fff'} stroke={INK} strokeWidth={2} />; })}</Svg>;
    },
  },
  {
    id: 'fracao-barra', nome: 'Fração (barra)', grupo: 'Matemática',
    params: [{ key: 'partes', label: 'Partes', tipo: 'numero', padrao: 5, min: 2, max: 12 }, { key: 'pintadas', label: 'Pintadas', tipo: 'numero', padrao: 2, min: 0, max: 12 }],
    alt: (p) => `Barra dividida em ${num(p, 'partes', 5)} partes iguais, ${num(p, 'pintadas', 2)} pintadas`,
    render: (p) => {
      const n = Math.max(2, Math.min(12, num(p, 'partes', 5)));
      const k = Math.max(0, Math.min(n, num(p, 'pintadas', 2)));
      const w = 300 / n;
      return <Svg w={320} h={70} label={`Fração ${k}/${n}`}>{Array.from({ length: n }).map((_, i) => <rect key={i} x={10 + i * w} y={10} width={w} height={50} fill={i < k ? FILL : '#fff'} stroke={INK} strokeWidth={2} />)}</Svg>;
    },
  },
  {
    id: 'relogio', nome: 'Relógio de ponteiros', grupo: 'Matemática',
    params: [{ key: 'h', label: 'Hora', tipo: 'numero', padrao: 10, min: 0, max: 23 }, { key: 'm', label: 'Minutos', tipo: 'numero', padrao: 15, min: 0, max: 59 }],
    alt: (p) => `Relógio de ponteiros marcando ${num(p, 'h', 10)}h${String(num(p, 'm', 15)).padStart(2, '0')}`,
    render: (p) => {
      const h = num(p, 'h', 10) % 12;
      const m = num(p, 'm', 15) % 60;
      const am = (m / 60) * 2 * Math.PI - Math.PI / 2;
      const ah = ((h + m / 60) / 12) * 2 * Math.PI - Math.PI / 2;
      return (
        <Svg w={170} h={170} label="Relógio">
          <circle cx={85} cy={85} r={78} fill="#fff" stroke={INK} strokeWidth={4} />
          {Array.from({ length: 60 }).map((_, i) => { const a = (i / 60) * 2 * Math.PI; const r0 = i % 5 ? 72 : 66; return <line key={i} x1={85 + r0 * Math.sin(a)} y1={85 - r0 * Math.cos(a)} x2={85 + 76 * Math.sin(a)} y2={85 - 76 * Math.cos(a)} stroke={INK} strokeWidth={i % 5 ? 1 : 2.5} />; })}
          {Array.from({ length: 12 }).map((_, i) => { const a = ((i + 1) / 12) * 2 * Math.PI; return <text key={i} x={85 + 54 * Math.sin(a)} y={85 - 54 * Math.cos(a) + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>{i + 1}</text>; })}
          <line x1={85} y1={85} x2={85 + 38 * Math.cos(ah)} y2={85 + 38 * Math.sin(ah)} stroke={INK} strokeWidth={6} strokeLinecap="round" />
          <line x1={85} y1={85} x2={85 + 60 * Math.cos(am)} y2={85 + 60 * Math.sin(am)} stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
          <circle cx={85} cy={85} r={5} fill={INK} />
        </Svg>
      );
    },
  },
  {
    id: 'reta', nome: 'Reta numérica', grupo: 'Matemática',
    params: [{ key: 'inicio', label: 'Início', tipo: 'numero', padrao: 0 }, { key: 'fim', label: 'Fim', tipo: 'numero', padrao: 10 }, { key: 'passo', label: 'Passo', tipo: 'numero', padrao: 1 }, { key: 'oculto', label: 'Esconder (lista, ex.: 3,7)', tipo: 'texto', padrao: '3,7' }],
    alt: (p) => `Reta numérica de ${num(p, 'inicio', 0)} a ${num(p, 'fim', 10)} com alguns números para completar`,
    render: (p) => {
      const a = num(p, 'inicio', 0);
      const b = num(p, 'fim', 10);
      const step = Math.max(0.0001, Math.abs(num(p, 'passo', 1)));
      const hide = new Set(list(str(p, 'oculto', '')).map(Number));
      const marks: number[] = [];
      for (let v = a; v <= b + 1e-9 && marks.length < 41; v += step) marks.push(Math.round(v * 1000) / 1000);
      const W = 360;
      const x = (v: number) => 20 + ((v - a) / (b - a || 1)) * (W - 40);
      return (
        <Svg w={W} h={70} label="Reta numérica">
          <line x1={10} y1={30} x2={W - 6} y2={30} stroke={INK} strokeWidth={2.5} markerEnd="url(#seta)" />
          <defs><marker id="seta" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={INK} /></marker></defs>
          {marks.map((v) => <g key={v}><line x1={x(v)} y1={22} x2={x(v)} y2={38} stroke={INK} strokeWidth={2} />{hide.has(v) ? <rect x={x(v) - 12} y={44} width={24} height={20} fill="#fff" stroke={INK} strokeDasharray="3 2" /> : <text x={x(v)} y={60} textAnchor="middle" fontSize={13} fill={INK}>{v.toLocaleString('pt-BR')}</text>}</g>)}
        </Svg>
      );
    },
  },
  {
    id: 'forma', nome: 'Figura geométrica plana', grupo: 'Matemática',
    params: [{ key: 'forma', label: 'Forma', tipo: 'opcao', padrao: 'triangulo', opcoes: ['quadrado', 'retangulo', 'triangulo', 'circulo', 'pentagono', 'hexagono', 'losango', 'trapezio'] }, { key: 'rotulo', label: 'Medidas (opcional, ex.: 4 cm)', tipo: 'texto', padrao: '' }],
    alt: (p) => `Figura geométrica: ${str(p, 'forma', 'triangulo')}`,
    render: (p) => {
      const f = str(p, 'forma', 'triangulo');
      const r = str(p, 'rotulo', '');
      const poly = (n: number) => Array.from({ length: n }).map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return `${90 + 62 * Math.cos(a)},${80 + 62 * Math.sin(a)}`; }).join(' ');
      const shapes: Record<string, ReactNode> = {
        quadrado: <rect x={30} y={20} width={120} height={120} />,
        retangulo: <rect x={10} y={40} width={160} height={80} />,
        triangulo: <polygon points="90,15 165,145 15,145" />,
        circulo: <circle cx={90} cy={80} r={65} />,
        pentagono: <polygon points={poly(5)} />,
        hexagono: <polygon points={poly(6)} />,
        losango: <polygon points="90,10 160,80 90,150 20,80" />,
        trapezio: <polygon points="50,30 130,30 170,140 10,140" />,
      };
      return <Svg w={180} h={170} label={f}><g fill={FILL3} stroke={INK} strokeWidth={3}>{shapes[f] ?? shapes.triangulo}</g>{r && <text x={90} y={166} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{r}</text>}</Svg>;
    },
  },
  {
    id: 'grafico', nome: 'Gráfico de barras', grupo: 'Matemática',
    params: [{ key: 'rotulos', label: 'Rótulos', tipo: 'texto', padrao: 'Seg, Ter, Qua, Qui, Sex' }, { key: 'valores', label: 'Valores', tipo: 'texto', padrao: '4, 7, 3, 8, 5' }, { key: 'titulo', label: 'Título', tipo: 'texto', padrao: 'Livros lidos na semana' }],
    alt: (p) => `Gráfico de barras: ${str(p, 'titulo', '')}`,
    render: (p) => {
      const rot = list(str(p, 'rotulos', 'A,B,C'));
      const val = list(str(p, 'valores', '1,2,3')).map(Number).map((v) => (Number.isFinite(v) ? v : 0));
      const n = Math.max(rot.length, val.length);
      const max = Math.max(1, ...val);
      const H = 150;
      const bw = 260 / Math.max(1, n);
      const ticks = Array.from({ length: Math.min(max, 10) + 1 }).map((_, i) => Math.round((i * max) / Math.min(max, 10)));
      return (
        <Svg w={320} h={220} label="Gráfico de barras">
          <text x={170} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{str(p, 'titulo', '')}</text>
          {ticks.map((t) => <g key={t}><line x1={40} x2={305} y1={180 - (t / max) * H} y2={180 - (t / max) * H} stroke="#d1d5db" /><text x={34} y={184 - (t / max) * H} textAnchor="end" fontSize={11} fill={INK}>{t}</text></g>)}
          {Array.from({ length: n }).map((_, i) => { const v = val[i] ?? 0; const h = (v / max) * H; return <g key={i}><rect x={45 + i * bw + bw * 0.15} y={180 - h} width={bw * 0.7} height={h} fill={[FILL, FILL2, FILL3][i % 3]} stroke={INK} strokeWidth={2} /><text x={45 + i * bw + bw / 2} y={198} textAnchor="middle" fontSize={12} fill={INK}>{rot[i] ?? ''}</text></g>; })}
          <line x1={40} y1={180} x2={308} y2={180} stroke={INK} strokeWidth={2} /><line x1={40} y1={25} x2={40} y2={180} stroke={INK} strokeWidth={2} />
        </Svg>
      );
    },
  },
  {
    id: 'dinheiro', nome: 'Moedas e cédulas', grupo: 'Matemática',
    params: [{ key: 'valores', label: 'Valores em reais (ex.: 10, 5, 0.5, 0.25)', tipo: 'texto', padrao: '10, 2, 1, 0.50, 0.25' }],
    alt: (p) => `Dinheiro: ${str(p, 'valores', '')} reais`,
    render: (p) => {
      const vals = list(str(p, 'valores', '1')).map(Number).filter((v) => Number.isFinite(v) && v > 0).slice(0, 10);
      let x = 8;
      const items = vals.map((v, i) => {
        const brl = v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (v >= 2) { const el = <g key={i}><rect x={x} y={20} width={110} height={56} rx={6} fill={FILL3} stroke={INK} strokeWidth={2} /><text x={x + 55} y={55} textAnchor="middle" fontSize={16} fontWeight={800} fill={INK}>{brl}</text></g>; x += 118; return el; }
        const r = v >= 1 ? 30 : v >= 0.5 ? 27 : 24;
        const el = <g key={i}><circle cx={x + r} cy={48} r={r} fill={FILL2} stroke={INK} strokeWidth={2} /><text x={x + r} y={53} textAnchor="middle" fontSize={12} fontWeight={800} fill={INK}>{brl}</text></g>;
        x += r * 2 + 8;
        return el;
      });
      return <Svg w={Math.max(120, x)} h={96} label="Dinheiro">{items}</Svg>;
    },
  },
  {
    id: 'regua', nome: 'Régua', grupo: 'Matemática',
    params: [{ key: 'cm', label: 'Comprimento (cm)', tipo: 'numero', padrao: 10, min: 3, max: 20 }, { key: 'objeto', label: 'Medir objeto até (cm, 0 = nenhum)', tipo: 'numero', padrao: 7 }],
    alt: (p) => `Régua de ${num(p, 'cm', 10)} cm`,
    render: (p) => {
      const cm = Math.max(3, Math.min(20, num(p, 'cm', 10)));
      const obj = Math.max(0, Math.min(cm, num(p, 'objeto', 0)));
      const u = 300 / cm;
      return (
        <Svg w={330} h={110} label="Régua">
          {obj > 0 && <rect x={15} y={8} width={obj * u} height={22} rx={11} fill={FILL2} stroke={INK} strokeWidth={2} />}
          <rect x={10} y={40} width={310} height={60} fill="#fff" stroke={INK} strokeWidth={2} />
          {Array.from({ length: cm * 10 + 1 }).map((_, i) => <line key={i} x1={15 + (i / 10) * u} y1={40} x2={15 + (i / 10) * u} y2={40 + (i % 10 ? (i % 5 ? 10 : 16) : 24)} stroke={INK} strokeWidth={i % 10 ? 1 : 2} />)}
          {Array.from({ length: cm + 1 }).map((_, i) => <text key={i} x={15 + i * u} y={82} textAnchor="middle" fontSize={12} fill={INK}>{i}</text>)}
          <text x={300} y={95} textAnchor="end" fontSize={10} fill={INK}>cm</text>
        </Svg>
      );
    },
  },
  {
    id: 'termometro', nome: 'Termômetro', grupo: 'Ciências',
    params: [{ key: 'temp', label: 'Temperatura (°C)', tipo: 'numero', padrao: 28, min: -10, max: 50 }],
    alt: (p) => `Termômetro marcando ${num(p, 'temp', 28)} graus Celsius`,
    render: (p) => {
      const t = Math.max(-10, Math.min(50, num(p, 'temp', 28)));
      const y = (v: number) => 200 - ((v + 10) / 60) * 170;
      return (
        <Svg w={110} h={240} label="Termômetro">
          <rect x={40} y={20} width={24} height={190} rx={12} fill="#fff" stroke={INK} strokeWidth={2} />
          <rect x={46} y={y(t)} width={12} height={210 - y(t)} fill="#f87171" />
          <circle cx={52} cy={215} r={18} fill="#f87171" stroke={INK} strokeWidth={2} />
          {Array.from({ length: 7 }).map((_, i) => { const v = -10 + i * 10; return <g key={v}><line x1={64} x2={74} y1={y(v)} y2={y(v)} stroke={INK} strokeWidth={2} /><text x={78} y={y(v) + 4} fontSize={11} fill={INK}>{v}°</text></g>; })}
        </Svg>
      );
    },
  },
  {
    id: 'ciclo-agua', nome: 'Ciclo da água', grupo: 'Ciências',
    params: [{ key: 'numerado', label: 'Etapas', tipo: 'opcao', padrao: 'nomes', opcoes: ['nomes', 'numeros'] }],
    alt: () => 'Ciclo da água: evaporação, condensação, precipitação e escoamento',
    render: (p) => {
      const n = str(p, 'numerado', 'nomes') === 'numeros';
      const lab = (t: string, i: number) => (n ? `${i}` : t);
      return (
        <Svg w={340} h={210} label="Ciclo da água">
          <circle cx={290} cy={40} r={24} fill={FILL2} stroke={INK} strokeWidth={2} />
          <path d="M60,60 q20,-25 45,-8 q20,-18 40,4 q22,2 18,22 h-110 q-15,-10 7,-18z" fill="#fff" stroke={INK} strokeWidth={2} />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={80 + i * 18} y1={88} x2={74 + i * 18} y2={108} stroke="#3b82f6" strokeWidth={2.5} />)}
          <path d="M0,170 q60,-10 120,0 t120,0 t120,0 V210 H0z" fill="#bfdbfe" stroke={INK} strokeWidth={2} />
          <path d="M150,170 l40,-60 l40,60z" fill={FILL3} stroke={INK} strokeWidth={2} />
          <path d="M255,160 C260,120 245,100 210,70" fill="none" stroke={INK} strokeWidth={2} strokeDasharray="6 4" markerEnd="url(#sa)" />
          <path d="M200,150 C215,180 260,175 300,168" fill="none" stroke={INK} strokeWidth={2} markerEnd="url(#sa)" />
          <defs><marker id="sa" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={INK} /></marker></defs>
          <g fontSize={12} fontWeight={700} fill={INK}>
            <text x={262} y={120}>{lab('Evaporação', 1)}</text>
            <text x={170} y={45}>{lab('Condensação', 2)}</text>
            <text x={20} y={125}>{lab('Precipitação', 3)}</text>
            <text x={215} y={200}>{lab('Escoamento', 4)}</text>
          </g>
        </Svg>
      );
    },
  },
  {
    id: 'planta', nome: 'Partes da planta', grupo: 'Ciências',
    params: [{ key: 'numerado', label: 'Rótulos', tipo: 'opcao', padrao: 'numeros', opcoes: ['nomes', 'numeros'] }],
    alt: () => 'Planta com raiz, caule, folhas, flor e fruto indicados',
    render: (p) => {
      const n = str(p, 'numerado', 'numeros') === 'numeros';
      const L = [['Flor', 150, 35], ['Folha', 165, 105], ['Fruto', 40, 95], ['Caule', 150, 150], ['Raiz', 150, 215]] as const;
      return (
        <Svg w={230} h={240} label="Partes da planta">
          <line x1={0} y1={180} x2={230} y2={180} stroke="#92400e" strokeWidth={3} />
          <path d="M100,180 l-20,40 M100,180 l0,45 M100,180 l22,38 M90,200 l-15,10 M110,200 l14,8" stroke={INK} strokeWidth={2.5} fill="none" />
          <path d="M100,180 C98,140 102,100 100,60" stroke="#15803d" strokeWidth={6} fill="none" />
          <ellipse cx={128} cy={112} rx={26} ry={11} transform="rotate(-25 128 112)" fill="#86efac" stroke={INK} strokeWidth={2} />
          <ellipse cx={74} cy={128} rx={24} ry={10} transform="rotate(25 74 128)" fill="#86efac" stroke={INK} strokeWidth={2} />
          <circle cx={74} cy={95} r={11} fill="#f87171" stroke={INK} strokeWidth={2} />
          {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={100 + 16 * Math.cos((i * Math.PI) / 3)} cy={45 + 16 * Math.sin((i * Math.PI) / 3)} rx={11} ry={7} transform={`rotate(${i * 60} ${100 + 16 * Math.cos((i * Math.PI) / 3)} ${45 + 16 * Math.sin((i * Math.PI) / 3)})`} fill="#f9a8d4" stroke={INK} strokeWidth={1.5} />)}
          <circle cx={100} cy={45} r={8} fill={FILL2} stroke={INK} strokeWidth={1.5} />
          <g fontSize={13} fontWeight={700} fill={INK}>
            {L.map(([t, x, y], i) => <g key={t}><line x1={x - 6} y1={y - 4} x2={x - 30} y2={y - 4} stroke={INK} strokeWidth={1} /><text x={x - 2} y={y}>{n ? `${i + 1}` : t}</text></g>)}
          </g>
        </Svg>
      );
    },
  },
  {
    id: 'cadeia', nome: 'Cadeia alimentar', grupo: 'Ciências',
    params: [{ key: 'seres', label: 'Seres (em ordem)', tipo: 'texto', padrao: 'Sol, Capim, Gafanhoto, Sapo, Cobra' }, { key: 'oculto', label: 'Esconder posição (0 = nenhum)', tipo: 'numero', padrao: 0 }],
    alt: (p) => `Cadeia alimentar: ${str(p, 'seres', '')}`,
    render: (p) => {
      const s = list(str(p, 'seres', 'Sol, Planta, Herbívoro, Carnívoro')).slice(0, 6);
      const hide = num(p, 'oculto', 0);
      const w = 70;
      const W = s.length * (w + 26);
      return (
        <Svg w={W} h={70} label="Cadeia alimentar">
          <defs><marker id="ca" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={INK} /></marker></defs>
          {s.map((t, i) => (
            <g key={i}>
              <rect x={5 + i * (w + 26)} y={14} width={w} height={40} rx={10} fill={[FILL2, '#bbf7d0', FILL3, FILL, '#fecaca', '#e9d5ff'][i % 6]} stroke={INK} strokeWidth={2} strokeDasharray={hide === i + 1 ? '5 3' : undefined} />
              <text x={5 + i * (w + 26) + w / 2} y={39} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>{hide === i + 1 ? '?' : t}</text>
              {i < s.length - 1 && <line x1={7 + i * (w + 26) + w} y1={34} x2={i * (w + 26) + w + 28} y2={34} stroke={INK} strokeWidth={2} markerEnd="url(#ca)" />}
            </g>
          ))}
        </Svg>
      );
    },
  },
  {
    id: 'rosa-ventos', nome: 'Rosa dos ventos', grupo: 'Geografia',
    params: [{ key: 'colaterais', label: 'Direções', tipo: 'opcao', padrao: 'cardeais', opcoes: ['cardeais', 'colaterais', 'em-branco'] }],
    alt: () => 'Rosa dos ventos',
    render: (p) => {
      const m = str(p, 'colaterais', 'cardeais');
      const card = [['N', 100, 18], ['L', 186, 106], ['S', 100, 196], ['O', 12, 106]] as const;
      const col = [['NE', 160, 46], ['SE', 160, 170], ['SO', 28, 170], ['NO', 28, 46]] as const;
      return (
        <Svg w={200} h={210} label="Rosa dos ventos">
          <polygon points="100,25 112,92 100,100 88,92" fill={INK} /><polygon points="100,185 112,112 100,104 88,112" fill="#fff" stroke={INK} strokeWidth={2} />
          <polygon points="180,102 112,90 104,102 112,114" fill="#fff" stroke={INK} strokeWidth={2} /><polygon points="20,102 88,90 96,102 88,114" fill={INK} />
          <polygon points="150,52 108,96 100,102 104,92" fill={FILL} stroke={INK} /><polygon points="150,152 108,108 100,102 104,112" fill={FILL} stroke={INK} />
          <polygon points="50,152 92,108 100,102 96,112" fill={FILL} stroke={INK} /><polygon points="50,52 92,96 100,102 96,92" fill={FILL} stroke={INK} />
          <g fontSize={16} fontWeight={800} fill={INK} textAnchor="middle">
            {card.map(([t, x, y]) => (m === 'em-branco' ? <rect key={t} x={x - 13} y={y - 15} width={26} height={20} fill="#fff" stroke={INK} strokeDasharray="3 2" /> : <text key={t} x={x} y={y}>{t}</text>))}
            {m === 'colaterais' && col.map(([t, x, y]) => <text key={t} x={x} y={y} fontSize={12}>{t}</text>)}
          </g>
        </Svg>
      );
    },
  },
  {
    id: 'linha-tempo', nome: 'Linha do tempo', grupo: 'História',
    params: [{ key: 'marcos', label: 'Marcos (ano: fato; …)', tipo: 'texto', padrao: '1500: Chegada dos portugueses; 1822: Independência; 1888: Abolição; 1889: República' }],
    alt: (p) => `Linha do tempo: ${str(p, 'marcos', '')}`,
    render: (p) => {
      const ms = str(p, 'marcos', '').split(';').map((x) => x.split(':').map((y) => y.trim())).filter((x) => x[0]).slice(0, 8);
      const W = Math.max(320, ms.length * 110);
      return (
        <Svg w={W} h={120} label="Linha do tempo">
          <line x1={10} y1={50} x2={W - 10} y2={50} stroke={INK} strokeWidth={3} />
          {ms.map(([ano, fato], i) => { const x = 30 + (i * (W - 60)) / Math.max(1, ms.length - 1); return <g key={i}><circle cx={x} cy={50} r={8} fill={FILL2} stroke={INK} strokeWidth={2} /><text x={x} y={32} textAnchor="middle" fontSize={14} fontWeight={800} fill={INK}>{ano}</text>{(fato ?? '').split(' ').reduce<string[]>((acc, w) => { const l = acc[acc.length - 1]; if (l && (l + ' ' + w).length <= 14) acc[acc.length - 1] = `${l} ${w}`; else acc.push(w); return acc; }, []).slice(0, 3).map((line, k) => <text key={k} x={x} y={76 + k * 14} textAnchor="middle" fontSize={11} fill={INK}>{line}</text>)}</g>; })}
        </Svg>
      );
    },
  },
  {
    id: 'quadro', nome: 'Quadro em branco / quadriculado', grupo: 'Geral',
    params: [{ key: 'estilo', label: 'Estilo', tipo: 'opcao', padrao: 'quadriculado', opcoes: ['quadriculado', 'pontilhado', 'liso'] }],
    alt: () => 'Quadro para desenhar ou calcular',
    render: (p) => {
      const e = str(p, 'estilo', 'quadriculado');
      return (
        <Svg w={340} h={170} label="Quadro">
          <rect x={2} y={2} width={336} height={166} fill="#fff" stroke={INK} strokeWidth={2} />
          {e === 'quadriculado' && Array.from({ length: 33 }).map((_, i) => <line key={`v${i}`} x1={2 + i * 10.5} y1={2} x2={2 + i * 10.5} y2={168} stroke="#cbd5e1" />)}
          {e === 'quadriculado' && Array.from({ length: 16 }).map((_, i) => <line key={`h${i}`} x1={2} y1={2 + i * 10.5} x2={338} y2={2 + i * 10.5} stroke="#cbd5e1" />)}
          {e === 'pontilhado' && Array.from({ length: 33 * 16 }).map((_, i) => <circle key={i} cx={8 + (i % 33) * 10.2} cy={8 + Math.floor(i / 33) * 10.2} r={1} fill="#64748b" />)}
        </Svg>
      );
    },
  },
];

export function findFigura(id: string) { return FIGURAS.find((f) => f.id === id); }

export function padroes(def: FiguraDef): P { return Object.fromEntries(def.params.map((x) => [x.key, x.padrao])); }

export function Figura({ id, params, escala = 1 }: { id: string; params?: P; escala?: number }) {
  const def = findFigura(id);
  if (!def) return null;
  return <div className="figura" style={{ maxWidth: 360 * escala, margin: '8px 0' }}>{def.render({ ...padroes(def), ...params })}</div>;
}
