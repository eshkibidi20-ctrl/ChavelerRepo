import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Brand from '@/components/layout/Brand';

const navItems = [['Home', '/'], ['Domestic', '/packages?category=Domestic'], ['International', '/packages?category=International'], ['Activities', '/packages?category=Activities'], ['Visa Assistance', '/visa-assistance'], ['About Us', '/#about']];

export default function Navbar({ onCart }: { onCart: () => void }) {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8"><Brand /><nav className="hidden items-center gap-6 lg:flex">{navItems.map(([label, href]) => <Link key={label} to={href} className="text-[13px] font-semibold text-slate-600 transition hover:text-teal">{label}</Link>)}</nav><div className="flex items-center gap-2"><Link to="/packages" className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-50 hover:text-navy sm:block"><Search size={18} /></Link><Link to="/account" className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-50 hover:text-navy sm:block"><UserRound size={18} /></Link><button onClick={onCart} className="relative rounded-xl bg-navy px-3 py-2.5 text-white transition hover:bg-slate-800"><ShoppingBag size={18} /><span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[10px] font-bold">{count}</span></button><button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl p-2 text-navy lg:hidden"><Menu size={20} /></button></div></div>{mobileOpen && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">{navItems.map(([label, href]) => <Link onClick={() => setMobileOpen(false)} key={label} to={href} className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700">{label}</Link>)}</nav>}</header>
}
