'use client';

import Header from '@/components/layout/Header';
import StatusBadge from '@/components/shared/StatusBadge';
import { useGetNotifications } from '@/hooks/api/useNotifications';

export default function NotificationsPage() {
  const { data: notifications = [], isLoading, isError, error } = useGetNotifications();

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-[50px] pb-4">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[20px] sm:text-[24px] font-medium text-white leading-[1.3]">Notifications</h2>
          <span className="text-[13px] sm:text-[14px] font-normal text-white/70 leading-[1.3]">
            System notifications and operational alerts.
          </span>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load notifications: {error?.message || 'Unknown error'}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-dark-600 rounded-[8px] p-5 border border-dark-400 animate-pulse space-y-2">
                <div className="h-4 bg-dark-400 rounded w-1/3" />
                <div className="h-3 bg-dark-400 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 text-dark-200">
            No notifications available.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-dark-600 rounded-[8px] p-4 sm:p-5 border border-dark-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <StatusBadge label={n.type || n.resourceType || 'System'} variant="amber" />
                    <h3 className="text-[15px] font-medium text-white leading-[1.3] truncate">{n.title}</h3>
                  </div>
                  <p className="text-[13px] sm:text-[14px] font-normal text-dark-200 leading-[1.4]">{n.message}</p>
                </div>
                <span className="text-[12px] font-normal text-dark-100 leading-[1.3] whitespace-nowrap shrink-0 self-start sm:self-auto">
                  {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
