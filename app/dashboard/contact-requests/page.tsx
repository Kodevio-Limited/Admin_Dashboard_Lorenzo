'use client';

import Header from '@/components/layout/Header';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useGetConsultationRequests } from '@/hooks/api/useConsultationRequests';
import type { ConsultationRequest } from '@/lib/api/services/consultation-request.service';
import { formatDate } from '@/lib/utils';

const contactColumns: ColumnDef<ConsultationRequest>[] = [
  { key: 'name', header: 'Full Name', sortable: true },
  { key: 'email', header: 'Email Address', sortable: true },
  {
    key: 'phone',
    header: 'Phone Number',
    render: (row) => row.phone || 'N/A',
  },
  {
    key: 'serviceRequired',
    header: 'Service Plan / Required',
    render: (row) => (
      <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-gold-mid/20 text-gold-mid">
        {row.serviceRequired || 'General Consultation'}
      </span>
    ),
  },
  {
    key: 'parish',
    header: 'Parish',
    render: (row) => row.parish || 'N/A',
  },
  {
    key: 'message',
    header: 'Message / Notes',
    render: (row) => (
      <span className="text-xs text-dark-200 line-clamp-2 max-w-xs" title={row.message || ''}>
        {row.message || 'No message provided.'}
      </span>
    ),
  },
  {
    key: 'createdAt',
    header: 'Submitted Date',
    sortable: true,
    render: (row) => (row.createdAt ? formatDate(row.createdAt) : 'N/A'),
  },
];

export default function ContactRequestsPage() {
  const { data: requests = [], isLoading, isError, error } = useGetConsultationRequests();

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-[50px] pb-4">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[20px] sm:text-[24px] font-medium text-white leading-[1.3]">Contact Requests</h2>
          <span className="text-[13px] sm:text-[14px] font-normal text-white/70 leading-[1.3]">
            View and manage website consultation and contact form submissions from prospective clients.
          </span>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load contact requests: {error?.message || 'Unknown error'}
          </div>
        )}

        <DataTable
          data={requests}
          columns={contactColumns}
          isLoading={isLoading}
          emptyMessage="No consultation/contact requests found."
        />
      </div>
    </>
  );
}
