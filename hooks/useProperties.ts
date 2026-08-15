'use client';

import {
  useGetProperties,
  useGetPropertyById,
  useCreateProperty,
  useUpdateProperty,
} from '@/hooks/api/useProperties';
import type { CreatePropertyInput, UpdatePropertyInput } from '@/types/property';

export {
  useGetProperties,
  useGetPropertyById,
  useCreateProperty,
  useUpdateProperty,
};

export function useProperties() {
  const query = useGetProperties();
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    create: (input: CreatePropertyInput) => createMutation.mutateAsync(input),
    update: (id: number | string, input: UpdatePropertyInput) =>
      updateMutation.mutateAsync({ id, data: input }),
  };
}
