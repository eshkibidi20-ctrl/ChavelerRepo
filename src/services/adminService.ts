import { adminBookings, adminDashboard, adminPackages, adminUsers, adminVisaInquiries } from '@/admin/mockAdminData';
import type { AdminBooking, AdminDashboardData, AdminPackage, AdminUser, AdminVisaInquiry } from '@/admin/types';

const wait = async <T,>(value: T): Promise<T> => {
  await new Promise((resolve) => window.setTimeout(resolve, 120));
  return value;
};

export function getAdminDashboard(): Promise<AdminDashboardData> {
  return wait(adminDashboard);
}

export function getAdminBookings(): Promise<AdminBooking[]> {
  return wait(adminBookings);
}

export function getAdminPackages(): Promise<AdminPackage[]> {
  return wait(adminPackages);
}

export function getAdminVisaInquiries(): Promise<AdminVisaInquiry[]> {
  return wait(adminVisaInquiries);
}

export function getAdminUsers(): Promise<AdminUser[]> {
  return wait(adminUsers);
}
