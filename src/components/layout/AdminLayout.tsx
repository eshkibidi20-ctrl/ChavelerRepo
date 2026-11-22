import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bell, ChevronDown, Menu, PanelLeftClose, PanelLeftOpen, Plane, Search, X } from 'lucide-react';

const navigation = [
  { label: 'Overview', to: '/admin' },
  { label: 'Bookings', to: '/admin/bookings', badge: '5' },
  { label: 'Packages', to: '/admin/packages' },
  { label: 'Visa inquiries', to: '/admin/visa-inquiries', badge: '9' },
  { label: 'Users & access', to: '/admin/users' },
  { label: 'Settings', to: '/admin/settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-navy">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-[84px]' : ''}`}>
        <div className={`flex h-[76px] items-center border-b border-slate-100 px-5 ${collapsed ? 'justify-center lg:px-3' : 'justify-between'}`}>
          <Link to="/admin" className={`flex items-center gap-3 ${collapsed ? 'lg:hidden' : ''}`}><span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white"><Plane size={19} /></span><span><strong className="block font-display text-sm font-extrabold tracking-tight">CHAVELER<span className="text-coral">.</span></strong><small className="text-[9px] font-bold uppercase tracking-[.2em] text-slate-400">Admin desk</small></span></Link>
          {collapsed && <Link to="/admin" className="hidden lg:grid"><span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white"><Plane size={19} /></span></Link>}
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-6">
          {!collapsed && <div className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Workspace</div>}
          <nav className="space-y-1">{navigation.map((item) => <NavLink onClick={() => setSidebarOpen(false)} key={item.to} to={item.to} end={item.to === '/admin'} className={({ isActive }) => `group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-navy text-white shadow-lg shadow-navy/15' : 'text-slate-500 hover:bg-slate-50 hover:text-navy'} ${collapsed ? 'lg:justify-center' : ''}`}><span className="flex items-center gap-3"><span className={`grid h-7 w-7 place-items-center rounded-lg text-[10px] font-extrabold ${collapsed ? 'bg-slate-100 text-slate-500' : 'bg-white/10'}`}>{item.label.slice(0, 1)}</span><span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span></span>{item.badge && <span className={`rounded-full px-2 py-0.5 text-[10px] ${collapsed ? 'lg:hidden' : ''} ${item.label === 'Visa inquiries' ? 'bg-coral text-white' : 'bg-slate-100 text-slate-500'}`}>{item.badge}</span>}</NavLink>)}</nav>
          {!collapsed && <div className="mt-10 rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-teal">Backend ready</div><p className="mt-2 text-xs leading-relaxed text-slate-500">These screens are using sample data while your live admin connection is prepared.</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-2/3 rounded-full bg-teal" /></div></div>}
        </div>
        <div className="border-t border-slate-100 p-3"><button onClick={() => setCollapsed(!collapsed)} className="hidden w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 lg:flex">{collapsed ? <PanelLeftOpen size={16} /> : <><PanelLeftClose size={16} /> Collapse menu</>}</button></div>
      </aside>
      {sidebarOpen && <button aria-label="Close menu" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-navy/30 lg:hidden" />}
      <div className={`transition-[padding] lg:pl-[260px] ${collapsed ? 'lg:pl-[84px]' : ''}`}>
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl lg:px-8"><div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(true)} className="rounded-xl p-2 text-navy hover:bg-slate-50 lg:hidden"><Menu size={21} /></button><div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-400 sm:flex"><Search size={16} /><span>Search anything</span><span className="ml-8 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400">⌘ K</span></div></div><div className="flex items-center gap-3"><button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-50"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-coral" /></button><div className="hidden h-7 w-px bg-slate-200 sm:block" /><button className="flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-slate-50"><span className="grid h-8 w-8 place-items-center rounded-full bg-teal/15 text-xs font-extrabold text-teal">AS</span><span className="hidden text-left sm:block"><strong className="block text-xs font-bold text-navy">Alex Santos</strong><small className="block text-[10px] text-slate-400">Administrator</small></span><ChevronDown size={14} className="hidden text-slate-400 sm:block" /></button></div></header>
        <main className="mx-auto max-w-[1440px] p-5 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
