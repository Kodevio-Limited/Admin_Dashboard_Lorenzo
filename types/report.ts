export interface Report {
  id: string;
  title: string;
  propertyId: string;
  propertyName: string;
  clientId: string;
  clientName: string;
  uploadDate: string;
  fileName?: string;
  fileUrl?: string;
}
