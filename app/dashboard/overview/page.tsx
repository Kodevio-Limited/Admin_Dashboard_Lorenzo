'use client';

import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import { useClients } from '@/hooks/useClients';
import { useProperties } from '@/hooks/useProperties';
import { useReports } from '@/hooks/useReports';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@/components/shared/DataTable';
import type { Report } from '@/types/report';

function Icon({ children }: { children: ReactNode }) {
  return (
    <div className="size-10 flex items-center justify-center rounded-[8px] bg-gold-mid/15 border border-gold-mid/30 text-gold-mid shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

const UsersIcon = (
  <Icon>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const BuildingIcon = (
  <Icon>
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
    <path d="M9 9h.01" />
    <path d="M9 13h.01" />
    <path d="M9 17h.01" />
  </Icon>
);

const ClipboardIcon = (
  <Icon>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </Icon>
);

const CalendarIcon = (
  <Icon>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="m9 15 2 2 4-4" />
  </Icon>
);

const HardHatIcon = (
  <Icon>
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M4 15v-3a6 6 0 0 1 6-6" />
    <path d="M14 6a6 6 0 0 1 6 6v3" />
  </Icon>
);

const AlertIcon = (
  <Icon>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

const FileTextIcon = (
  <Icon>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </Icon>
);

const recentColumns: ColumnDef<Report>[] = [
  { key: 'title', header: 'Report' },
  { key: 'parish', header: 'Parish' },
  { key: 'propertyName', header: 'Property' },
  { key: 'assignedFieldRep', header: 'Field Rep' },
  {
    key: 'visitDate',
    header: 'Visit Date',
    render: (row) => formatDate(row.visitDate),
  },
  { key: 'status', header: 'Status' },
  {
    key: 'reviewedStatus',
    header: 'Review',
  },
];

export default function OverviewPage() {
  const { data: clients } = useClients();
  const { data: properties } = useProperties();
  const { data: reports } = useReports();

  const activeClients = clients.filter((c) => c.status === 'Active').length;
  const totalProperties = properties.length;
  const reportsPending = reports.filter((r) => r.status === 'Draft' || r.status === 'Submitted').length;
  const reportsAwaitingReview = reports.filter((r) => r.reviewedStatus === 'Unreviewed').length;
  const fieldReps = new Set(properties.map((p) => p.assignedFieldRep)).size;
  const urgentIssues = properties.filter((p) => p.reportStatus === 'Overdue').length;

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const visitsDue = properties.filter((p) => {
    if (!p.nextVisitDate) return false;
    const visitDate = new Date(p.nextVisitDate);
    return visitDate >= today && visitDate <= nextWeek;
  }).length;

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
    .slice(0, 6);

  const kpis = [
    { label: 'Active Clients', value: activeClients, icon: UsersIcon },
    { label: 'Properties Monitored', value: totalProperties, icon: BuildingIcon },
    { label: 'Reports Pending', value: reportsPending, icon: ClipboardIcon },
    { label: 'Visits Due This Week', value: visitsDue, icon: CalendarIcon },
    { label: 'Field Reps Assigned', value: fieldReps, icon: HardHatIcon },
    { label: 'Urgent Issues', value: urgentIssues, icon: AlertIcon },
    { label: 'Reports Awaiting Review', value: reportsAwaitingReview, icon: FileTextIcon },
  ];

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Dashboard Overview</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Nexus Property & Business Services — operational KPIs at a glance.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-dark-600 rounded-[8px] p-5 flex items-start gap-4 border border-dark-400"
            >
              {kpi.icon}
              <div>
                <p className="text-[13px] font-medium text-dark-200 leading-[1.3]">{kpi.label}</p>
                <p className="text-[32px] font-bold text-white leading-[1.1] mt-1">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-[18px] font-medium text-white leading-[1.3] mb-4">Recent Reports</h3>
          <DataTable
            data={recentReports}
            columns={recentColumns}
            emptyMessage="No reports yet."
          />
        </div>
      </div>
    </>
  );
}
