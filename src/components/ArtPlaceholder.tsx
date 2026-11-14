import type { LucideIcon } from 'lucide-react';

/** Cenário provisório vetorial: céu, astro, colinas em camadas e o motivo da cena num “selo” de vidro. */
export function ArtPlaceholder({ palette, Icon, seed }: { palette: [string, string, string]; Icon: LucideIcon; seed: number }) {
  const [c1, c2, c3] = palette;
  const r = (n: number) => ((Math.sin(seed * 9301 + n * 49297) + 1) / 2);
  const stars = Array.from({ length: 26 }, (_, i) => ({ x: r(i) * 400, y: r(i + 40) * 120, s: 0.4 + r(i + 80) * 1.1 }));
  const id = `g${seed}`;
  const orbX = 60 + r(3) * 280;
  return (
    <div className="art-ph" aria-hidden>
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b26" /><stop offset=".55" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
          <radialGradient id={`${id}o`}><stop offset="0" stopColor={c3} stopOpacity=".95" /><stop offset=".35" stopColor={c3} stopOpacity=".35" /><stop offset="1" stopColor={c3} stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}h1`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c2} stopOpacity=".9" /><stop offset="1" stopColor="#0a0f30" /></linearGradient>
          <linearGradient id={`${id}h2`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c3} stopOpacity=".55" /><stop offset=".4" stopColor="#0b1240" /><stop offset="1" stopColor="#060a22" /></linearGradient>
        </defs>
        <rect width="400" height="225" fill={`url(#${id}s)`} />
        {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff" opacity={0.35 + r(i + 7) * 0.5} />)}
        <circle cx={orbX} cy="70" r="70" fill={`url(#${id}o)`} />
        <circle cx={orbX} cy="70" r="11" fill={c3} opacity=".85" />
        <path d={`M0 150 Q 60 ${110 + r(5) * 20} 120 140 T 240 ${130 + r(6) * 15} T 400 135 V225 H0Z`} fill={`url(#${id}h1)`} />
        <path d={`M0 180 Q 80 ${150 + r(9) * 15} 170 175 T 330 ${165 + r(10) * 10} T 400 170 V225 H0Z`} fill={`url(#${id}h2)`} />
        <path d="M0 182 Q 100 168 200 184 T 400 176" stroke={c3} strokeOpacity=".5" strokeWidth="1.2" fill="none" />
      </svg>
      <span className="art-seal" style={{ boxShadow: `0 0 40px ${c3}66` }}><Icon strokeWidth={1.4} /></span>
    </div>
  );
}
