import { apiRequest, mockRequest, useMockData } from '@/services/apiClient';
import { mockBookings } from '@/data/mockTravelData';
import type { BookingConfirmationDto, BookingDto, CreateBookingRequestDto } from '@/types/travel';

export async function createBooking(request: CreateBookingRequestDto): Promise<BookingConfirmationDto> {
  // ASP.NET Endpoint: POST /api/bookings
  const total = request.items.reduce((sum, item) => sum + item.package.promoPrice * item.adults + item.package.promoPrice * 0.5 * item.children, 0);
  const confirmation: BookingConfirmationDto = { referenceCode: `CHV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'Pending Payment', total };
  return useMockData ? mockRequest(confirmation) : apiRequest<BookingConfirmationDto>('/bookings', { method: 'POST', body: JSON.stringify(request) });
}

export async function getMyBookings(): Promise<BookingDto[]> {
  // ASP.NET Endpoint: GET /api/bookings/me
  return useMockData ? mockRequest(mockBookings) : apiRequest<BookingDto[]>('/bookings/me');
}
