'use client';

import Header from '@/components/layout/Header';
import StatusBadge from '@/components/shared/StatusBadge';

interface ActivityEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  kind: 'Report' | 'Visit' | 'Client' | 'System';
}

const kindVariant: Record<ActivityEntry['kind'], string> = {
  Report: 'blue',
  Visit: 'amber',
  Client: 'green',
  System: 'gray',
};

const activity: ActivityEntry[] = [
  { id: 'ac1', timestamp: '2026-07-30 · 9:42 AM', actor: 'Tanya Samuels', action: 'submitted a report for', entity: 'YS Falls Eco Guest House', kind: 'Report' },
  { id: 'ac2', timestamp: '2026-07-30 · 8:15 AM', actor: 'Shane Gordon', action: 'completed a visit at', entity: 'Sandals Negril Beachfront Wing', kind: 'Visit' },
  { id: 'ac3', timestamp: '2026-07-29 · 4:05 PM', actor: 'System', action: 'flagged an overdue visit for', entity: 'Kings House Warehouse & Logistics Hub', kind: 'Visit' },
  { id: 'ac4', timestamp: '2026-07-28 · 11:20 AM', actor: 'Nexus Admin', action: 'approved report for', entity: 'Mystic Ridge — Q3 Structural Verification Report', kind: 'Report' },
  { id: 'ac5', timestamp: '2026-07-27 · 3:30 PM', actor: 'YS Falls Eco Retreat', action: 'registered as a new client', entity: '—', kind: 'Client' },
  { id: 'ac6', timestamp: '2026-07-26 · 10:00 AM', actor: 'System', action: 'completed scheduled portal maintenance', entity: '—', kind: 'System' },
];

export default function ActivityPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Activity History</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Chronological log of actions across the portal. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex flex-col gap-3">
          {activity.map((entry) => (
            <div
              key={entry.id}
              className="bg-dark-600 rounded-[8px] p-5 border border-dark-400 flex items-start justify-between gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <StatusBadge label={entry.kind} variant={kindVariant[entry.kind]} />
                  <p className="text-[14px] font-normal text-white leading-[1.4]">
                    <span className="font-medium">{entry.actor}</span> {entry.action}{' '}
                    {entry.entity !== '—' && <span className="font-medium">{entry.entity}</span>}
                  </p>
                </div>
              </div>
              <span className="text-[12px] font-normal text-dark-100 leading-[1.3] whitespace-nowrap shrink-0">
                {entry.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
