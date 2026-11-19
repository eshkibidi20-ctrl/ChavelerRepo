export type PackageCategory = 'Domestic' | 'International' | 'Activities';

export interface ItineraryDayDto {
  day: number;
  title: string;
  activities: string[];
}

export interface TourPackageDto {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category: PackageCategory;
  duration: string;
  days: number;
  nights: number;
  regularPrice: number;
  promoPrice: number;
  discountPercent: number;
  imageUrl: string;
  tag: string;
  shortDescription: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDayDto[];
}

export interface VisaCountryDto {
  id: string;
  country: string;
  flag: string;
  processingDays: string;
  fee: number;
  documents: string[];
  tone: string;
}

export interface CartItemDto {
  id: string;
  package: TourPackageDto;
  travelDate: string;
  adults: number;
  children: number;
}

export interface CreateBookingRequestDto {
  leadTraveler: { name: string; email: string; phone: string };
  paymentMethod: string;
  items: CartItemDto[];
}

export interface BookingConfirmationDto {
  referenceCode: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending Payment';
  total: number;
}

export interface BookingDto {
  id: string;
  referenceCode: string;
  title: string;
  destination: string;
  date: string;
  amount: number;
  status: 'Confirmed' | 'Pending Payment' | 'Completed';
  imageUrl: string;
}

export interface VisaInquiryDto {
  country: string;
  name: string;
  email: string;
  travelDate: string;
}

export interface PagedResultDto<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}
