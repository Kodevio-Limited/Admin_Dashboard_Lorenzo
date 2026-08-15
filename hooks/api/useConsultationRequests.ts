'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { consultationRequestService, ConsultationRequest } from '@/lib/api/services/consultation-request.service';

/**
 * Hook to fetch all consultation / contact requests
 * GET /api/v1/consultation-requests
 */
export function useGetConsultationRequests(
  options?: Omit<UseQueryOptions<ConsultationRequest[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ConsultationRequest[], Error>({
    queryKey: ['consultation-requests'],
    queryFn: consultationRequestService.getConsultationRequests,
    ...options,
  });
}
