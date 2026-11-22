// AdminSettings.tsx
import { useState, type FormEvent } from 'react';
import { Bell, Check, Globe2, LockKeyhole, Save, SlidersHorizontal } from 'lucide-react';

export default function AdminSettings() {
  const [tab, setTab] = useState<'General' | 'Notifications' | 'Security'>('General');
  const [paymentReview, setPaymentReview] = useState(true);
  const [inquiryAlerts, setInquiryAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.18em] text-teal">
            Workspace preferences
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy">Settings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep your team workspace aligned with the way you work.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-teal/10 px-3.5 py-2 text-xs font-bold text-teal">
            <Check size={14} /> Settings saved
          </span>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {[
            { id: 'General', icon: SlidersHorizontal },
            { id: 'Notifications', icon: Bell },
            { id: 'Security', icon: LockKeyhole },
          ].map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as 'General' | 'Notifications' | 'Security')}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold transition ${
                tab === id ? 'bg-navy text-white' : 'text-slate-500 hover:bg-white hover:text-navy'
              }`}
            >
              <Icon size={15} /> {id}
            </button>
          ))}
        </aside>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-teal">
                <Globe2 size={18} />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy">Business profile</h2>
                <p className="mt-1 text-xs text-slate-400">
                  The details your team sees across the workspace.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-600 sm:col-span-2">
                Business name
                <input
                  defaultValue="Chaveler Travel & Tours"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Support email
                <input
                  type="email"
                  defaultValue="hello@chaveler.ph"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Timezone
                <select
                  defaultValue="Asia/Manila"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                >
                  <option>Asia/Manila</option>
                  <option>Asia/Singapore</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-navy">Booking preferences</h2>
            <div className="mt-5 divide-y divide-slate-100">
              <div className="flex items-center justify-between gap-5 py-4 first:pt-0">
                <span>
                  <strong className="block text-sm text-navy">Require payment review</strong>
                  <small className="mt-1 block text-xs text-slate-400">
                    Keep new bookings pending until a teammate confirms payment.
                  </small>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={paymentReview}
                  onClick={() => setPaymentReview(!paymentReview)}
                  className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition ${
                    paymentReview ? 'justify-end bg-teal' : 'justify-start bg-slate-200'
                  }`}
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-5 py-4 last:pb-0">
                <span>
                  <strong className="block text-sm text-navy">Notify team of new inquiries</strong>
                  <small className="mt-1 block text-xs text-slate-400">
                    Send a notification when a visa request arrives.
                  </small>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={inquiryAlerts}
                  onClick={() => setInquiryAlerts(!inquiryAlerts)}
                  className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition ${
                    inquiryAlerts ? 'justify-end bg-teal' : 'justify-start bg-slate-200'
                  }`}
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-coral px-5 py-3 text-xs font-bold text-white shadow-lg shadow-coral/15 transition hover:bg-orange-600"
            >
              <Save size={15} /> Save changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}