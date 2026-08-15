'use client';

import {
  useGetReports,
  useGetReportById,
  useCreateReport,
  useUpdateReport,
} from '@/hooks/api/useReports';
import type { CreateReportInput, UpdateReportInput } from '@/types/report';

export {
  useGetReports,
  useGetReportById,
  useCreateReport,
  useUpdateReport,
};

export function useReports() {
  const query = useGetReports();
  const createMutation = useCreateReport();
  const updateMutation = useUpdateReport();

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    create: (input: CreateReportInput) => createMutation.mutateAsync(input),
    update: (id: number | string, input: UpdateReportInput) =>
      updateMutation.mutateAsync({ id, data: input }),
  };
}
