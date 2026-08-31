'use client';

import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import { useGetOverview } from '@/hooks/api/useDashboard';
import { useGetReports } from '@/hooks/api/useReports';
import { reportColumns } from '@/components/reports/report-table-config';

function KpiIcon({ children }: { children: ReactNode }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#D1A736] shrink-0 group-hover:scale-105 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

const UsersIcon = (
  <KpiIcon>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </KpiIcon>
);

const BuildingIcon = (
  <KpiIcon>
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
    <path d="M9 9h.01" />
    <path d="M9 13h.01" />
    <path d="M9 17h.01" />
  </KpiIcon>
);

const ClipboardIcon = (
  <KpiIcon>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </KpiIcon>
);

const CalendarIcon = (
  <KpiIcon>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="m9 15 2 2 4-4" />
  </KpiIcon>
);

export default function OverviewPage() {
  const { data: overview, isLoading: isOverviewLoading, isError, error } = useGetOverview();
  const { data: reports = [], isLoading: isReportsLoading } = useGetReports();

  const kpis = [
    {
      label: 'Total Clients',
      value: overview?.totalClients ?? 0,
      icon: UsersIcon,
      desc: 'Active registered clients',
    },
    {
      label: 'Total Properties',
      value: overview?.totalProperties ?? 0,
      icon: BuildingIcon,
      desc: 'Managed real estate assets',
    },
    {
      label: 'Total Reports',
      value: overview?.totalReports ?? 0,
      icon: ClipboardIcon,
      desc: 'Completed & draft filings',
    },
    {
      label: 'Upcoming Visits',
      value: overview?.upComingVisits ?? 0,
      icon: CalendarIcon,
      desc: 'Scheduled site verifications',
    },
  ];

  const recentReports = reports.slice(0, 5);

  return (
    <div className="min-h-full flex flex-col">
      <Header />

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Page Title */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs sm:text-sm text-dark-200">
            Nexus Property &amp; Business Services — live system metrics from backend.
          </p>
        </div>

        {isError && (
          <div className="p-4 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Failed to load overview data: {error?.message || 'Unknown error'}</span>
          </div>
        )}

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-[#141414] border border-dark-400/40 hover:border-[#D1A736]/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 group shadow-sm hover:shadow-md hover:shadow-black/40"
            >
              {kpi.icon}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-dark-200 truncate">{kpi.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {isOverviewLoading ? (
                    <span className="inline-block w-8 h-7 bg-white/10 rounded animate-pulse" />
                  ) : (
                    kpi.value
                  )}
                </p>
                <p className="text-[11px] text-dark-300 mt-1 truncate">{kpi.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Recent Verification Reports
            </h3>
            <span className="text-xs text-dark-200 font-medium">
              Showing latest {recentReports.length} reports
            </span>
          </div>

          <div className="bg-[#141414] border border-dark-400/30 rounded-2xl overflow-hidden shadow-sm">
            <DataTable
              data={recentReports}
              columns={reportColumns}
              isLoading={isReportsLoading}
              emptyMessage="No reports found."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
