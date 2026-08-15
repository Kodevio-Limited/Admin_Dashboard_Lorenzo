'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { mediaService } from '@/lib/api/services/media.service';
import { mediaKeys } from '@/lib/api/query-keys';
import type { Media, CreateMediaInput, UpdateMediaInput } from '@/types/media';

/**
 * Hook to fetch all media
 * GET /api/v1/media
 */
export function useGetMedia(
  options?: Omit<UseQueryOptions<Media[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Media[], Error>({
    queryKey: mediaKeys.lists(),
    queryFn: mediaService.getMedia,
    ...options,
  });
}

/**
 * Hook to fetch media by ID
 * GET /api/v1/media/:id
 */
export function useGetMediaById(
  id: number | string | undefined | null,
  options?: Omit<UseQueryOptions<Media, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Media, Error>({
    queryKey: mediaKeys.detail(id!),
    queryFn: () => mediaService.getMediaById(id!),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Hook to create media
 * POST /api/v1/media
 */
export function useCreateMedia(
  options?: Omit<UseMutationOptions<Media, Error, CreateMediaInput>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<Media, Error, CreateMediaInput>({
    ...options,
    mutationFn: (payload: CreateMediaInput) => mediaService.createMedia(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
}

/**
 * Hook to update media
 * PATCH /api/v1/media/:id
 */
export function useUpdateMedia(
  options?: Omit<
    UseMutationOptions<Media, Error, { id: number | string; data: UpdateMediaInput }>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Media, Error, { id: number | string; data: UpdateMediaInput }>({
    ...options,
    mutationFn: ({ id, data }) => mediaService.updateMedia(id, data),
    onSuccess: async (data, variables, context, mutationContext) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: mediaKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: mediaKeys.detail(variables.id) }),
      ]);
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}

/**
 * Hook to delete media
 * DELETE /api/v1/media/:id
 */
export function useDeleteMedia(
  options?: Omit<UseMutationOptions<void, Error, number | string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number | string>({
    ...options,
    mutationFn: (id: number | string) => mediaService.deleteMedia(id),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
}
