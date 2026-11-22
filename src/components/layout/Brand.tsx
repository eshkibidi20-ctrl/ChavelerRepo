import { Compass, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Brand() { return <Link to="/" className="flex items-center gap-2.5"><span className="relative grid h-10 w-10 place-items-center rounded-xl bg-navy text-white shadow-lg shadow-navy/20"><Compass size={25} strokeWidth={1.7} /><Plane size={12} className="absolute -right-1 -top-1 rotate-45 text-coral" /></span><span className="font-display text-[15px] font-extrabold tracking-tight text-navy sm:text-base">CHAVELER<span className="text-coral">.</span><small className="block font-sans text-[8px] font-bold tracking-[.24em] text-slate-400">TRAVEL & TOURS</small></span></Link> }
