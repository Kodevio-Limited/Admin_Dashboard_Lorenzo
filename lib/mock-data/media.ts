import type { Media } from '@/types/media';
import { getProperties } from './properties';

const properties = getProperties();

const initialMedia: Media[] = [
  { id: 'm1', propertyId: properties[0].id, propertyName: properties[0].name, type: 'Image', fileName: 'tower-exterior.jpg', fileUrl: '', uploadDate: '2025-01-20' },
  { id: 'm2', propertyId: properties[1].id, propertyName: properties[1].name, type: 'Image', fileName: 'plaza-aerial.jpg', fileUrl: '', uploadDate: '2025-02-15' },
  { id: 'm3', propertyId: properties[2].id, propertyName: properties[2].name, type: 'Image', fileName: 'estate-garden.jpg', fileUrl: '', uploadDate: '2025-03-22' },
  { id: 'm4', propertyId: properties[3].id, propertyName: properties[3].name, type: 'Image', fileName: 'heights-skyline.jpg', fileUrl: '', uploadDate: '2025-04-10' },
  { id: 'm5', propertyId: properties[4].id, propertyName: properties[4].name, type: 'Image', fileName: 'gardens-aerial.jpg', fileUrl: '', uploadDate: '2025-05-05' },
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
