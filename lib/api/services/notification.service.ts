import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  resourceType: string;
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  /**
   * Fetch all notifications
   * GET /api/v1/notifications
   * Role: ADMIN
   */
  getNotifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get<ApiResponse<NotificationItem[]>>('/notifications');
    return response.data.data;
  },
};
