import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHead } from '../components/ui';
import { buildIndex, search } from '../content';
import { useApp } from '../store/store';
import { EMPTY_FILTERS, FilterBar, ItemCard, allItems, applyFilters, type Filters } from './Library';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const s = useApp();
  const [f, setF] = useState<Filters>(EMPTY_FILTERS);
  const items = useMemo(() => allItems(s.myLessons), [s.myLessons]);
  const index = useMemo(() => buildIndex(s.myLessons), [s.myLessons]);
  const hits = search(index, q, 200).map((h) => h.key);
  const matched = q ? items.filter((i) => hits.includes(i.key)).sort((a, b) => hits.indexOf(a.key) - hits.indexOf(b.key)) : items;
  const result = applyFilters(matched, f);
  return (
    <div className="stack">
      <PageHead kicker="Busca" title={q ? `Resultados para “${q}”` : 'Buscar na biblioteca'} sub="Busque por tema, matéria, recurso ou objetivo e refine com os filtros." />
      <label className="field">
        <span>Termo de busca</span>
        <input className="input" type="search" value={q} onChange={(e) => setParams({ q: e.target.value })} placeholder="Ex.: porcentagem, água, identidade, debate" />
      </label>
      <FilterBar f={f} setF={setF} />
      <p aria-live="polite" className="muted">{result.length} resultado(s)</p>
      <div className="grid auto-fill">{result.map((it) => <ItemCard key={it.key} it={it} />)}</div>
    </div>
  );
}
