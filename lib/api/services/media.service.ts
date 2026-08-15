import { apiClient } from '@/lib/api/axios';
import type { Media, CreateMediaInput, UpdateMediaInput } from '@/types/media';
import type { ApiResponse } from '@/types/client';

export const mediaService = {
  /**
   * Fetch all media
   * GET /api/v1/media
   */
  getMedia: async (): Promise<Media[]> => {
    const response = await apiClient.get<ApiResponse<Media[]>>('/media');
    return response.data.data;
  },

  /**
   * Fetch media by ID
   * GET /api/v1/media/:id
   */
  getMediaById: async (id: number | string): Promise<Media> => {
    const response = await apiClient.get<ApiResponse<Media>>(`/media/${id}`);
    return response.data.data;
  },

  /**
   * Fetch media by report ID
   * GET /api/v1/media/report/:reportId
   */
  getMediaByReportId: async (reportId: number | string): Promise<Media[]> => {
    const response = await apiClient.get<ApiResponse<Media[]>>(`/media/report/${reportId}`);
    return response.data.data;
  },

  /**
   * Create media
   * POST /api/v1/media
   */
  createMedia: async (payload: CreateMediaInput): Promise<Media> => {
    const response = await apiClient.post<ApiResponse<Media>>('/media', payload);
    return response.data.data;
  },

  /**
   * Update media
   * PATCH /api/v1/media/:id
   */
  updateMedia: async (id: number | string, payload: UpdateMediaInput): Promise<Media> => {
    const response = await apiClient.patch<ApiResponse<Media>>(`/media/${id}`, payload);
    return response.data.data;
  },

  /**
   * Delete media
   * DELETE /api/v1/media/:id
   */
  deleteMedia: async (id: number | string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/media/${id}`);
  },
};
