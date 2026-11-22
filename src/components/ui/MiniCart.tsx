import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const peso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);

export default function MiniCart({ onClose }: { onClose: () => void }) {
  const { items, total, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal">
              Your trip cart
            </div>
            <h2 className="mt-0.5 font-display text-2xl font-extrabold text-navy">
              Almost there.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close trip cart"
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-navy"
          >
            <X size={18} />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-6">
              {items.map((item) => {
                const lineTotal =
                  item.package.promoPrice * item.adults +
                  Math.round(item.package.promoPrice * 0.5) * item.children;

                return (
                  <div
                    className="flex gap-3.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-3"
                    key={item.id}
                  >
                    <img
                      src={item.package.imageUrl}
                      alt={item.package.title}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-navy">
                        {item.package.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.adults} adult{item.adults !== 1 ? 's' : ''}
                        {item.children > 0
                          ? `, ${item.children} child${item.children !== 1 ? 'ren' : ''}`
                          : ''}{' '}
                        · {item.travelDate}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="font-display text-sm font-extrabold text-navy">
                          {peso(lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 transition hover:text-coral"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Estimated total</span>
                <span className="font-display text-xl font-extrabold text-navy">
                  {peso(total)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-coral py-3.5 text-sm font-bold text-white shadow-lg shadow-coral/20 transition hover:bg-orange-600"
              >
                Continue to checkout <ArrowRight size={15} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={34} className="text-slate-300" />
            <p className="mt-4 font-display text-lg font-bold text-navy">Your cart is waiting</p>
            <p className="mt-1 text-sm text-slate-500">
              Add a trip you love and it will show up here.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/packages');
              }}
              className="mt-5 rounded-xl bg-navy px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              Explore trips
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}