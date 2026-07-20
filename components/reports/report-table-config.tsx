import type { ColumnDef } from '@/components/shared/DataTable';
import type { Report } from '@/types/report';
import { formatDate } from '@/lib/utils';

export const reportColumns: ColumnDef<Report>[] = [
  { key: 'title', header: 'Report Title', sortable: true },
  {
    key: 'propertyName',
    header: 'Property',
    sortable: true,
  },
  {
    key: 'clientName',
    header: 'Assigned Client',
    sortable: true,
  },
  {
    key: 'uploadDate',
    header: 'Upload Date',
    sortable: true,
    render: (row) => formatDate(row.uploadDate),
  },
];
