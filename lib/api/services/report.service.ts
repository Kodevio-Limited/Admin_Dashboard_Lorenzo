import { apiClient } from '@/lib/api/axios';
import type { Report, CreateReportInput, UpdateReportInput } from '@/types/report';
import type { ApiResponse } from '@/types/client';

export const reportService = {
  /**
   * Fetch all reports
   * GET /api/v1/reports
   */
  getReports: async (): Promise<Report[]> => {
    const response = await apiClient.get<ApiResponse<Report[]>>('/reports');
    return response.data.data;
  },

  /**
   * Fetch report details by ID
   * GET /api/v1/reports/:id
   */
  getReportById: async (id: number | string): Promise<Report> => {
    const response = await apiClient.get<ApiResponse<Report>>(`/reports/${id}`);
    return response.data.data;
  },

  /**
   * Create report
   * POST /api/v1/reports
   * Role: ADMIN
   */
  createReport: async (payload: CreateReportInput): Promise<Report> => {
    const response = await apiClient.post<ApiResponse<Report>>('/reports', payload);
    return response.data.data;
  },

  /**
   * Update report
   * PATCH /api/v1/reports/:id
   * Role: ADMIN
   */
  updateReport: async (id: number | string, payload: UpdateReportInput): Promise<Report> => {
    const response = await apiClient.patch<ApiResponse<Report>>(`/reports/${id}`, payload);
    return response.data.data;
  },
};
