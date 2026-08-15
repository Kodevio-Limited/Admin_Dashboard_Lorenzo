export type BackendMediaType = 'PHOTO' | 'VIDEO' | 'DOCUMENT';

export interface MediaAttachment {
  id: string;
  originalName: string;
  mimeType: string;
  size: number | string;
  objectKey: string;
  url?: string;
}

export interface MediaProperty {
  id: number;
  name: string;
  parish?: string | null;
  city?: string | null;
}

export interface MediaReport {
  id: number;
  title: string;
  visitDate?: string;
}

export interface Media {
  id: number | string;
  reportId: number | string;
  propertyId: number | string;
  type: BackendMediaType | 'Image' | 'Document' | 'Video';
  attachmentId?: string;
  attachment?: MediaAttachment | null;
  property?: MediaProperty | null;
  report?: MediaReport | null;
  createdAt?: string;
  updatedAt?: string;

  // Derived / compatibility UI helpers
  fileName?: string;
  fileUrl?: string;
  propertyName?: string;
  parish?: string;
  reportName?: string;
  uploadDate?: string;
  thumbnailUrl?: string;
}

export interface CreateMediaInput {
  reportId: number;
  propertyId: number;
  type: BackendMediaType;
  attachmentId: string;
}

export interface UpdateMediaInput {
  reportId?: number;
  propertyId?: number;
  type?: BackendMediaType;
  attachmentId?: string;
}
