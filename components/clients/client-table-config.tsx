import type { ColumnDef } from '@/components/shared/DataTable';
import type { Client } from '@/types/client';

export const clientColumns: ColumnDef<Client>[] = [
  { key: 'name', header: 'Client Name', sortable: true },
  { key: 'email', header: 'Email Address', sortable: true },
];
