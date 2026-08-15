'use client';

import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import { useGetOverview } from '@/hooks/api/useDashboard';
import { useGetReports } from '@/hooks/api/useReports';
import { reportColumns } from '@/components/reports/report-table-config';

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

export default function OverviewPage() {
  const { data: overview, isLoading: isOverviewLoading, isError, error } = useGetOverview();
  const { data: reports = [], isLoading: isReportsLoading } = useGetReports();

  const kpis = [
    {
      label: 'Total Clients',
      value: overview?.totalClients ?? 0,
      icon: UsersIcon,
    },
    {
      label: 'Total Properties',
      value: overview?.totalProperties ?? 0,
      icon: BuildingIcon,
    },
    {
      label: 'Total Reports',
      value: overview?.totalReports ?? 0,
      icon: ClipboardIcon,
    },
    {
      label: 'Upcoming Visits',
      value: overview?.upComingVisits ?? 0,
      icon: CalendarIcon,
    },
  ];

  const recentReports = reports.slice(0, 5);

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-[50px] pb-3 sm:pb-[14px]">
        <div className="flex flex-col items-start gap-2 sm:gap-[10px]">
          <h2 className="text-[20px] sm:text-[24px] font-medium text-white leading-[1.3]">Dashboard Overview</h2>
          <span className="text-[12px] sm:text-[14px] font-normal text-white/70 leading-[1.3]">
            Nexus Property &amp; Business Services — live system metrics from backend.
          </span>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load overview data: {error?.message || 'Unknown error'}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-dark-600 rounded-[8px] p-4 sm:p-5 flex items-start gap-3 sm:gap-4 border border-dark-400"
            >
              {kpi.icon}
              <div>
                <p className="text-[12px] sm:text-[13px] font-medium text-dark-200 leading-[1.3]">{kpi.label}</p>
                <p className="text-[26px] sm:text-[32px] font-bold text-white leading-[1.1] mt-1">
                  {isOverviewLoading ? '...' : kpi.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-[16px] sm:text-[18px] font-medium text-white leading-[1.3] mb-3 sm:mb-4">Recent Inspection Reports</h3>
          <DataTable
            data={recentReports}
            columns={reportColumns}
            isLoading={isReportsLoading}
            emptyMessage="No reports found."
          />
        </div>
      </div>
    </>
  );
}
