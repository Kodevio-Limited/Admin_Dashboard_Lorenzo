'use client';

import { useState, useCallback } from 'react';
import type { Client } from '@/types/client';
import { getClients, createClient, updateClient } from '@/lib/mock-data/clients';

export function useClients() {
  const [data, setData] = useState<Client[]>(getClients);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(() => {
    setData(getClients());
  }, []);

  const create = useCallback(async (input: Omit<Client, 'id'>) => {
    setIsLoading(true);
    const client = createClient(input);
    refresh();
    setIsLoading(false);
    return client;
  }, [refresh]);

  const update = useCallback(async (id: string, input: Omit<Client, 'id'>) => {
    setIsLoading(true);
    const client = updateClient(id, input);
    refresh();
    setIsLoading(false);
    return client;
  }, [refresh]);

  return { data, isLoading, create, update };
}
