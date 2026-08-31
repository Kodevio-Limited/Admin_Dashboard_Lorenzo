'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@/components/shared/DataTable';

interface Approval {
  id: string;
  title: string;
  propertyName: string;
  clientName: string;
  fieldRep: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const statusVariant: Record<Approval['status'], string> = {
  Pending: 'amber',
  Approved: 'green',
  Rejected: 'red',
};

const initialApprovals: Approval[] = [
  { id: 'ap1', title: 'Tryall Club — Quarterly Environmental Audit', propertyName: 'Tryall Club Golf Course & Villa Estate', clientName: 'Tryall Club Jamaica', fieldRep: 'Kareem James', submittedDate: '2026-07-20', status: 'Pending' },
  { id: 'ap2', title: 'Sandals Negril — Storm Damage Assessment', propertyName: 'Sandals Negril Beachfront Wing', clientName: 'Sandals Negril', fieldRep: 'Shane Gordon', submittedDate: '2026-07-23', status: 'Pending' },
  { id: 'ap3', title: 'YS Falls Eco Guest House — Initial Compliance Report', propertyName: 'YS Falls Eco Guest House', clientName: 'YS Falls Eco Retreat', fieldRep: 'Tanya Samuels', submittedDate: '2026-07-26', status: 'Pending' },
  { id: 'ap4', title: 'Rose Hall Conference Centre — Pre-Occupancy Verification', propertyName: 'Rose Hall Conference Centre', clientName: 'Rose Hall Developments', fieldRep: 'Shane Gordon', submittedDate: '2026-07-29', status: 'Pending' },
];

export default function ReportApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);

  const setStatus = (id: string, status: Approval['status']) => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const columns: ColumnDef<Approval>[] = [
    { key: 'title', header: 'Report', sortable: true },
    { key: 'clientName', header: 'Client', sortable: true },
    { key: 'fieldRep', header: 'Field Rep', sortable: true },
    { key: 'submittedDate', header: 'Submitted', sortable: true, render: (row) => formatDate(row.submittedDate) },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={statusVariant[row.status]} />,
    },
    {
      key: 'id',
      header: 'Actions',
      render: (row) =>
        row.status === 'Pending' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatus(row.id, 'Approved')}
              className="rounded-[4px] px-3 py-1.5 text-[13px] font-semibold text-bg transition-all hover:brightness-110 cursor-pointer"
              style={{ background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)' }}
            >
              Approve
            </button>
            <button
              onClick={() => setStatus(row.id, 'Rejected')}
              className="rounded-[4px] px-3 py-1.5 text-[13px] font-semibold text-white bg-dark-400/50 hover:bg-dark-400 transition-colors cursor-pointer"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-[13px] font-normal text-dark-100">No action needed</span>
        ),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Report Approvals</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Review and approve field-submitted reports. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <DataTable
          data={approvals}
          columns={columns}
          emptyMessage="No reports awaiting approval."
        />
      </div>
    </>
  );
}
