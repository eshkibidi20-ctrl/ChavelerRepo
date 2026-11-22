import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, CheckCircle2, X } from 'lucide-react';
import { mockVisaCountries } from '@/data/mockTravelData';
import type { VisaCountryDto } from '@/types/travel';

const peso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);

export default function VisaAssistance() {
  const [selected, setSelected] = useState<VisaCountryDto | null>(null);
  const [step, setStep] = useState<'checklist' | 'form' | 'submitted'>('checklist');

  const openCountry = (country: VisaCountryDto) => {
    setSelected(country);
    setStep('checklist');
  };

  const closeModal = () => {
    setSelected(null);
    setStep('checklist');
  };

  const handleInquirySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to POST /api/visa-inquiries
    setStep('submitted');
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs font-extrabold uppercase tracking-[.18em] text-teal">
          Visa concierge
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Go further, with less paperwork.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          A little guidance goes a long way. Get a clear checklist, realistic timelines, and a
          partner who keeps you moving.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockVisaCountries.map((country) => (
          <button
            type="button"
            onClick={() => openCountry(country)}
            key={country.id}
            className={`group rounded-2xl border border-slate-200 bg-gradient-to-br ${country.tone} p-5 text-left transition hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{country.flag}</span>
              <span className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold text-teal shadow-xs">
                {country.processingDays}
              </span>
            </div>
            <h2 className="mt-8 font-display text-lg font-bold text-navy">{country.country}</h2>
            <p className="mt-1 text-xs text-slate-600">
              Assistance fee from <span className="font-bold text-navy">{peso(country.fee)}</span>
            </p>
            <span className="mt-5 flex items-center gap-1 text-xs font-bold text-navy group-hover:text-teal">
              See requirements <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-3xl">{selected.flag}</div>
                <h2 className="mt-3 font-display text-2xl font-extrabold text-navy">
                  {selected.country} Visa
                </h2>
                <p className="mt-1 text-xs font-semibold text-teal">
                  Typical processing: {selected.processingDays} · Fee: {peso(selected.fee)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-navy"
              >
                <X size={18} />
              </button>
            </div>

            {step === 'checklist' && (
              <>
                <h3 className="mt-7 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Prepare these documents
                </h3>
                <ul className="mt-4 space-y-3">
                  {selected.documents.map((doc) => (
                    <li className="flex items-start gap-3 text-sm text-slate-600" key={doc}>
                      <Check size={17} className="mt-0.5 shrink-0 text-teal" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="mt-8 w-full rounded-xl bg-coral py-3.5 text-sm font-bold text-white shadow-lg shadow-coral/20 transition hover:bg-orange-600"
                >
                  Start my visa inquiry
                </button>
              </>
            )}

            {step === 'form' && (
              <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                <label className="block text-xs font-bold text-slate-600">
                  Full name
                  <input
                    required
                    placeholder="Juan Dela Cruz"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-xs font-bold text-slate-600">
                    Email address
                    <input
                      type="email"
                      required
                      placeholder="juan@email.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                    />
                  </label>
                  <label className="block text-xs font-bold text-slate-600">
                    Mobile number
                    <input
                      required
                      placeholder="+63 917 000 0000"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                    />
                  </label>
                </div>
                <label className="block text-xs font-bold text-slate-600">
                  Target travel month
                  <input
                    type="month"
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-teal"
                  />
                </label>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('checklist')}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 hover:border-navy hover:text-navy"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-coral py-3 text-sm font-bold text-white shadow-lg shadow-coral/20 hover:bg-orange-600"
                  >
                    Submit inquiry
                  </button>
                </div>
              </form>
            )}

            {step === 'submitted' && (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/10 text-teal">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-navy">
                  Inquiry received!
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  A Chaveler visa specialist will reach out within 24 hours with your{' '}
                  <span className="font-semibold text-navy">{selected.country}</span> checklist.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 rounded-xl bg-navy px-6 py-3 text-xs font-bold text-white"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}