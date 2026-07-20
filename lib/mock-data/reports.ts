import type { Report } from '@/types/report';
import { getProperties } from './properties';

const properties = getProperties();

const initialReports: Report[] = [
  { id: 'r1', title: 'Q1 Structural Analysis', propertyId: properties[0].id, propertyName: properties[0].name, clientId: properties[0].clientId, clientName: properties[0].clientName, uploadDate: '2025-01-15' },
  { id: 'r2', title: 'Environmental Impact Study', propertyId: properties[1].id, propertyName: properties[1].name, clientId: properties[1].clientId, clientName: properties[1].clientName, uploadDate: '2025-02-20' },
  { id: 'r3', title: 'Foundation Inspection', propertyId: properties[2].id, propertyName: properties[2].name, clientId: properties[2].clientId, clientName: properties[2].clientName, uploadDate: '2025-03-10' },
  { id: 'r4', title: 'Plumbing Assessment', propertyId: properties[3].id, propertyName: properties[3].name, clientId: properties[3].clientId, clientName: properties[3].clientName, uploadDate: '2025-04-05' },
  { id: 'r5', title: 'Electrical Safety Audit', propertyId: properties[4].id, propertyName: properties[4].name, clientId: properties[4].clientId, clientName: properties[4].clientName, uploadDate: '2025-05-12' },
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
