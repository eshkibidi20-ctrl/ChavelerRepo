import { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Landing from '@/pages/Landing';
import Packages from '@/pages/Packages';
import PackageDetails from '@/pages/PackageDetails';
import VisaAssistance from '@/pages/VisaAssistance';
import Checkout from '@/pages/Checkout';
import Account from '@/pages/Account';
import MiniCart from '@/components/ui/MiniCart';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminBookings from '@/pages/admin/Bookings';
import AdminPackages from '@/pages/admin/Packages';
import AdminVisaInquiries from '@/pages/admin/VisaInquiries';
import AdminUsers from '@/pages/admin/Users';
import AdminSettings from '@/pages/admin/Settings';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function StorefrontLayout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onCart={() => setCartOpen(true)} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      {cartOpen && <MiniCart onClose={() => setCartOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Storefront Routes (with Navbar + Footer) */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:slug" element={<PackageDetails />} />
            <Route path="/visa-assistance" element={<VisaAssistance />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Landing />} />
          </Route>

          {/* Admin Workspace Routes (standalone AdminLayout only) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="visa-inquiries" element={<AdminVisaInquiries />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}