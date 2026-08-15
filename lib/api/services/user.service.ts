import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserProfileInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export const userService = {
  /**
   * Fetch self profile
   * GET /api/v1/users/me
   */
  getSelfProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/users/me');
    return response.data.data;
  },

  /**
   * Update own profile
   * PATCH /api/v1/users/me
   */
  updateSelfProfile: async (payload: UpdateUserProfileInput): Promise<UserProfile> => {
    const response = await apiClient.patch<ApiResponse<UserProfile>>('/users/me', payload);
    return response.data.data;
  },
};
