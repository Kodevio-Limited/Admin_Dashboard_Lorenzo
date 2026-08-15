'use client';

import {
  useGetClients,
  useGetClientById,
  useCreateClient,
  useUpdateClient,
} from '@/hooks/api/useClients';
import type { CreateClientInput, UpdateClientInput } from '@/types/client';

export {
  useGetClients,
  useGetClientById,
  useCreateClient,
  useUpdateClient,
};

export function useClients() {
  const query = useGetClients();
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    create: (input: CreateClientInput) => createMutation.mutateAsync(input),
    update: (id: number | string, input: UpdateClientInput) =>
      updateMutation.mutateAsync({ id, data: input }),
  };
}
