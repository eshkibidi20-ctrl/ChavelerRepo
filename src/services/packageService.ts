import { apiRequest, getMockPackages, useMockData } from '@/services/apiClient';
import type { PagedResultDto, TourPackageDto } from '@/types/travel';
import { mockPackages } from '@/data/mockTravelData';

export async function getPackages(): Promise<PagedResultDto<TourPackageDto>> {
  // ASP.NET Endpoint: GET /api/packages
  return useMockData ? getMockPackages() : apiRequest<PagedResultDto<TourPackageDto>>('/packages');
}

export async function getPackageBySlug(slug: string): Promise<TourPackageDto | undefined> {
  // ASP.NET Endpoint: GET /api/packages/{slug}
  if (useMockData) return mockPackages.find((item) => item.slug === slug);
  return apiRequest<TourPackageDto>(`/packages/${slug}`);
}
