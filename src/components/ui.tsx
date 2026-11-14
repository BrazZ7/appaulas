import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, Bookmark, BookmarkCheck, Check, Info, X } from 'lucide-react';
import { actions, useApp } from '../store/store';

export function Switch({ checked, onChange, label, hideLabel }: { checked: boolean; onChange: (v: boolean) => void; label: string; hideLabel?: boolean }) {
  return (
    <label className="switch">
      {!hideLabel && <span>{label}</span>}
      <input type="checkbox" role="switch" checked={checked} aria-label={hideLabel ? label : undefined} onChange={(e) => onChange(e.target.checked)} />
      <span className="track" aria-hidden />
    </label>
  );
}

export function Tabs<T extends string>({ value, onChange, items, label }: { value: T; onChange: (v: T) => void; items: { id: T; label: string; icon?: ReactNode }[]; label: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((it, i) => (
        <button
          key={it.id}
          ref={(el) => { refs.current[i] = el; }}
          role="tab"
          type="button"
          aria-selected={value === it.id}
          tabIndex={value === it.id ? 0 : -1}
          onClick={() => onChange(it.id)}
          onKeyDown={(e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            const n = (i + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length;
            onChange(items[n].id);
            refs.current[n]?.focus();
          }}
        >
          {it.icon}
          {it.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const node = ref.current;
    node?.querySelector<HTMLElement>('input, textarea, select, button:not([data-close])')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && node) {
        const f = node.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <div className="row between mb">
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button className="btn icon ghost" onClick={onClose} aria-label="Fechar" data-close>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Toasts ──
type ToastMsg = { id: number; text: string };
let pushToast: (t: string) => void = () => {};
export const toast = (t: string) => pushToast(t);

export function Toasts() {
  const [items, setItems] = useState<ToastMsg[]>([]);
  useEffect(() => {
    pushToast = (text) => {
      const id = Date.now() + Math.random();
      setItems((s) => [...s, { id, text }]);
      setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200);
    };
  }, []);
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {items.map((t) => (
        <div className="toast" key={t.id}>
          <Check size={18} color="var(--cyan)" /> {t.text}
        </div>
      ))}
    </div>
  );
}

export function Notice({ children, kind = 'warn' }: { children: ReactNode; kind?: 'warn' | 'info' }) {
  return (
    <div className={`notice ${kind === 'info' ? 'info' : ''}`}>
      {kind === 'info' ? <Info size={18} /> : <AlertTriangle size={18} />}
      <div>{children}</div>
    </div>
  );
}

export function Bar({ value, max = 100, variant, label }: { value: number; max?: number; variant?: 'violet' | 'warn'; label: string }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div className={`bar ${variant ?? ''}`} role="progressbar" aria-label={label} aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Steps({ items, current }: { items: string[]; current: number }) {
  return (
    <ol className="steps clean" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((s, i) => (
        <li key={i} className={`step ${i < current ? 'done' : i === current ? 'current' : ''}`} aria-current={i === current ? 'step' : undefined}>
          <span className="dot">{i < current ? <Check size={14} /> : null}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}

export function FavButton({ k, title }: { k: string; title: string }) {
  const s = useApp();
  const on = s.favorites.includes(k);
  return (
    <button
      className="btn icon ghost"
      aria-pressed={on}
      aria-label={on ? `Remover “${title}” dos favoritos` : `Salvar “${title}” nos favoritos`}
      title={on ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); actions.toggleFavorite(k); toast(on ? 'Removido dos favoritos' : 'Salvo nos favoritos'); }}
    >
      {on ? <BookmarkCheck color="var(--cyan)" /> : <Bookmark />}
    </button>
  );
}

export function DemoBadge() {
  return <span className="badge amber" title="Dados criados para demonstração, não registrados por uma turma real">Demonstrativo</span>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

export function PageHead({ kicker, title, sub, actions: act }: { kicker?: string; title: ReactNode; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="page-head">
      <div>
        {kicker && <div className="kicker">{kicker}</div>}
        <h1>{title}</h1>
        {sub && <p className="muted" style={{ margin: 0, maxWidth: 760 }}>{sub}</p>}
      </div>
      {act && <div className="row">{act}</div>}
    </header>
  );
}

export function minutes(n: number) {
  return n >= 60 ? `${Math.floor(n / 60)} h${n % 60 ? ` ${n % 60} min` : ''}` : `${n} min`;
}

export function anosLabel(anos: number[]) {
  if (!anos.length) return '';
  const sorted = [...anos].sort((a, b) => a - b);
  return sorted.length === 1 ? `${sorted[0]}º ano` : `${sorted[0]}º–${sorted[sorted.length - 1]}º ano`;
}
