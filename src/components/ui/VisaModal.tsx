import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronDown, X } from 'lucide-react';
import { mockVisaCountries } from '@/data/mockTravelData';

export default function VisaModal({
  onClose,
  initialCountry,
}: {
  onClose: () => void;
  initialCountry?: string;
}) {
  const [country, setCountry] = useState(
    initialCountry ?? mockVisaCountries[0]?.country ?? 'Japan',
  );
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect to POST /api/visa-inquiries
    setSubmitted(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal">
              Visa concierge
            </div>
            <h2 className="mt-1.5 font-display text-2xl font-extrabold text-navy">
              Let’s make it simple.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close visa modal"
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-navy"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/10 text-teal">
              <Check size={24} />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-navy">Inquiry received</h3>
            <p className="mt-2 text-sm text-slate-500">
              Our visa team will send your <span className="font-semibold text-navy">{country}</span>{' '}
              checklist within one business day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-xs font-bold text-slate-600">
              Destination
              <div className="relative mt-2">
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold text-navy outline-none focus:border-teal"
                >
                  {mockVisaCountries.map((item) => (
                    <option key={item.id} value={item.country}>
                      {item.flag} {item.country}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>

            <label className="block text-xs font-bold text-slate-600">
              Full name
              <input
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                placeholder="Juan Dela Cruz"
              />
            </label>

            <label className="block text-xs font-bold text-slate-600">
              Email address
              <input
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                placeholder="you@example.com"
              />
            </label>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-3.5 text-sm font-bold text-white shadow-lg shadow-coral/20 transition hover:bg-orange-600"
            >
              Get my visa checklist <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}