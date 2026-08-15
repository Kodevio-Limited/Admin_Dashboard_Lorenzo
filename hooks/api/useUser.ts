'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { userService, UserProfile, UpdateUserProfileInput } from '@/lib/api/services/user.service';
import { userKeys } from '@/lib/api/query-keys';
import { useUIStore } from '@/store/uiStore';

/**
 * Hook to fetch self profile
 * GET /api/v1/users/me
 */
export function useGetSelfProfile(
  options?: Omit<UseQueryOptions<UserProfile, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<UserProfile, Error>({
    queryKey: userKeys.profile(),
    queryFn: userService.getSelfProfile,
    ...options,
  });
}

/**
 * Hook to update self profile
 * PATCH /api/v1/users/me
 */
export function useUpdateSelfProfile(
  options?: Omit<UseMutationOptions<UserProfile, Error, UpdateUserProfileInput>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation<UserProfile, Error, UpdateUserProfileInput>({
    ...options,
    mutationFn: (payload: UpdateUserProfileInput) => userService.updateSelfProfile(payload),
    onSuccess: async (data, variables, context, mutationContext) => {
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      addToast('Profile updated successfully', 'success');
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to update profile', 'error');
    },
  });
}
