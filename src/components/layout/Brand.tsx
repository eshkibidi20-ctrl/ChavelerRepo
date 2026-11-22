import { Compass, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Brand() {
  return (
    <Link
      to="/"
      className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl focus-ring"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white shadow-lg shadow-navy/20 transition group-hover:bg-slate-800">
        <Compass size={22} strokeWidth={1.8} />
        <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-coral text-white shadow-xs">
          <Plane size={9} strokeWidth={2.5} />
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-tight text-navy sm:text-base">
          CHAVELER<span className="text-coral">.</span>
        </span>
        <small className="mt-1 font-sans text-[8px] font-bold tracking-[.24em] text-slate-400">
          TRAVEL &amp; TOURS
        </small>
      </span>
    </Link>
  );
}