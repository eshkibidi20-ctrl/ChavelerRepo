import type { AdminBooking, AdminDashboardData, AdminPackage, AdminUser, AdminVisaInquiry } from '@/admin/types';

export const adminBookings: AdminBooking[] = [
  { id: 'b-1001', referenceCode: 'CHV-261118-K8M4', traveler: 'Alex Santos', email: 'alex.santos@email.com', packageTitle: 'Bali Classic Fullboard', destination: 'Bali, Indonesia', travelDate: 'Oct 18–22, 2026', guests: 2, amount: 71800, status: 'Confirmed', createdAt: 'Nov 18, 2026' },
  { id: 'b-1002', referenceCode: 'CHV-261117-H2P9', traveler: 'Mia Dela Cruz', email: 'mia.delacruz@email.com', packageTitle: 'Puerto Princesa Free & Easy', destination: 'Palawan, Philippines', travelDate: 'Dec 04–06, 2026', guests: 3, amount: 26970, status: 'Pending Payment', createdAt: 'Nov 17, 2026' },
  { id: 'b-1003', referenceCode: 'CHV-261116-Q4N1', traveler: 'Carlo Reyes', email: 'carlo.reyes@email.com', packageTitle: 'Coron Island Escapade', destination: 'Coron, Philippines', travelDate: 'Jan 12–14, 2027', guests: 2, amount: 25800, status: 'Needs Review', createdAt: 'Nov 16, 2026' },
  { id: 'b-1004', referenceCode: 'CHV-261115-Z7L3', traveler: 'Andrea Ramos', email: 'andrea.ramos@email.com', packageTitle: 'Taipei & Jiufen Explorer', destination: 'Taipei, Taiwan', travelDate: 'Feb 02–05, 2027', guests: 1, amount: 29900, status: 'Confirmed', createdAt: 'Nov 15, 2026' },
  { id: 'b-1005', referenceCode: 'CHV-261110-B5R8', traveler: 'Paolo Lim', email: 'paolo.lim@email.com', packageTitle: 'Bohol Countryside & Panglao', destination: 'Bohol, Philippines', travelDate: 'Nov 28–30, 2026', guests: 4, amount: 42000, status: 'Completed', createdAt: 'Nov 10, 2026' },
];

export const adminPackages: AdminPackage[] = [
  { id: 'p-001', title: 'Bali Classic Fullboard', destination: 'Bali, Indonesia', category: 'International', duration: '5D / 4N', price: 35900, bookings: 46, status: 'Published', updatedAt: 'Nov 18, 2026' },
  { id: 'p-002', title: 'Puerto Princesa Free & Easy', destination: 'Palawan, Philippines', category: 'Domestic', duration: '3D / 2N', price: 8990, bookings: 38, status: 'Published', updatedAt: 'Nov 16, 2026' },
  { id: 'p-003', title: 'Coron Island Escapade', destination: 'Coron, Philippines', category: 'Domestic', duration: '3D / 2N', price: 12900, bookings: 31, status: 'Published', updatedAt: 'Nov 14, 2026' },
  { id: 'p-004', title: 'Taipei & Jiufen Explorer', destination: 'Taipei, Taiwan', category: 'International', duration: '4D / 3N', price: 29900, bookings: 27, status: 'Published', updatedAt: 'Nov 12, 2026' },
  { id: 'p-005', title: 'El Nido Tour A Island Hopping', destination: 'El Nido, Philippines', category: 'Activities', duration: '1 Day', price: 3900, bookings: 24, status: 'Draft', updatedAt: 'Nov 08, 2026' },
];

export const adminVisaInquiries: AdminVisaInquiry[] = [
  { id: 'v-001', traveler: 'Andrea Ramos', country: 'Japan', email: 'andrea.ramos@email.com', submittedAt: 'Nov 21, 2026', status: 'New', priority: 'High' },
  { id: 'v-002', traveler: 'Miguel Tan', country: 'Canada', email: 'miguel.tan@email.com', submittedAt: 'Nov 20, 2026', status: 'In Progress', priority: 'Normal' },
  { id: 'v-003', traveler: 'Sofia Cruz', country: 'Schengen Europe', email: 'sofia.cruz@email.com', submittedAt: 'Nov 19, 2026', status: 'In Progress', priority: 'High' },
  { id: 'v-004', traveler: 'Daniel Ong', country: 'South Korea', email: 'daniel.ong@email.com', submittedAt: 'Nov 18, 2026', status: 'Completed', priority: 'Normal' },
];

export const adminUsers: AdminUser[] = [
  { id: 'u-001', name: 'Alex Santos', email: 'alex.santos@email.com', role: 'Administrator', status: 'Active', lastActive: 'Just now' },
  { id: 'u-002', name: 'Mia Dela Cruz', email: 'mia.delacruz@email.com', role: 'Staff', status: 'Active', lastActive: '12 minutes ago' },
  { id: 'u-003', name: 'Carlo Reyes', email: 'carlo.reyes@email.com', role: 'Viewer', status: 'Invited', lastActive: 'Not yet active' },
];

export const adminDashboard: AdminDashboardData = {
  totalRevenue: 482650,
  revenueChange: 18.4,
  bookings: 128,
  bookingsChange: 12.8,
  pendingInquiries: 9,
  activePackages: 24,
  recentBookings: adminBookings,
  popularPackages: adminPackages.slice(0, 4),
};
