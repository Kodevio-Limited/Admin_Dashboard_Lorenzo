'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { propertyService } from '@/lib/api/services/property.service';
import { propertyKeys } from '@/lib/api/query-keys';
import type {
  Property,
  CreatePropertyInput,
  UpdatePropertyInput,
} from '@/types/property';

/**
 * Hook to fetch all properties
 * GET /api/v1/properties
 */
export function useGetProperties(
  options?: Omit<UseQueryOptions<Property[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Property[], Error>({
    queryKey: propertyKeys.lists(),
    queryFn: propertyService.getProperties,
    ...options,
  });
}

/**
 * Hook to fetch property details by ID
 * GET /api/v1/properties/:id
 */
export function useGetPropertyById(
  id: number | string | undefined | null,
  options?: Omit<UseQueryOptions<Property, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Property, Error>({
    queryKey: propertyKeys.detail(id!),
    queryFn: () => propertyService.getPropertyById(id!),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Hook to create a new property
 * POST /api/v1/properties
 */
export function useCreateProperty(
  options?: Omit<
    UseMutationOptions<Property, Error, CreatePropertyInput>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Property, Error, CreatePropertyInput>({
    ...options,
    mutationFn: (payload: CreatePropertyInput) => propertyService.createProperty(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
}

/**
 * Hook to update property details
 * PATCH /api/v1/properties/:id
 */
export function useUpdateProperty(
  options?: Omit<
    UseMutationOptions<Property, Error, { id: number | string; data: UpdatePropertyInput }>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Property, Error, { id: number | string; data: UpdatePropertyInput }>({
    ...options,
    mutationFn: ({ id, data }: { id: number | string; data: UpdatePropertyInput }) =>
      propertyService.updateProperty(id, data),
    onSuccess: async (data, variables, context, mutationContext) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: propertyKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) }),
      ]);
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}
