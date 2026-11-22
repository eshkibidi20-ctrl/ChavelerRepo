import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Brand from '@/components/layout/Brand';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    // TODO: Connect to POST /api/newsletter
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-slate-200 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-500">
            Thoughtful trips for curious people. Based in the Philippines, open to the world.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">Explore</h4>
          <div className="mt-4 space-y-3 text-xs font-semibold text-slate-500">
            <Link className="block rounded transition hover:text-teal focus-ring" to="/packages">
              All packages
            </Link>
            <Link
              className="block rounded transition hover:text-teal focus-ring"
              to="/visa-assistance"
            >
              Visa assistance
            </Link>
            <Link className="block rounded transition hover:text-teal focus-ring" to="/account">
              My bookings
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">Talk to us</h4>
          <div className="mt-4 space-y-3 text-xs text-slate-500">
            <p>hello@chaveler.ph</p>
            <p>+63 917 822 4488</p>
            <p>Mon–Sat, 9:00 AM–6:00 PM</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">
            Stay in the loop
          </h4>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            New destinations, smart tips, and member-only offers.
          </p>
          {subscribed ? (
            <div className="mt-3 rounded-xl border border-teal/20 bg-teal/10 p-3 text-xs">
              <p className="font-bold text-teal">You’re on the list — watch for upcoming deals!</p>
              <button
                type="button"
                onClick={() => setSubscribed(false)}
                className="mt-1.5 text-[11px] font-semibold text-slate-600 underline hover:text-navy"
              >
                Add another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-3 flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address for newsletter"
                className="min-w-0 flex-1 rounded-l-xl border border-slate-200 bg-white px-3 py-2 text-xs text-navy outline-none transition focus:border-teal"
              />
              <button
                type="submit"
                className="rounded-r-xl bg-teal px-3.5 text-xs font-bold text-white transition hover:bg-teal-700 focus-ring"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 px-5 py-4 text-center text-[10px] font-semibold text-slate-400">
        © 2026 Chaveler Travel &amp; Tours <span className="mx-2">·</span>{' '}
        <span className="text-teal">Demo mode</span>
      </div>
    </footer>
  );
}