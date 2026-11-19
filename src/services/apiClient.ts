import { mockPackages, mockVisaCountries } from '@/data/mockTravelData';
import type { PagedResultDto, TourPackageDto, VisaCountryDto } from '@/types/travel';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7001/api';
export const useMockData = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = '';
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options?.headers } });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export async function mockRequest<T>(value: T): Promise<T> {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  return value;
}

export async function getMockPackages(): Promise<PagedResultDto<TourPackageDto>> {
  return mockRequest({ items: mockPackages, totalCount: mockPackages.length, page: 1, pageSize: 50 });
}

export async function getMockVisaCountries(): Promise<VisaCountryDto[]> {
  return mockRequest(mockVisaCountries);
}
