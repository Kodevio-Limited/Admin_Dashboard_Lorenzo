import type { ColumnDef } from '@/components/shared/DataTable';
import type { Property } from '@/types/property';

export const propertyColumns: ColumnDef<Property>[] = [
  { key: 'name', header: 'Property Name', sortable: true },
  { key: 'location', header: 'Location', sortable: true },
  {
    key: 'clientName',
    header: 'Assigned Client',
    sortable: true,
  },
];
