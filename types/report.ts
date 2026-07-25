export interface Report {
  id: string;
  title: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  visitDate: string;
  parish: string;
  propertyId: string;
  propertyName: string;
  clientId: string;
  clientName: string;
  assignedFieldRep: string;
  reviewedStatus: 'Reviewed' | 'Unreviewed';
  uploadDate: string;
  fileName?: string;
  fileUrl?: string;
}
