import type { Media } from '@/types/media';
import { formatDate } from '@/lib/utils';

interface MediaCardProps {
  media: Media;
  onEdit: (media: Media) => void;
}

const typeColors: Record<string, string> = {
  PHOTO: '#16A34A',
  Image: '#16A34A',
  DOCUMENT: '#C49D32',
  Document: '#C49D32',
  VIDEO: '#DC2626',
  Video: '#DC2626',
};

const typeIcons: Record<string, string> = {
  PHOTO: '🖼️',
  Image: '🖼️',
  DOCUMENT: '📄',
  Document: '📄',
  VIDEO: '🎬',
  Video: '🎬',
};

export default function MediaCard({
  media,
  onEdit,
}: MediaCardProps) {
  const fileName =
    media.attachment?.originalName ||
    media.fileName ||
    `Media #${media.id}`;

  const mediaUrl =
    media.attachment?.url ||
    media.fileUrl ||
    media.thumbnailUrl;

  const mimeType =
    media.attachment?.mimeType || '';

  const propertyName =
    media.property?.name ||
    media.propertyName ||
    `Property #${media.propertyId}`;

  const parish =
    media.property?.parish ||
    media.parish ||
    '';

  const reportTitle =
    media.report?.title ||
    media.reportName ||
    `Report #${media.reportId}`;

  const isImage =
    mimeType.startsWith('image/') ||
    media.type === 'PHOTO' ||
    media.type === 'Image';

  const isVideo =
    mimeType.startsWith('video/') ||
    media.type === 'VIDEO' ||
    media.type === 'Video';

  const displayDate =
    media.uploadDate || media.createdAt
      ? formatDate(
          media.uploadDate ||
            media.createdAt!,
        )
      : 'N/A';

  return (
    <div className="bg-dark-500 rounded-lg overflow-hidden border border-dark-400 group flex flex-col justify-between">
      <div>
        <div className="aspect-[4/3] bg-bg flex items-center justify-center overflow-hidden relative border-b border-dark-400">
          {mediaUrl && isImage ? (
            <img
              src={mediaUrl}
              alt={fileName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : mediaUrl && isVideo ? (
            <video
              src={mediaUrl}
              muted
              loop
              playsInline
              controls={false}
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              className="flex flex-col items-center gap-2 w-full h-full justify-center"
              style={{
                backgroundColor:
                  typeColors[media.type] ||
                  '#1E1E1E',
                opacity: 0.8,
              }}
            >
              <span className="text-4xl">
                {typeIcons[media.type] || '📁'}
              </span>

              <span className="text-xs text-white/80 font-medium uppercase tracking-wide">
                {media.type}
              </span>
            </div>
          )}

          <button
            onClick={() => onEdit(media)}
            className="absolute top-2 right-2 bg-black/70 hover:bg-amber-500 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Edit media"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="p-3.5 space-y-1.5">
          <p
            className="text-sm text-white font-semibold truncate"
            title={fileName}
          >
            {fileName}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
            </svg>

            <span
              className="truncate"
              title={propertyName}
            >
              {propertyName}
              {parish ? ` (${parish})` : ''}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-dark-200">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>

            <span
              className="truncate"
              title={reportTitle}
            >
              Report: {reportTitle}
            </span>
          </div>
        </div>
      </div>

      <div className="px-3.5 pb-3 pt-1 border-t border-dark-400/50 flex items-center justify-between text-[11px] text-dark-200">
        <span className="uppercase font-medium text-amber-400/80">
          {media.type}
        </span>

        <span>{displayDate}</span>
      </div>
    </div>
  );
}