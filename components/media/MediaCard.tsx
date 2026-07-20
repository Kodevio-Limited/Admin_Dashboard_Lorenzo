import Image from 'next/image';
import type { Media } from '@/types/media';

interface MediaCardProps {
  media: Media;
  onEdit: (media: Media) => void;
}

export default function MediaCard({ media, onEdit }: MediaCardProps) {
  return (
    <div className="bg-dark-500 rounded-lg overflow-hidden border border-dark-400 group">
      <div className="aspect-[4/3] bg-bg flex items-center justify-center overflow-hidden relative">
        {media.fileUrl ? (
          <Image
            src={media.fileUrl}
            alt={media.fileName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-dark-200">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs">No preview</span>
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
        <p className="text-sm text-white truncate" title={media.fileName}>{media.fileName}</p>
        <p className="text-xs text-dark-200 truncate">{media.propertyName}</p>
        <p className="text-xs text-dark-200 capitalize">{media.type}</p>
      </div>
    </div>
  );
}
