'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { clientService } from '@/lib/api/services/client.service';
import { clientKeys } from '@/lib/api/query-keys';
import type {
  Client,
  CreateClientInput,
  UpdateClientInput,
} from '@/types/client';

/**
 * Hook to fetch all clients
 * GET /api/v1/clients
 */
export function useGetClients(
  options?: Omit<UseQueryOptions<Client[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Client[], Error>({
    queryKey: clientKeys.lists(),
    queryFn: clientService.getClients,
    ...options,
  });
}

/**
 * Hook to fetch a single client by ID
 * GET /api/v1/clients/:id
 */
export function useGetClientById(
  id: number | string | undefined | null,
  options?: Omit<UseQueryOptions<Client, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Client, Error>({
    queryKey: clientKeys.detail(id!),
    queryFn: () => clientService.getClientById(id!),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Hook to create a new client
 * POST /api/v1/clients
 */
export function useCreateClient(
  options?: Omit<
    UseMutationOptions<Client, Error, CreateClientInput>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Client, Error, CreateClientInput>({
    ...options,
    mutationFn: (payload: CreateClientInput) => clientService.createClient(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
}

/**
 * Hook to update an existing client
 * PATCH /api/v1/clients/:id
 */
export function useUpdateClient(
  options?: Omit<
    UseMutationOptions<Client, Error, { id: number | string; data: UpdateClientInput }>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Client, Error, { id: number | string; data: UpdateClientInput }>({
    ...options,
    mutationFn: ({ id, data }: { id: number | string; data: UpdateClientInput }) =>
      clientService.updateClient(id, data),
    onSuccess: async (data, variables, context, mutationContext) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: clientKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: clientKeys.detail(variables.id) }),
      ]);
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}
