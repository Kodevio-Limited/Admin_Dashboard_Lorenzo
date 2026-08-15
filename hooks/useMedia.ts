'use client';

import {
  useGetMedia,
  useGetMediaById,
  useCreateMedia,
  useUpdateMedia,
  useDeleteMedia,
} from '@/hooks/api/useMedia';
import type { CreateMediaInput, UpdateMediaInput } from '@/types/media';

export {
  useGetMedia,
  useGetMediaById,
  useCreateMedia,
  useUpdateMedia,
  useDeleteMedia,
};

export function useMedia() {
  const query = useGetMedia();
  const createMutation = useCreateMedia();
  const updateMutation = useUpdateMedia();
  const deleteMutation = useDeleteMedia();

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    create: (input: CreateMediaInput) => createMutation.mutateAsync(input),
    update: (id: number | string, input: UpdateMediaInput) =>
      updateMutation.mutateAsync({ id, data: input }),
    remove: (id: number | string) => deleteMutation.mutateAsync(id),
  };
}
