// AdminStatusBadge.tsx
const styles: Record<string, string> = {
  Confirmed: 'bg-teal/10 text-teal',
  'Pending Payment': 'bg-amber-50 text-amber-700',
  'Needs Review': 'bg-rose-50 text-rose-600',
  Completed: 'bg-slate-100 text-slate-600',
  Published: 'bg-teal/10 text-teal',
  Draft: 'bg-slate-100 text-slate-500',
  New: 'bg-coral/10 text-coral',
  'In Progress': 'bg-amber-50 text-amber-700',
  Active: 'bg-teal/10 text-teal',
  Invited: 'bg-slate-100 text-slate-500',
};

export default function AdminStatusBadge({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
        styles[value] ?? 'bg-slate-100 text-slate-500'
      }`}
    >
      {value}
    </span>
  );
}