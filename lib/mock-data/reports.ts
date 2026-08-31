import type { Report } from '@/types/report';
import { getProperties } from './properties';

const properties = getProperties();

const fieldReps = ['Owen Reid', 'Kareem James', 'Shane Gordon', 'Tanya Samuels'];

const initialReports: Report[] = [
  {
    id: 'r1',
    title: 'Mystic Ridge — Q3 Structural Verification Report',
    status: 'Approved',
    visitDate: '2026-07-10',
    parish: 'St. Ann',
    propertyId: properties[0].id,
    propertyName: properties[0].name,
    clientId: properties[0].clientId,
    clientName: properties[0].clientName,
    assignedFieldRep: 'Owen Reid',
    reviewedStatus: 'Reviewed',
    uploadDate: '2026-07-12',
    fileName: 'mystic-ridge-q3-structural.pdf',
  },
  {
    id: 'r2',
    title: 'Tryall Club — Quarterly Environmental Audit',
    status: 'Under Review',
    visitDate: '2026-07-18',
    parish: 'Hanover',
    propertyId: properties[2].id,
    propertyName: properties[2].name,
    clientId: properties[2].clientId,
    clientName: properties[2].clientName,
    assignedFieldRep: 'Kareem James',
    reviewedStatus: 'Unreviewed',
    uploadDate: '2026-07-20',
    fileName: 'tryall-environmental-audit.pdf',
  },
  {
    id: 'r3',
    title: 'Sandals Negril — Storm Damage Assessment',
    status: 'Submitted',
    visitDate: '2026-07-22',
    parish: 'Westmoreland',
    propertyId: properties[3].id,
    propertyName: properties[3].name,
    clientId: properties[3].clientId,
    clientName: properties[3].clientName,
    assignedFieldRep: 'Shane Gordon',
    reviewedStatus: 'Unreviewed',
    uploadDate: '2026-07-23',
    fileName: 'sandals-storm-damage-report.pdf',
  },
  {
    id: 'r4',
    title: 'Kings House Tower — Monthly Fire Safety Compliance',
    status: 'Approved',
    visitDate: '2026-07-05',
    parish: 'Kingston',
    propertyId: properties[4].id,
    propertyName: properties[4].name,
    clientId: properties[4].clientId,
    clientName: properties[4].clientName,
    assignedFieldRep: 'Tanya Samuels',
    reviewedStatus: 'Reviewed',
    uploadDate: '2026-07-06',
    fileName: 'kings-house-fire-safety-jul.pdf',
  },
  {
    id: 'r5',
    title: 'Rose Hall Conference Centre — Pre-Occupancy Verification',
    status: 'Draft',
    visitDate: '2026-07-28',
    parish: 'St. James',
    propertyId: properties[6].id,
    propertyName: properties[6].name,
    clientId: properties[6].clientId,
    clientName: properties[6].clientName,
    assignedFieldRep: 'Shane Gordon',
    reviewedStatus: 'Unreviewed',
    uploadDate: '2026-07-29',
    fileName: 'rose-hall-pre-occupancy-draft.pdf',
  },
  {
    id: 'r6',
    title: 'YS Falls Eco Guest House — Initial Compliance Report',
    status: 'Submitted',
    visitDate: '2026-07-25',
    parish: 'St. Elizabeth',
    propertyId: properties[9].id,
    propertyName: properties[9].name,
    clientId: properties[9].clientId,
    clientName: properties[9].clientName,
    assignedFieldRep: 'Tanya Samuels',
    reviewedStatus: 'Unreviewed',
    uploadDate: '2026-07-26',
    fileName: 'ys-falls-compliance-initial.pdf',
  },
  {
    id: 'r7',
    title: 'Kings House Warehouse — Bi-Weekly Structural Check',
    status: 'Approved',
    visitDate: '2026-07-15',
    parish: 'Kingston',
    propertyId: properties[5].id,
    propertyName: properties[5].name,
    clientId: properties[5].clientId,
    clientName: properties[5].clientName,
    assignedFieldRep: 'Tanya Samuels',
    reviewedStatus: 'Reviewed',
    uploadDate: '2026-07-16',
    fileName: 'kings-warehouse-structural-jul.pdf',
  },
  {
    id: 'r8',
    title: 'Prospect Plantation — Seasonal Heritage Assessment',
    status: 'Draft',
    visitDate: '2026-06-20',
    parish: 'Trelawny',
    propertyId: properties[8].id,
    propertyName: properties[8].name,
    clientId: properties[8].clientId,
    clientName: properties[8].clientName,
    assignedFieldRep: 'Kareem James',
    reviewedStatus: 'Reviewed',
    uploadDate: '2026-06-22',
    fileName: 'prospect-heritage-assessment.pdf',
  },
];

const reports = [...initialReports];

export function getReports(): Report[] {
  return [...reports];
}

export function createReport(data: Omit<Report, 'id'>): Report {
  const report: Report = { id: `r${Date.now()}`, ...data };
  reports.push(report);
  return report;
}

export function updateReport(id: string, data: Omit<Report, 'id'>): Report | null {
  const index = reports.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reports[index] = { id, ...data };
  return reports[index];
}
