// AdminPackages.tsx
import { useEffect, useMemo, useState } from 'react';
import { Edit3, MoreHorizontal, Plus, Search, Star, Trash2 } from 'lucide-react';
import { getAdminPackages } from '@/services/adminService';
import type { AdminPackage } from '@/admin/types';
import AdminStatusBadge from '@/components/ui/AdminStatusBadge';

const peso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);

export default function AdminPackages() {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');

  useEffect(() => {
    void getAdminPackages().then(setItems);
  }, []);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (category === 'All categories' || item.category === category) &&
          `${item.title} ${item.destination}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query, category],
  );

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.18em] text-teal">Catalog</div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy">Packages</h1>
          <p className="mt-2 text-sm text-slate-500">Shape the trips your guests can discover.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 self-start rounded-xl bg-coral px-4 py-3 text-xs font-bold text-white shadow-lg shadow-coral/15 transition hover:bg-orange-600"
        >
          <Plus size={15} /> Add package
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 ring-1 ring-transparent focus-within:ring-teal">
          <Search size={16} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages or destinations"
            className="w-full bg-transparent py-3 text-sm text-navy outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-teal"
        >
          <option>All categories</option>
          <option>Domestic</option>
          <option>International</option>
          <option>Activities</option>
        </select>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, index) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
          >
            <div
              className={`relative h-36 ${
                index % 2 === 0
                  ? 'bg-gradient-to-br from-teal-100 via-cyan-50 to-slate-100'
                  : 'bg-gradient-to-br from-orange-100 via-amber-50 to-rose-50'
              }`}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, white 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, white 0 2px, transparent 3px)',
                  backgroundSize: '36px 36px',
                }}
              />
              <span className="absolute left-4 top-4">
                <AdminStatusBadge value={item.status} />
              </span>
              <button
                type="button"
                aria-label="More options"
                className="absolute right-3 top-3 rounded-lg bg-white/80 p-2 text-slate-500 backdrop-blur hover:text-navy"
              >
                <MoreHorizontal size={16} />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold text-navy">
                <Star size={11} className="text-coral" fill="currentColor" /> Featured catalog item
              </div>
            </div>

            <div className="p-5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal">
                {item.category} · {item.duration}
              </div>
              <h2 className="mt-2 font-display text-lg font-bold text-navy">{item.title}</h2>
              <p className="mt-1 text-xs text-slate-500">{item.destination}</p>
              <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <div className="font-display text-lg font-extrabold text-navy">
                    {peso(item.price)}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">{item.bookings} bookings</div>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Edit package"
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-teal hover:text-teal"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete package"
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-coral hover:text-coral"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}