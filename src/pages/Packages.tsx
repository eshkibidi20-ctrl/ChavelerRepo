import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, PackageOpen, RotateCcw, Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { mockPackages } from '@/data/mockTravelData';
import PackageCard from '@/components/ui/PackageCard';

const CATEGORIES = ['All', 'Domestic', 'International', 'Activities'] as const;

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState(params.get('category') ?? 'All');
  const [search, setSearch] = useState(params.get('search') ?? '');
  const [duration, setDuration] = useState(params.get('duration') ?? 'All');
  const [sort, setSort] = useState('Featured');

  // Keep local filter state synced when navigating via navbar or hero search
  useEffect(() => {
    setCategory(params.get('category') ?? 'All');
    setSearch(params.get('search') ?? '');
    setDuration(params.get('duration') ?? 'All');
  }, [params]);

  const updateParams = (nextCategory: string, nextSearch: string, nextDuration: string) => {
    const next = new URLSearchParams();
    if (nextCategory !== 'All') next.set('category', nextCategory);
    if (nextSearch.trim()) next.set('search', nextSearch.trim());
    if (nextDuration !== 'All') next.set('duration', nextDuration);
    setParams(next, { replace: true });
  };

  const changeCategory = (value: string) => {
    setCategory(value);
    updateParams(value, search, duration);
  };

  const changeSearch = (value: string) => {
    setSearch(value);
    updateParams(category, value, duration);
  };

  const resetFilters = () => {
    setCategory('All');
    setSearch('');
    setDuration('All');
    setSort('Featured');
    setParams({}, { replace: true });
  };

  const filtered = useMemo(() => {
    return mockPackages
      .filter((item) => {
        const matchesCategory = category === 'All' || item.category === category;
        const matchesSearch = `${item.title} ${item.destination} ${item.shortDescription}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesDuration =
          duration === 'All' ||
          item.duration.toLowerCase().includes(duration.toLowerCase());
        return matchesCategory && matchesSearch && matchesDuration;
      })
      .sort((a, b) => {
        if (sort === 'Price: Low to High') return a.promoPrice - b.promoPrice;
        if (sort === 'Biggest Discount') return b.discountPercent - a.discountPercent;
        return 0;
      });
  }, [category, search, duration, sort]);

  const hasActiveFilters = category !== 'All' || search.trim() !== '' || duration !== 'All';

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs font-extrabold uppercase tracking-[.18em] text-teal">
          The Chaveler collection
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Trips worth taking.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Browse our handpicked escapes, then make them yours.
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3.5 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-teal">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search destinations or experiences"
            className="w-full bg-transparent py-3 text-sm text-navy outline-none placeholder:text-slate-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => changeSearch('')}
              aria-label="Clear search"
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200/60 hover:text-navy"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {CATEGORIES.map((value) => (
            <button
              type="button"
              onClick={() => changeCategory(value)}
              key={value}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                category === value
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort packages"
            className="w-full appearance-none rounded-xl bg-slate-50 py-2.5 pl-3.5 pr-9 text-xs font-bold text-navy outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-teal lg:w-44"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Biggest Discount</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold text-slate-500">
            <span className="font-bold text-navy">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'experience' : 'experiences'} to explore
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline"
            >
              <RotateCcw size={12} /> Reset filters
            </button>
          )}
        </div>
        <span className="hidden text-xs text-slate-400 sm:block">Prices shown per person</span>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PackageCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-20 text-center">
          <PackageOpen className="mx-auto text-slate-300" size={38} />
          <p className="mt-3 font-display text-lg font-bold text-navy">No matching trips found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try clearing your search or switching to another destination category.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            <RotateCcw size={14} /> Show all packages
          </button>
        </div>
      )}
    </div>
  );
}