'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { reportService } from '@/lib/api/services/report.service';
import { reportKeys } from '@/lib/api/query-keys';
import type { Report, CreateReportInput, UpdateReportInput } from '@/types/report';

/**
 * Hook to fetch all reports
 * GET /api/v1/reports
 */
export function useGetReports(
  options?: Omit<UseQueryOptions<Report[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Report[], Error>({
    queryKey: reportKeys.lists(),
    queryFn: reportService.getReports,
    ...options,
  });
}

/**
 * Hook to fetch a report by ID
 * GET /api/v1/reports/:id
 */
export function useGetReportById(
  id: number | string | undefined | null,
  options?: Omit<UseQueryOptions<Report, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Report, Error>({
    queryKey: reportKeys.detail(id!),
    queryFn: () => reportService.getReportById(id!),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Hook to create a report
 * POST /api/v1/reports
 */
export function useCreateReport(
  options?: Omit<UseMutationOptions<Report, Error, CreateReportInput>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<Report, Error, CreateReportInput>({
    ...options,
    mutationFn: (payload: CreateReportInput) => reportService.createReport(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
}

/**
 * Hook to update a report
 * PATCH /api/v1/reports/:id
 */
export function useUpdateReport(
  options?: Omit<
    UseMutationOptions<Report, Error, { id: number | string; data: UpdateReportInput }>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Report, Error, { id: number | string; data: UpdateReportInput }>({
    ...options,
    mutationFn: ({ id, data }) => reportService.updateReport(id, data),
    onSuccess: async (data, variables, context, mutationContext) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reportKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: reportKeys.detail(variables.id) }),
      ]);
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}
