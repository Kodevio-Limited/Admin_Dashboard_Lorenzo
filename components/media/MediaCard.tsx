import Image from 'next/image';
import type { Media } from '@/types/media';
import { formatDate } from '@/lib/utils';

interface MediaCardProps {
  media: Media;
  onEdit: (media: Media) => void;
}

const typeColors: Record<string, string> = {
  Image: '#16A34A',
  Document: '#C49D32',
  Video: '#DC2626',
};

const typeIcons: Record<string, string> = {
  Image: '🖼️',
  Document: '📄',
  Video: '🎬',
};

export default function MediaCard({ media, onEdit }: MediaCardProps) {
  return (
    <div className="bg-dark-500 rounded-lg overflow-hidden border border-dark-400 group">
      <div className="aspect-[4/3] bg-bg flex items-center justify-center overflow-hidden relative">
        {media.thumbnailUrl ? (
          <Image
            src={media.thumbnailUrl}
            alt={media.fileName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="flex flex-col items-center gap-2 w-full h-full justify-center"
            style={{ backgroundColor: typeColors[media.type] || '#1E1E1E', opacity: 0.8 }}
          >
            <span className="text-4xl">{typeIcons[media.type] || '📁'}</span>
            <span className="text-xs text-white/80 font-medium uppercase tracking-wide">{media.type}</span>
          </div>
        )}
        <button
          onClick={() => onEdit(media)}
          className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit media"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm text-white truncate font-medium" title={media.fileName}>{media.fileName}</p>
        <p className="text-xs text-dark-200 truncate">{media.propertyName} — {media.parish}</p>
        <p className="text-xs text-dark-200 truncate">Report: {media.reportName}</p>
        <p className="text-xs text-dark-200">{formatDate(media.uploadDate)}</p>
      </div>
    </div>
  );
}
