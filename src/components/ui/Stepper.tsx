// Stepper.tsx
import { Minus, Plus } from 'lucide-react';

export default function Stepper({
  label,
  value,
  min,
  max = 20,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-slate-600">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label}`}
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-bold text-navy">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label}`}
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}