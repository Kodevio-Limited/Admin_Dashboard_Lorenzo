import type { ColumnDef } from '@/components/shared/DataTable';
import type { Property } from '@/types/property';

export const propertyColumns: ColumnDef<Property>[] = [
  {
    key: 'name',
    header: 'Property Name',
    sortable: true,
  },
  {
    key: 'parish',
    header: 'Parish / City',
    sortable: true,
    render: (p) => {
      const loc = [p.parish, p.city].filter(Boolean).join(', ');
      return loc || 'N/A';
    },
  },
  {
    key: 'gpsCoordinates',
    header: 'GPS Coordinates',
    sortable: true,
    render: (p) => p.gpsCoordinates || 'N/A',
  },
  {
    key: 'type',
    header: 'Type',
    sortable: true,
    render: (p) => p.type || p.propertyType || 'N/A',
  },
  {
    key: 'clientName',
    header: 'Client',
    sortable: true,
    render: (p) => {
      if (p.client) {
        return [p.client.firstName, p.client.lastName].filter(Boolean).join(' ');
      }
      return p.clientName || 'N/A';
    },
  },
  {
    key: 'servicePlanType',
    header: 'Service Plan',
    sortable: true,
    render: (p) => p.servicePlantype || p.servicePlanType || p.servicePlan || 'N/A',
  },
  {
    key: 'fieldRep',
    header: 'Field Rep',
    sortable: true,
    render: (p) => p.fieldRep || p.assignedFieldRep || 'N/A',
  },
  {
    key: 'nextVisitDate',
    header: 'Next Visit',
    sortable: true,
    render: (p) => {
      if (!p.nextVisitDate) return 'N/A';
      return new Date(p.nextVisitDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  {
    key: 'reportSubmissionStatus',
    header: 'Report Status',
    sortable: true,
    render: (p) => {
      const st = p.reportSubmissionStatus || p.reportStatus || 'N/A';
      return (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
            st === 'UPTODATE' || st === 'Up to Date'
              ? 'bg-green-900/40 text-green-400'
              : st === 'PENDING' || st === 'Pending'
              ? 'bg-yellow-900/40 text-yellow-400'
              : st === 'OVERDUE' || st === 'Overdue'
              ? 'bg-red-900/40 text-red-400'
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          {st}
        </span>
      );
    },
  },
];
