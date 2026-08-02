'use client';

import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@/components/shared/DataTable';

interface Visit {
  id: string;
  propertyName: string;
  clientName: string;
  fieldRep: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'In Progress' | 'Cancelled';
}

const statusVariant: Record<Visit['status'], string> = {
  Scheduled: 'blue',
  Completed: 'green',
  'In Progress': 'amber',
  Cancelled: 'red',
};

const visits: Visit[] = [
  { id: 'v1', propertyName: 'Mystic Ridge Villa 12', clientName: 'Mystic Ridge Resort', fieldRep: 'Owen Reid', date: '2026-08-10', time: '9:00 AM', status: 'Scheduled' },
  { id: 'v2', propertyName: 'Rose Hall Conference Centre', clientName: 'Rose Hall Developments', fieldRep: 'Shane Gordon', date: '2026-08-12', time: '10:30 AM', status: 'Scheduled' },
  { id: 'v3', propertyName: 'Kings House Commercial Tower', clientName: 'Kings House Properties', fieldRep: 'Tanya Samuels', date: '2026-08-05', time: '8:00 AM', status: 'In Progress' },
  { id: 'v4', propertyName: 'Sandals Negril Beachfront Wing', clientName: 'Sandals Negril', fieldRep: 'Shane Gordon', date: '2026-07-30', time: '1:00 PM', status: 'Completed' },
  { id: 'v5', propertyName: 'YS Falls Eco Guest House', clientName: 'YS Falls Eco Retreat', fieldRep: 'Tanya Samuels', date: '2026-08-01', time: '11:00 AM', status: 'Scheduled' },
];

const columns: ColumnDef<Visit>[] = [
  { key: 'propertyName', header: 'Property', sortable: true },
  { key: 'clientName', header: 'Client', sortable: true },
  { key: 'fieldRep', header: 'Field Rep', sortable: true },
  { key: 'date', header: 'Date', sortable: true, render: (row) => formatDate(row.date) },
  { key: 'time', header: 'Time' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge label={row.status} variant={statusVariant[row.status]} />,
  },
];

export default function VisitsPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Visits & Scheduling</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Plan, track, and manage field visits across the island. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <DataTable
          data={visits}
          columns={columns}
          emptyMessage="No visits scheduled yet."
        />
      </div>
    </>
  );
}
