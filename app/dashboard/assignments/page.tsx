'use client';

import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@/components/shared/DataTable';

interface Assignment {
  id: string;
  propertyName: string;
  assignedTo: string;
  assignedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

const priorityVariant: Record<Assignment['priority'], string> = {
  High: 'red',
  Medium: 'amber',
  Low: 'gray',
};

const statusVariant: Record<Assignment['status'], string> = {
  Pending: 'blue',
  'In Progress': 'amber',
  Completed: 'green',
};

const assignments: Assignment[] = [
  { id: 'a1', propertyName: 'Mystic Ridge Main Resort Building', assignedTo: 'Owen Reid', assignedDate: '2026-08-01', priority: 'High', status: 'In Progress' },
  { id: 'a2', propertyName: 'Tryall Club Golf Course & Villa Estate', assignedTo: 'Kareem James', assignedDate: '2026-07-28', priority: 'Medium', status: 'Pending' },
  { id: 'a3', propertyName: 'Sandals Negril Beachfront Wing', assignedTo: 'Shane Gordon', assignedDate: '2026-07-25', priority: 'High', status: 'Pending' },
  { id: 'a4', propertyName: 'Kings House Warehouse & Logistics Hub', assignedTo: 'Tanya Samuels', assignedDate: '2026-08-02', priority: 'Medium', status: 'In Progress' },
  { id: 'a5', propertyName: 'Prospect Plantation Heritage Cottages', assignedTo: 'Kareem James', assignedDate: '2026-06-15', priority: 'Low', status: 'Completed' },
];

const columns: ColumnDef<Assignment>[] = [
  { key: 'propertyName', header: 'Property', sortable: true },
  { key: 'assignedTo', header: 'Assigned To', sortable: true },
  { key: 'assignedDate', header: 'Assigned Date', sortable: true, render: (row) => formatDate(row.assignedDate) },
  { key: 'priority', header: 'Priority', render: (row) => <StatusBadge label={row.priority} variant={priorityVariant[row.priority]} /> },
  { key: 'status', header: 'Status', render: (row) => <StatusBadge label={row.status} variant={statusVariant[row.status]} /> },
];

export default function AssignmentsPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Assignments</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Assign and track verification jobs across your field team. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <DataTable
          data={assignments}
          columns={columns}
          emptyMessage="No assignments yet."
        />
      </div>
    </>
  );
}
