import type { ColumnDef } from '@/components/shared/DataTable';
import type { Report } from '@/types/report';
import { formatDate } from '@/lib/utils';

export const reportColumns: ColumnDef<Report>[] = [
  { key: 'title', header: 'Report Title', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
  {
    key: 'visitDate',
    header: 'Visit Date',
    sortable: true,
    render: (row) => formatDate(row.visitDate),
  },
  { key: 'parish', header: 'Parish', sortable: true },
  { key: 'propertyName', header: 'Property', sortable: true },
  { key: 'assignedFieldRep', header: 'Field Rep', sortable: true },
  { key: 'reviewedStatus', header: 'Review', sortable: true },
  {
    key: 'uploadDate',
    header: 'Upload Date',
    sortable: true,
    render: (row) => formatDate(row.uploadDate),
  },
  {
    key: 'fileName',
    header: 'Report',
    sortable: false,
    render: (row) =>
      row.fileName ? (
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-gold-focus hover:text-gold-start underline text-sm"
        >
          PDF
        </a>
      ) : (
        <span className="text-dark-200 text-sm">—</span>
      ),
  },
];
