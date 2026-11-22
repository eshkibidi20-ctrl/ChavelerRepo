import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) { return <div className="mb-7 flex items-end justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-teal"><span className="h-px w-6 bg-teal" /> {eyebrow}</div><h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{title}</h2></div>{action && <Link to="/packages" className="hidden items-center gap-1 text-sm font-bold text-teal sm:flex">{action} <ArrowRight size={16} /></Link>}</div> }
