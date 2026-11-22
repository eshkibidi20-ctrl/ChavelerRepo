import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { useState } from 'react';

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);
  return <>
    <Navbar onCart={() => setCartOpen(true)} />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/packages/:slug" element={<PackageDetails />} />
      <Route path="/visa-assistance" element={<VisaAssistance />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="visa-inquiries" element={<AdminVisaInquiries />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
    <Footer />
    {cartOpen && <MiniCart onClose={() => setCartOpen(false)} />}
  </>;
}

export default function App() {
  return <BrowserRouter><CartProvider><AppShell /></CartProvider></BrowserRouter>;
}
