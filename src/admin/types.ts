export type AdminBookingStatus = 'Confirmed' | 'Pending Payment' | 'Needs Review' | 'Completed';
export type AdminPackageStatus = 'Published' | 'Draft';

export interface AdminBooking {
  id: string;
  referenceCode: string;
  traveler: string;
  email: string;
  packageTitle: string;
  destination: string;
  travelDate: string;
  guests: number;
  amount: number;
  status: AdminBookingStatus;
  createdAt: string;
}

export interface AdminPackage {
  id: string;
  title: string;
  destination: string;
  category: 'Domestic' | 'International' | 'Activities';
  duration: string;
  price: number;
  bookings: number;
  status: AdminPackageStatus;
  updatedAt: string;
}

export interface AdminVisaInquiry {
  id: string;
  traveler: string;
  country: string;
  email: string;
  submittedAt: string;
  status: 'New' | 'In Progress' | 'Completed';
  priority: 'High' | 'Normal';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Staff' | 'Viewer';
  status: 'Active' | 'Invited';
  lastActive: string;
}

export interface AdminDashboardData {
  totalRevenue: number;
  revenueChange: number;
  bookings: number;
  bookingsChange: number;
  pendingInquiries: number;
  activePackages: number;
  recentBookings: AdminBooking[];
  popularPackages: AdminPackage[];
}
