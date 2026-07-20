'use client';

import { useState } from 'react';
import Image from 'next/image';
import MediaCard from '@/components/media/MediaCard';
import MediaModal from '@/components/media/MediaModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useMedia } from '@/hooks/useMedia';
import { useProperties } from '@/hooks/useProperties';
import { useUIStore } from '@/store/uiStore';
import type { Media } from '@/types/media';

export default function MediaPage() {
  const { data, isLoading, create, update } = useMedia();
  const { data: properties } = useProperties();
  const addToast = useUIStore((s) => s.addToast);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Media | undefined>();

  const handleEdit = (media: Media) => {
    setEditing(media);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const handleSave = async (formData: {
    propertyId: string;
    type: string;
    propertyName: string;
    fileName: string;
    fileUrl: string;
    uploadDate: string;
  }) => {
    if (editing) {
      await update(editing.id, formData);
      addToast('Media updated successfully', 'success');
    } else {
      await create(formData);
      addToast('Media uploaded successfully', 'success');
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
          <div className="flex flex-col items-start gap-[10px]">
            <h2 className="text-[24px] font-medium text-white leading-[1.3]">Media</h2>
            <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
              Manage your media files.
            </span>
          </div>
        </div>
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Media</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage your media files.
          </span>
        </div>
        <Button
          variant="gold"
          onClick={handleAdd}
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px]"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Upload Media
        </Button>
      </div>
      <div className="px-6">
        {data.length === 0 ? (
          <div className="text-center py-12 text-dark-200">
            No media yet. Upload your first media item.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((item) => (
              <MediaCard key={item.id} media={item} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        media={editing}
        properties={properties}
        onSave={handleSave}
      />
    </>
  );
}
