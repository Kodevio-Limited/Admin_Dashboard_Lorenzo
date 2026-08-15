import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export interface DashboardOverview {
  totalClients: number;
  totalProperties: number;
  totalReports: number;
  upComingVisits: number;
}

export const dashboardService = {
  /**
   * Fetch Dashboard Overview metrics
   * GET /api/v1/dashboard/overview
   * Role: ADMIN
   */
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await apiClient.get<ApiResponse<DashboardOverview>>('/dashboard/overview');
    return response.data.data;
  },
};
