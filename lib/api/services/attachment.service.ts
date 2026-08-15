import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export type AttachmentType =
  | 'REPORT_PDF'
  | 'PROPERTY_IMAGE'
  | 'PROPERTY_VIDEO'
  | 'PROFILE_IMAGE'
  | 'DOCUMENT';

export interface Attachment {
  id: string;
  provider: string;
  type: AttachmentType;
  status: string;
  objectKey: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt?: string;
  updatedAt?: string;
}

export const attachmentService = {
  /**
   * Upload File Attachment
   * POST /api/v1/attachments
   * Multipart/form-data
   */
  upload: async (file: File, type: AttachmentType): Promise<Attachment> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await apiClient.post<ApiResponse<Attachment>>('/attachments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  /**
   * Get Attachment by ID
   * GET /api/v1/attachments/:id
   */
  getById: async (id: string): Promise<Attachment> => {
    const response = await apiClient.get<ApiResponse<Attachment>>(`/attachments/${id}`);
    return response.data.data;
  },
};
