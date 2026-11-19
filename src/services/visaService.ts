import { apiRequest, getMockVisaCountries, useMockData, mockRequest } from '@/services/apiClient';
import type { VisaCountryDto, VisaInquiryDto } from '@/types/travel';

export async function getVisaCountries(): Promise<VisaCountryDto[]> {
  // ASP.NET Endpoint: GET /api/visa/countries
  return useMockData ? getMockVisaCountries() : apiRequest<VisaCountryDto[]>('/visa/countries');
}

export async function submitVisaInquiry(inquiry: VisaInquiryDto): Promise<{ success: boolean }> {
  // ASP.NET Endpoint: POST /api/visa/inquiries
  return useMockData ? mockRequest({ success: true }) : apiRequest<{ success: boolean }>('/visa/inquiries', { method: 'POST', body: JSON.stringify(inquiry) });
}
