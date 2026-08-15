import type { ColumnDef } from '@/components/shared/DataTable';
import type { Client } from '@/types/client';

export const clientColumns: ColumnDef<Client>[] = [
  {
    key: 'firstName',
    header: 'Client Name',
    sortable: true,
    render: (client) => {
      const fullName = [client.firstName, client.lastName].filter(Boolean).join(' ');
      return fullName || client.name || 'N/A';
    },
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'phone',
    header: 'Phone / WhatsApp',
    sortable: true,
    render: (client) => {
      const phone = client.phone || 'N/A';
      const whatsapp = client.clientProfile?.whatsapp || client.whatsapp;
      if (whatsapp && whatsapp !== phone) {
        return `${phone} (WA: ${whatsapp})`;
      }
      return phone;
    },
  },
  {
    key: 'country',
    header: 'Country',
    sortable: true,
    render: (client) => client.clientProfile?.country || client.country || 'N/A',
  },
  {
    key: 'servicePlan',
    header: 'Service Plan',
    sortable: true,
    render: (client) =>
      client.clientProfile?.servicePlantype ||
      client.clientProfile?.servicePlanType ||
      client.clientProfile?.servicePlan ||
      client.servicePlanType ||
      client.servicePlan ||
      'N/A',
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (client) => {
      const status = client.clientProfile?.status || client.status || 'N/A';
      return (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
            status === 'ACTIVE' || status === 'Active'
              ? 'bg-green-900/40 text-green-400'
              : status === 'PENDING' || status === 'Pending'
              ? 'bg-yellow-900/40 text-yellow-400'
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          {status}
        </span>
      );
    },
  },
];
