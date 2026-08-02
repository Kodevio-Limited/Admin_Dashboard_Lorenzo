'use client';

import Header from '@/components/layout/Header';
import StatusBadge from '@/components/shared/StatusBadge';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  kind: 'Report' | 'Visit' | 'Client' | 'System';
}

const kindVariant: Record<NotificationItem['kind'], string> = {
  Report: 'blue',
  Visit: 'amber',
  Client: 'green',
  System: 'gray',
};

const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Report awaiting approval', message: 'YS Falls Eco Guest House — Initial Compliance Report was submitted by Tanya Samuels.', time: '25 min ago', read: false, kind: 'Report' },
  { id: 'n2', title: 'Visit completed', message: 'Sandals Negril Beachfront Wing visit completed by Shane Gordon.', time: '2 hours ago', read: false, kind: 'Visit' },
  { id: 'n3', title: 'New client registered', message: 'YS Falls Eco Retreat completed the registration flow.', time: '5 hours ago', read: false, kind: 'Client' },
  { id: 'n4', title: 'Overdue visit flagged', message: 'Kings House Warehouse & Logistics Hub visit is past its scheduled date.', time: '1 day ago', read: true, kind: 'Visit' },
  { id: 'n5', title: 'Report approved', message: 'Mystic Ridge — Q3 Structural Inspection Report was approved.', time: '2 days ago', read: true, kind: 'Report' },
  { id: 'n6', title: 'System maintenance', message: 'Portal will be briefly unavailable Sunday 2:00 AM – 3:00 AM.', time: '3 days ago', read: true, kind: 'System' },
];

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Notifications</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Incoming alerts for approvals, visits, and clients. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex flex-col gap-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-dark-600 rounded-[8px] p-5 border border-dark-400 flex items-start justify-between gap-4 ${
                n.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <StatusBadge label={n.kind} variant={kindVariant[n.kind]} />
                  <h3 className="text-[15px] font-medium text-white leading-[1.3]">{n.title}</h3>
                  {!n.read && <span className="size-2 rounded-full bg-gold-mid shrink-0" />}
                </div>
                <p className="text-[14px] font-normal text-dark-200 leading-[1.4]">{n.message}</p>
              </div>
              <span className="text-[12px] font-normal text-dark-100 leading-[1.3] whitespace-nowrap shrink-0">
                {n.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
