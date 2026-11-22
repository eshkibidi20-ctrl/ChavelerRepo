// AdminUsers.tsx
import { useEffect, useState } from 'react';
import { Mail, MoreHorizontal, ShieldCheck, UserPlus, Users as UsersIcon } from 'lucide-react';
import { getAdminUsers } from '@/services/adminService';
import type { AdminUser } from '@/admin/types';
import AdminStatusBadge from '@/components/ui/AdminStatusBadge';

export default function AdminUsers() {
  const [items, setItems] = useState<AdminUser[]>([]);

  useEffect(() => {
    void getAdminUsers().then(setItems);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.18em] text-teal">
            Workspace access
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy">Users &amp; access</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage the people who keep your travel desk moving.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 self-start rounded-xl bg-coral px-4 py-3 text-xs font-bold text-white shadow-lg shadow-coral/15 transition hover:bg-orange-600"
        >
          <UserPlus size={15} /> Invite teammate
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <UsersIcon size={19} className="text-teal" />
          <div className="mt-5 text-2xl font-extrabold text-navy">12</div>
          <div className="mt-1 text-xs text-slate-400">Team members</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <ShieldCheck size={19} className="text-coral" />
          <div className="mt-5 text-2xl font-extrabold text-navy">3</div>
          <div className="mt-1 text-xs text-slate-400">Access roles</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Mail size={19} className="text-blue-600" />
          <div className="mt-5 text-2xl font-extrabold text-navy">1</div>
          <div className="mt-1 text-xs text-slate-400">Pending invitation</div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-display text-lg font-bold text-navy">Team members</h2>
            <p className="mt-1 text-xs text-slate-400">
              Sample access list ready for live permissions
            </p>
          </div>
          <button
            type="button"
            aria-label="Team actions"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-50"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4">Member</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Last active</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((user) => (
                <tr className="text-xs transition hover:bg-slate-50/70" key={user.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-teal/10 text-xs font-extrabold text-teal">
                        {user.name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')}
                      </span>
                      <span>
                        <strong className="block text-navy">{user.name}</strong>
                        <small className="mt-1 block text-slate-400">{user.email}</small>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-600">{user.role}</td>
                  <td className="px-5 py-4">
                    <AdminStatusBadge value={user.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-500">{user.lastActive}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      aria-label={`Actions for ${user.name}`}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-50"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}