'use client';

import { useState } from 'react';
import Image from 'next/image';
import MediaCard from '@/components/media/MediaCard';
import MediaModal from '@/components/media/MediaModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useGetMedia, useCreateMedia, useUpdateMedia } from '@/hooks/api/useMedia';
import { useGetProperties } from '@/hooks/api/useProperties';
import { useGetReports } from '@/hooks/api/useReports';
import { useUIStore } from '@/store/uiStore';
import type { Media, CreateMediaInput } from '@/types/media';

export default function MediaPage() {
  const addToast = useUIStore((s) => s.addToast);

  // TanStack Query Hooks
  const { data: mediaItems = [], isLoading, isError, error } = useGetMedia();
  const { data: properties = [] } = useGetProperties();
  const { data: reports = [] } = useGetReports();

  const createMediaMutation = useCreateMedia();
  const updateMediaMutation = useUpdateMedia();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | undefined>();

  const handleEdit = (media: Media) => {
    setEditingMedia(media);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingMedia(undefined);
    setModalOpen(true);
  };

  const handleSave = async (payload: CreateMediaInput) => {
    try {
      if (editingMedia) {
        await updateMediaMutation.mutateAsync({
          id: editingMedia.id,
          data: payload,
        });
        addToast('Media updated successfully', 'success');
      } else {
        await createMediaMutation.mutateAsync(payload);
        addToast('Media uploaded successfully', 'success');
      }
      setModalOpen(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-[50px] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Media</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage property verification photos, videos, and document attachments.
          </span>
        </div>
        <Button
          variant="gold"
          onClick={handleAdd}
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px] shrink-0 self-start sm:self-auto"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Upload Media
        </Button>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load media items: {error?.message || 'Unknown error'}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-dark-500 rounded-lg overflow-hidden border border-dark-400 animate-pulse">
                <div className="aspect-[4/3] bg-bg" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-dark-400 rounded w-3/4" />
                  <div className="h-3 bg-dark-400 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-12 text-dark-200">
            No media found. Click 'Upload Media' to attach media to a property report.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaItems.map((item) => (
              <MediaCard key={item.id} media={item} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        media={editingMedia}
        properties={properties}
        reports={reports}
        onSave={handleSave}
        isLoading={createMediaMutation.isPending || updateMediaMutation.isPending}
      />
    </>
  );
}
