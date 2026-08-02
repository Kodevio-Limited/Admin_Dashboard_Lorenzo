'use client';

import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import type { ColumnDef } from '@/components/shared/DataTable';

interface FieldRep {
  id: string;
  name: string;
  email: string;
  phone: string;
  parishCoverage: string;
  assignedProperties: number;
  status: 'Active' | 'On Field' | 'On Leave';
}

const statusVariant: Record<FieldRep['status'], string> = {
  Active: 'green',
  'On Field': 'blue',
  'On Leave': 'gray',
};

const fieldReps: FieldRep[] = [
  { id: 'f1', name: 'Owen Reid', email: 'owen.reid@nexuspbs.net', phone: '+1 (876) 555-0141', parishCoverage: 'St. Ann, St. Mary', assignedProperties: 4, status: 'Active' },
  { id: 'f2', name: 'Kareem James', email: 'kareem.james@nexuspbs.net', phone: '+1 (876) 555-0142', parishCoverage: 'Hanover, Trelawny', assignedProperties: 3, status: 'On Field' },
  { id: 'f3', name: 'Shane Gordon', email: 'shane.gordon@nexuspbs.net', phone: '+1 (876) 555-0143', parishCoverage: 'Westmoreland, St. James, St. Catherine', assignedProperties: 5, status: 'Active' },
  { id: 'f4', name: 'Tanya Samuels', email: 'tanya.samuels@nexuspbs.net', phone: '+1 (876) 555-0144', parishCoverage: 'Kingston, St. Andrew, St. Elizabeth', assignedProperties: 4, status: 'On Field' },
  { id: 'f5', name: 'Marcus Grant', email: 'marcus.grant@nexuspbs.net', phone: '+1 (876) 555-0145', parishCoverage: 'Clarendon, Manchester', assignedProperties: 2, status: 'On Leave' },
];

const columns: ColumnDef<FieldRep>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'phone', header: 'Phone' },
  { key: 'parishCoverage', header: 'Parish Coverage', sortable: true },
  { key: 'assignedProperties', header: 'Assigned Properties', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge label={row.status} variant={statusVariant[row.status]} />,
  },
];

export default function FieldRepresentativesPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Field Representatives</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage your on-ground field team, coverage areas, and availability. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <DataTable
          data={fieldReps}
          columns={columns}
          emptyMessage="No field representatives yet."
        />
      </div>
    </>
  );
}
