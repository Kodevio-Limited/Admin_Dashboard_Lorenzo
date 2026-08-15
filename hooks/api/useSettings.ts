'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import {
  settingsService,
  SettingsPrivacyPolicy,
  SettingsTermsConditions,
} from '@/lib/api/services/settings.service';
import { useUIStore } from '@/store/uiStore';

/**
 * Hook to fetch Privacy Policy
 * GET /api/v1/settings/privacy-policy
 */
export function useGetPrivacyPolicy(
  options?: Omit<UseQueryOptions<SettingsPrivacyPolicy, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<SettingsPrivacyPolicy, Error>({
    queryKey: ['settings', 'privacy-policy'],
    queryFn: settingsService.getPrivacyPolicy,
    ...options,
  });
}

/**
 * Hook to update Privacy Policy
 * PUT /api/v1/settings/privacy-policy
 */
export function useUpdatePrivacyPolicy(
  options?: Omit<UseMutationOptions<SettingsPrivacyPolicy, Error, string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation<SettingsPrivacyPolicy, Error, string>({
    ...options,
    mutationFn: (value: string) => settingsService.updatePrivacyPolicy(value),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['settings', 'privacy-policy'] });
      addToast('Privacy policy updated successfully', 'success');
      options?.onSuccess?.(...args);
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to update privacy policy', 'error');
    },
  });
}

/**
 * Hook to fetch Terms & Conditions
 * GET /api/v1/settings/terms-and-conditions
 */
export function useGetTermsAndConditions(
  options?: Omit<UseQueryOptions<SettingsTermsConditions, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<SettingsTermsConditions, Error>({
    queryKey: ['settings', 'terms-and-conditions'],
    queryFn: settingsService.getTermsAndConditions,
    ...options,
  });
}

/**
 * Hook to update Terms & Conditions
 * PUT /api/v1/settings/terms-and-conditions
 */
export function useUpdateTermsAndConditions(
  options?: Omit<UseMutationOptions<SettingsTermsConditions, Error, string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((s) => s.addToast);

  return useMutation<SettingsTermsConditions, Error, string>({
    ...options,
    mutationFn: (content: string) => settingsService.updateTermsAndConditions(content),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['settings', 'terms-and-conditions'] });
      addToast('Terms and conditions updated successfully', 'success');
      options?.onSuccess?.(...args);
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to update terms and conditions', 'error');
    },
  });
}
