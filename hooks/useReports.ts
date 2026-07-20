'use client';

import { useState, useCallback } from 'react';
import type { Report } from '@/types/report';
import { getReports, createReport, updateReport } from '@/lib/mock-data/reports';

export function useReports() {
  const [data, setData] = useState<Report[]>(getReports);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(() => {
    setData(getReports());
  }, []);

  const create = useCallback(async (input: Omit<Report, 'id'>) => {
    setIsLoading(true);
    const report = createReport(input);
    refresh();
    setIsLoading(false);
    return report;
  }, [refresh]);

  const update = useCallback(async (id: string, input: Omit<Report, 'id'>) => {
    setIsLoading(true);
    const report = updateReport(id, input);
    refresh();
    setIsLoading(false);
    return report;
  }, [refresh]);

  return { data, isLoading, create, update };
}
