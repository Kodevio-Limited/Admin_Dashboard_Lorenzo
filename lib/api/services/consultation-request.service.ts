import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export interface ConsultationRequest {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  serviceRequired?: string | null;
  parish?: string | null;
  message?: string | null;
  privacyPolicyAccepted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const consultationRequestService = {
  /**
   * Fetch all consultation / contact requests
   * GET /api/v1/consultation-requests
   * Role: ADMIN
   */
  getConsultationRequests: async (): Promise<ConsultationRequest[]> => {
    const response = await apiClient.get<ApiResponse<ConsultationRequest[]>>('/consultation-requests');
    return response.data.data;
  },

  /**
   * Fetch single consultation request by ID
   * GET /api/v1/consultation-requests/:id
   * Role: ADMIN
   */
  getConsultationRequestById: async (id: number): Promise<ConsultationRequest> => {
    const response = await apiClient.get<ApiResponse<ConsultationRequest>>(`/consultation-requests/${id}`);
    return response.data.data;
  },
};
