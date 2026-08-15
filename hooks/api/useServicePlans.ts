'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import {
  servicePlanService,
  ServicePlan,
  CreateServicePlanInput,
  UpdateServicePlanInput,
} from '@/lib/api/services/service-plan.service';
import { servicePlanKeys } from '@/lib/api/query-keys';

/**
 * Hook to fetch all service plans
 * GET /api/v1/service-plans
 */
export function useGetServicePlans(
  options?: Omit<UseQueryOptions<ServicePlan[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ServicePlan[], Error>({
    queryKey: servicePlanKeys.all,
    queryFn: servicePlanService.getServicePlans,
    ...options,
  });
}

/**
 * Hook to fetch a single service plan by ID
 * GET /api/v1/service-plans/:id
 */
export function useGetServicePlanById(
  id: number | undefined | null,
  options?: Omit<UseQueryOptions<ServicePlan, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ServicePlan, Error>({
    queryKey: servicePlanKeys.detail(id!),
    queryFn: () => servicePlanService.getServicePlanById(id!),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Hook to create a service plan
 * POST /api/v1/service-plans
 */
export function useCreateServicePlan(
  options?: Omit<UseMutationOptions<ServicePlan, Error, CreateServicePlanInput>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<ServicePlan, Error, CreateServicePlanInput>({
    ...options,
    mutationFn: (payload: CreateServicePlanInput) => servicePlanService.createServicePlan(payload),
    onSuccess: async (data, variables, context, mutationContext) => {
      await queryClient.invalidateQueries({ queryKey: servicePlanKeys.all });
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}

/**
 * Hook to update a service plan
 * PATCH /api/v1/service-plans/:id
 */
export function useUpdateServicePlan(
  options?: Omit<
    UseMutationOptions<ServicePlan, Error, { id: number; data: UpdateServicePlanInput }>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<ServicePlan, Error, { id: number; data: UpdateServicePlanInput }>({
    ...options,
    mutationFn: ({ id, data }) => servicePlanService.updateServicePlan(id, data),
    onSuccess: async (data, variables, context, mutationContext) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: servicePlanKeys.all }),
        queryClient.invalidateQueries({ queryKey: servicePlanKeys.detail(variables.id) }),
      ]);
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}

