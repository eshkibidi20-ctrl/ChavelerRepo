import { useState, type FormEvent } from 'react';
import { Check, ShieldCheck, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { createBooking } from '@/services/bookingService';
import type { BookingConfirmationDto } from '@/types/travel';

const peso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);

const PAYMENT_OPTIONS = [
  { id: 'GCash', subtitle: 'Instant e-wallet transfer' },
  { id: 'Maya', subtitle: 'QR / mobile wallet' },
  { id: 'BDO / BPI Bank Transfer', subtitle: 'Online bank deposit' },
  { id: 'Credit / Debit Card', subtitle: 'Visa, Mastercard, JCB' },
] as const;

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [confirmation, setConfirmation] = useState<BookingConfirmationDto | null>(null);
  const [payment, setPayment] = useState<string>('GCash');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const result = await createBooking({
      leadTraveler: {
        name: String(form.get('name') ?? '').trim(),
        email: String(form.get('email') ?? '').trim(),
        phone: String(form.get('phone') ?? '').trim(),
      },
      paymentMethod: payment,
      items,
    });
    setConfirmation(result);
    clear();
    setSubmitting(false);
  };

  if (confirmation) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-teal">
          <Check size={28} />
        </div>
        <div className="mt-6 text-xs font-extrabold uppercase tracking-[.18em] text-teal">
          Booking received
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          You’re going places.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          Your trip is reserved. We’ll send your itinerary voucher and payment instructions to your
          email shortly.
        </p>
        <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Reference code</span>
            <span className="font-mono font-extrabold text-navy">{confirmation.referenceCode}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Payment method</span>
            <span className="font-bold text-navy">{payment}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Total amount</span>
            <span className="font-extrabold text-navy">{peso(confirmation.total)}</span>
          </div>
          <div className="rounded-xl bg-amber-50 p-3 text-xs font-semibold text-amber-800">
            Status: {confirmation.status}. A Chaveler coordinator will verify your {payment} payment
            shortly.
          </div>
        </div>
        <Link
          to="/account"
          className="mt-7 inline-flex rounded-xl bg-navy px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          View my bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="max-w-2xl">
        <div className="text-xs font-extrabold uppercase tracking-[.18em] text-teal">
          Secure checkout
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Make it official.
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-20 text-center">
          <Ticket className="mx-auto text-slate-300" size={38} />
          <p className="mt-4 font-display text-lg font-bold text-navy">Nothing to check out yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Add a tour package or day activity to your trip cart first.
          </p>
          <Link
            to="/packages"
            className="mt-5 inline-block rounded-xl bg-navy px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Find a trip
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_390px]">
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold text-navy">Lead traveler details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold text-slate-600 sm:col-span-2">
                  Full name
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                    placeholder="Juan Dela Cruz"
                  />
                </label>
                <label className="text-xs font-bold text-slate-600">
                  Email address
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                    placeholder="juan@email.com"
                  />
                </label>
                <label className="text-xs font-bold text-slate-600">
                  Mobile number
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-navy outline-none focus:border-teal"
                    placeholder="+63 917 000 0000"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold text-navy">Choose payment option</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {PAYMENT_OPTIONS.map((option) => (
                  <button
                    type="button"
                    onClick={() => setPayment(option.id)}
                    key={option.id}
                    className={`rounded-xl border p-4 text-left text-sm font-bold transition ${
                      payment === option.id
                        ? 'border-teal bg-teal/5 text-teal ring-1 ring-teal'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.id}</span>
                      {payment === option.id && <Check size={16} />}
                    </div>
                    <span className="mt-1 block text-[11px] font-normal text-slate-400">
                      {option.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-bold text-navy">Your trip summary</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {items.map((item) => {
                const lineSubtotal =
                  item.package.promoPrice * item.adults +
                  Math.round(item.package.promoPrice * 0.5) * item.children;

                return (
                  <div className="flex gap-3 py-3 first:pt-0 last:pb-0" key={item.id}>
                    <img
                      src={item.package.imageUrl}
                      alt={item.package.title}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-navy">{item.package.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.adults} {item.adults === 1 ? 'adult' : 'adults'}
                        {item.children > 0
                          ? `, ${item.children} ${item.children === 1 ? 'child' : 'children'}`
                          : ''}{' '}
                        · {item.travelDate}
                      </p>
                      <p className="mt-1 text-xs font-bold text-teal">{peso(lineSubtotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <span className="text-sm font-semibold text-slate-500">Total due</span>
              <span className="font-display text-xl font-extrabold text-navy">{peso(total)}</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full rounded-xl bg-coral py-3.5 text-sm font-bold text-white shadow-lg shadow-coral/20 transition hover:bg-orange-600 disabled:opacity-60"
            >
              {submitting ? 'Confirming booking...' : 'Confirm my booking'}
            </button>
            <p className="mt-4 text-center text-[10px] text-slate-400">
              <ShieldCheck size={12} className="mr-1 inline text-teal" /> Your details are kept safe
            </p>
          </aside>
        </form>
      )}
    </div>
  );
}