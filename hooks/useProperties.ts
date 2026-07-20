'use client';

import { useState, useCallback } from 'react';
import type { Property } from '@/types/property';
import { getProperties, createProperty, updateProperty } from '@/lib/mock-data/properties';

export function useProperties() {
  const [data, setData] = useState<Property[]>(getProperties);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(() => {
    setData(getProperties());
  }, []);

  const create = useCallback(async (input: Omit<Property, 'id'>) => {
    setIsLoading(true);
    const property = createProperty(input);
    refresh();
    setIsLoading(false);
    return property;
  }, [refresh]);

  const update = useCallback(async (id: string, input: Omit<Property, 'id'>) => {
    setIsLoading(true);
    const property = updateProperty(id, input);
    refresh();
    setIsLoading(false);
    return property;
  }, [refresh]);

  return { data, isLoading, create, update };
}
