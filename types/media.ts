export interface Media {
  id: string;
  fileName: string;
  fileUrl: string;
  type: 'Image' | 'Document' | 'Video';
  propertyId: string;
  propertyName: string;
  parish: string;
  reportId: string;
  reportName: string;
  uploadDate: string;
  thumbnailUrl: string;
}
