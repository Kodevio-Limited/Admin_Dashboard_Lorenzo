import type { ColumnDef } from '@/components/shared/DataTable';
import type { Report } from '@/types/report';
import { formatDate } from '@/lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const reportColumns: ColumnDef<Report>[] = [
  { key: 'title', header: 'Report Title', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => row.status || 'DRAFT',
  },
  {
    key: 'visitDate',
    header: 'Visit Date',
    sortable: true,
    render: (row) => (row.visitDate ? formatDate(row.visitDate) : 'N/A'),
  },
  { key: 'parish', header: 'Parish', sortable: true },
  {
    key: 'propertyName',
    header: 'Property',
    sortable: true,
    render: (row) => row.propertyName || String(row.propertyId || 'N/A'),
  },
  {
    key: 'fieldRep',
    header: 'Field Rep',
    sortable: true,
    render: (row) => row.fieldRep || row.assignedFieldRep || 'N/A',
  },
  {
    key: 'uploadDate',
    header: 'Upload Date',
    sortable: true,
    render: (row) => (row.uploadDate || row.createdAt ? formatDate(row.uploadDate || row.createdAt!) : 'N/A'),
  },
  {
    key: 'attachment',
    header: 'Report Attachment',
    sortable: false,
    render: (row) => {
      const name = row.attachment?.originalName || row.fileName || (row.attachmentId ? 'View Report PDF' : null);
      const url =
        row.attachment?.url ||
        row.fileUrl ||
        (row.attachmentId ? `${API_BASE_URL}/attachments/${row.attachmentId}` : null);

      if (!name && !url) {
        return <span className="text-dark-200 text-xs">—</span>;
      }

      return (
        <a
          href={url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!url || url === '#') {
              e.preventDefault();
              alert('PDF attachment URL is not available.');
            }
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors font-medium text-xs group"
          title="Click to view/open PDF document"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 2 2h12a2 2 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="truncate max-w-[130px]">{name || 'View PDF'}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform shrink-0">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      );
    },
  },
];
