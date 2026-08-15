'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { notificationService, NotificationItem } from '@/lib/api/services/notification.service';
import { notificationKeys } from '@/lib/api/query-keys';

/**
 * Hook to fetch all notifications
 * GET /api/v1/notifications
 */
export function useGetNotifications(
  options?: Omit<UseQueryOptions<NotificationItem[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<NotificationItem[], Error>({
    queryKey: notificationKeys.lists(),
    queryFn: notificationService.getNotifications,
    ...options,
  });
}
