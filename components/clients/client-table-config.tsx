import type { ColumnDef } from '@/components/shared/DataTable';
import type { Client } from '@/types/client';

export const clientColumns: ColumnDef<Client>[] = [
  { key: 'name', header: 'Client Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'phone', header: 'Phone / WhatsApp', sortable: true },
  { key: 'country', header: 'Country', sortable: true },
  { key: 'servicePlan', header: 'Service Plan', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];
