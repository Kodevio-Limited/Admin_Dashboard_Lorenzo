import type { ColumnDef } from '@/components/shared/DataTable';
import type { Property } from '@/types/property';

export const propertyColumns: ColumnDef<Property>[] = [
  { key: 'name', header: 'Property Name', sortable: true },
  { key: 'parish', header: 'Parish', sortable: true },
  {
    key: 'gpsCoordinates',
    header: 'GPS / Location',
    sortable: true,
  },
  { key: 'propertyType', header: 'Type', sortable: true },
  { key: 'clientName', header: 'Client', sortable: true },
  { key: 'servicePlan', header: 'Service Plan', sortable: true },
  { key: 'assignedFieldRep', header: 'Field Rep', sortable: true },
  { key: 'nextVisitDate', header: 'Next Visit', sortable: true },
  { key: 'reportStatus', header: 'Report Status', sortable: true },
];
