import { useState } from 'react';
import {
  ArrowRight,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Clock3,
  PackageOpen,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPackages, mockVisaCountries } from '@/data/mockTravelData';
import PackageCard from '@/components/ui/PackageCard';
import SectionTitle from '@/components/ui/SectionTitle';
import VisaModal from '@/components/ui/VisaModal';

interface HeroProps {
  onOpenVisa: () => void;
}

function Hero({ onOpenVisa }: HeroProps) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('All experiences');
  const [duration, setDuration] = useState('Any duration');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set('search', destination.trim());
    if (category !== 'All experiences') params.set('category', category);
    if (duration !== 'Any duration') params.set('duration', duration);
    const query = params.toString();
    navigate(`/packages${query ? `?${query}` : ''}`);
  };

  return (
    <section className="relative z-10 bg-navy">
      {/* Background image placed BEFORE gradient overlay so text contrast stays readable */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=90"
        className="absolute inset-0 h-full w-full object-cover"
        alt="Tropical Philippine coastline"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,.92)_0%,rgba(15,23,42,.68)_48%,rgba(15,23,42,.22)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-44 pt-24 sm:pb-36 lg:px-8 lg:pb-40 lg:pt-32">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-teal-100 backdrop-blur-sm">
            <Sparkles size={14} className="text-coral" /> Curated trips. Thoughtful details.
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Your next story
            <br />
            <span className="text-coral">starts here.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200">
            From hidden island gems to bucket-list escapes, we make every journey feel effortless,
            personal, and worth remembering.
          </p>

          {/* Interactive quick-filter pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate('/packages?category=Domestic')}
              className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Domestic packages
            </button>
            <button
              type="button"
              onClick={() => navigate('/packages?category=International')}
              className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              International tours
            </button>
            <button
              type="button"
              onClick={onOpenVisa}
              className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Visa assistance
            </button>
          </div>
        </div>
      </div>

      {/* Floating Search Form */}
      <form
        onSubmit={handleSearch}
        className="absolute inset-x-5 -bottom-24 z-20 mx-auto max-w-7xl sm:-bottom-12 lg:inset-x-8"
      >
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-navy/15 sm:p-4">
          <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_auto]">
            <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-teal">
              <MapPin size={19} className="shrink-0 text-teal" />
              <span className="flex-1">
                <small className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Where to?
                </small>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destination or experience"
                  className="w-full bg-transparent text-sm font-semibold text-navy outline-none placeholder:text-slate-400"
                />
              </span>
            </label>

            <label className="relative flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-teal">
              <PackageOpen size={18} className="shrink-0 text-teal" />
              <span className="flex-1">
                <small className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Explore
                </small>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-transparent pr-5 text-sm font-semibold text-navy outline-none"
                >
                  <option>All experiences</option>
                  <option>Domestic</option>
                  <option>International</option>
                  <option>Activities</option>
                </select>
              </span>
              <ChevronDown size={15} className="pointer-events-none text-slate-400" />
            </label>

            <label className="relative hidden items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-teal md:flex">
              <Clock3 size={18} className="shrink-0 text-teal" />
              <span className="flex-1">
                <small className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Duration
                </small>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full appearance-none bg-transparent pr-5 text-sm font-semibold text-navy outline-none"
                >
                  <option>Any duration</option>
                  <option>Day Tour</option>
                  <option>3D2N</option>
                  <option>4D3N</option>
                  <option>5D4N+</option>
                </select>
              </span>
              <ChevronDown size={15} className="pointer-events-none text-slate-400" />
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral/25 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Find trips <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    [
      '“The smoothest trip we have ever booked. Everything was clear, warm, and beautifully timed.”',
      'Mia & Paolo',
      'Bali Classic',
    ],
    [
      '“They found us a Coron package that felt custom-made without the custom-made price.”',
      'Carlo D.',
      'Coron Escapade',
    ],
    [
      '“Our visa was approved with zero guesswork. The checklist and reminders were a lifesaver.”',
      'Andrea R.',
      'Japan Visa Assistance',
    ],
  ];

  return (
    <section className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map(([quote, name, trip]) => (
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6" key={name}>
              <div>
                <div className="flex gap-0.5 text-coral">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-base font-semibold leading-relaxed text-navy">
                  {quote}
                </p>
              </div>
              <div className="mt-5 text-xs font-bold text-slate-500">
                {name} <span className="mx-1 text-slate-300">·</span> {trip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const [visaOpen, setVisaOpen] = useState(false);

  const pillars = [
    [
      '01',
      'Real people, real advice',
      'No copy-paste itineraries. Just honest recommendations from travelers who know the way.',
    ],
    [
      '02',
      'Flexible by design',
      'Plans that leave room for the unexpected, with responsive support whenever you need us.',
    ],
    [
      '03',
      'Protected from the start',
      'Transparent pricing, verified local partners, and clear inclusions on every booking.',
    ],
    [
      '04',
      'Seamless visa handling',
      'Step-by-step document reviews and embassy appointment guidance without the stress.',
    ],
  ];

  return (
    <>
      <Hero onOpenVisa={() => setVisaOpen(true)} />
      <main>
        {/* Extra top padding clears the floating hero search bar cleanly on both mobile & desktop */}
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:pt-28 lg:px-8">
          <SectionTitle
            eyebrow="Made for the moment"
            title="Find your kind of escape"
            action="View all packages"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mockPackages.slice(0, 4).map((item) => (
              <PackageCard item={item} key={item.id} />
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <SectionTitle
              eyebrow="Go a little further"
              title="International, made easy"
              action="Explore international"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {mockPackages
                .filter((item) => item.category === 'International')
                .map((item) => (
                  <PackageCard item={item} key={item.id} compact />
                ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionTitle
            eyebrow="One day, well spent"
            title="Small trips. Big memories."
            action="See day tours"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {mockPackages
              .filter((item) => item.category === 'Activities')
              .map((item) => (
                <PackageCard item={item} key={item.id} compact />
              ))}
          </div>
        </section>

        <section id="about" className="bg-navy">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8">
            <div>
              <div className="mb-3 text-xs font-extrabold uppercase tracking-[.18em] text-teal-300">
                Travel with confidence
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white">
                Your journey,
                <br />
                <span className="text-coral">our details.</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                Good travel planning is invisible. We take care of the little things, so you can
                stay present for the big ones.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                  <ShieldCheck size={16} className="text-teal-300" /> DOT-accredited partner
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                  <Heart size={15} className="text-coral" /> 4.9/5 guest rating
                </div>
              </div>
            </div>

            {/* 4 balanced pillars so the 2x2 grid has no awkward orphan card */}
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map(([num, title, body]) => (
                <div
                  key={num}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <span className="text-sm font-extrabold text-coral">{num}</span>
                  <h3 className="mt-6 font-display font-bold text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-teal">
                <span className="h-px w-6 bg-teal" /> Helpful, start to finish
              </div>
              <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                Visa assistance, without the guesswork
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setVisaOpen(true)}
              className="w-full rounded-xl bg-coral px-5 py-3 text-xs font-bold text-white shadow-md shadow-coral/20 transition hover:bg-orange-600 sm:w-auto"
            >
              Inquire about a visa
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {mockVisaCountries.map((country) => (
              <button
                type="button"
                onClick={() => setVisaOpen(true)}
                key={country.id}
                className={`rounded-2xl border border-slate-200/70 bg-gradient-to-br ${country.tone} p-4 text-left transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="text-2xl">{country.flag}</div>
                <div className="mt-5 text-sm font-bold text-navy">{country.country}</div>
                <div className="mt-1 text-[10px] font-semibold text-slate-500">
                  {country.processingDays}
                </div>
              </button>
            ))}
          </div>
        </section>

        <Testimonials />
      </main>
      {visaOpen && <VisaModal onClose={() => setVisaOpen(false)} />}
    </>
  );
}