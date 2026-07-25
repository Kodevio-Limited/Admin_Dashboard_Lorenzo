'use client';

import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import { useClients } from '@/hooks/useClients';
import { useProperties } from '@/hooks/useProperties';
import { useReports } from '@/hooks/useReports';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@/components/shared/DataTable';
import type { Report } from '@/types/report';

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
    { label: 'Active Clients', value: activeClients, icon: '👥' },
    { label: 'Properties Monitored', value: totalProperties, icon: '🏗️' },
    { label: 'Reports Pending', value: reportsPending, icon: '📋' },
    { label: 'Visits Due This Week', value: visitsDue, icon: '🔍' },
    { label: 'Field Reps Assigned', value: fieldReps, icon: '👷' },
    { label: 'Urgent Issues', value: urgentIssues, icon: '⚠️' },
    { label: 'Reports Awaiting Review', value: reportsAwaitingReview, icon: '📄' },
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
              <span className="text-2xl mt-0.5">{kpi.icon}</span>
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
