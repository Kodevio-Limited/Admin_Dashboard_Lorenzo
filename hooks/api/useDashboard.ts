'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { dashboardService, DashboardOverview } from '@/lib/api/services/dashboard.service';

/**
 * Hook to fetch dashboard overview metrics
 * GET /api/v1/dashboard/overview
 */
export function useGetOverview(
  options?: Omit<UseQueryOptions<DashboardOverview, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DashboardOverview, Error>({
    queryKey: ['dashboard', 'overview'],
    queryFn: dashboardService.getOverview,
    ...options,
  });
}
