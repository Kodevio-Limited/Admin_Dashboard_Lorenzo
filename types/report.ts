export type BackendReportStatus = 'DRAFT' | 'PUBLISHED' | 'SUBMITTED' | 'ARCHIVED';

export interface ReportAttachment {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  objectKey: string;
  url?: string;
}

export interface Report {
  id: number | string;
  title: string;
  status: BackendReportStatus | string;
  visitDate: string;
  parish: string;
  propertyId: number | string;
  propertyName?: string;
  clientId: number | string;
  clientName?: string;
  fieldRep?: string;
  assignedFieldRep?: string;
  attachmentId?: string | null;
  attachment?: ReportAttachment | null;
  createdAt?: string;
  updatedAt?: string;

  // Derived / compatibility UI helpers
  reviewedStatus?: 'Reviewed' | 'Unreviewed';
  uploadDate?: string;
  fileName?: string;
  fileUrl?: string;
}

export interface CreateReportInput {
  title: string;
  visitDate: string;
  parish: string;
  propertyId: number;
  fieldRep: string;
  clientId: number;
  attachmentId: string;
}

export interface UpdateReportInput {
  title?: string;
  visitDate?: string;
  parish?: string;
  propertyId?: number;
  fieldRep?: string;
  clientId?: number;
  attachmentId?: string;
}
