'use client';

import { useState, useCallback } from 'react';
import type { Media } from '@/types/media';
import { getMedia, createMedia, updateMedia } from '@/lib/mock-data/media';

export function useMedia() {
  const [data, setData] = useState<Media[]>(getMedia);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(() => {
    setData(getMedia());
  }, []);

  const create = useCallback(async (input: Omit<Media, 'id'>) => {
    setIsLoading(true);
    const media = createMedia(input);
    refresh();
    setIsLoading(false);
    return media;
  }, [refresh]);

  const update = useCallback(async (id: string, input: Omit<Media, 'id'>) => {
    setIsLoading(true);
    const media = updateMedia(id, input);
    refresh();
    setIsLoading(false);
    return media;
  }, [refresh]);

  return { data, isLoading, create, update };
}
