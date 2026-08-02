import type { Media } from '@/types/media';
import { getProperties } from './properties';
import { getReports } from './reports';

const properties = getProperties();
const reports = getReports();

const initialMedia: Media[] = [
  {
    id: 'm1',
    fileName: 'mystic-ridge-exterior.jpg',
    fileUrl: '',
    type: 'Image',
    propertyId: properties[0].id,
    propertyName: properties[0].name,
    parish: 'St. Ann',
    reportId: reports[0].id,
    reportName: reports[0].title,
    uploadDate: '2026-07-12',
    thumbnailUrl: '',
  },
  {
    id: 'm2',
    fileName: 'tryall-golf-course-drone.mp4',
    fileUrl: '',
    type: 'Video',
    propertyId: properties[2].id,
    propertyName: properties[2].name,
    parish: 'Hanover',
    reportId: reports[1].id,
    reportName: reports[1].title,
    uploadDate: '2026-07-20',
    thumbnailUrl: '',
  },
  {
    id: 'm3',
    fileName: 'sandals-storm-damage-photo-1.jpg',
    fileUrl: '',
    type: 'Image',
    propertyId: properties[3].id,
    propertyName: properties[3].name,
    parish: 'Westmoreland',
    reportId: reports[2].id,
    reportName: reports[2].title,
    uploadDate: '2026-07-23',
    thumbnailUrl: '',
  },
  {
    id: 'm4',
    fileName: 'kings-tower-fire-safety-cert.pdf',
    fileUrl: '',
    type: 'Document',
    propertyId: properties[4].id,
    propertyName: properties[4].name,
    parish: 'Kingston',
    reportId: reports[3].id,
    reportName: reports[3].title,
    uploadDate: '2026-07-06',
    thumbnailUrl: '',
  },
  {
    id: 'm5',
    fileName: 'rose-hall-construction-progress.jpg',
    fileUrl: '',
    type: 'Image',
    propertyId: properties[6].id,
    propertyName: properties[6].name,
    parish: 'St. James',
    reportId: reports[4].id,
    reportName: reports[4].title,
    uploadDate: '2026-07-29',
    thumbnailUrl: '',
  },
  {
    id: 'm6',
    fileName: 'ys-falls-eco-lodge-aerial.jpg',
    fileUrl: '',
    type: 'Image',
    propertyId: properties[9].id,
    propertyName: properties[9].name,
    parish: 'St. Elizabeth',
    reportId: reports[5].id,
    reportName: reports[5].title,
    uploadDate: '2026-07-26',
    thumbnailUrl: '',
  },
  {
    id: 'm7',
    fileName: 'kings-warehouse-inventory-log.pdf',
    fileUrl: '',
    type: 'Document',
    propertyId: properties[5].id,
    propertyName: properties[5].name,
    parish: 'Kingston',
    reportId: reports[6].id,
    reportName: reports[6].title,
    uploadDate: '2026-07-16',
    thumbnailUrl: '',
  },
  {
    id: 'm8',
    fileName: 'prospect-cottage-restoration-photos.pdf',
    fileUrl: '',
    type: 'Document',
    propertyId: properties[8].id,
    propertyName: properties[8].name,
    parish: 'Trelawny',
    reportId: reports[7].id,
    reportName: reports[7].title,
    uploadDate: '2026-06-22',
    thumbnailUrl: '',
  },
];

const mediaItems = [...initialMedia];

export function getMedia(): Media[] {
  return [...mediaItems];
}

export function createMedia(data: Omit<Media, 'id'>): Media {
  const media: Media = { id: `m${Date.now()}`, ...data };
  mediaItems.push(media);
  return media;
}

export function updateMedia(id: string, data: Omit<Media, 'id'>): Media | null {
  const index = mediaItems.findIndex((m) => m.id === id);
  if (index === -1) return null;
  mediaItems[index] = { id, ...data };
  return mediaItems[index];
}
