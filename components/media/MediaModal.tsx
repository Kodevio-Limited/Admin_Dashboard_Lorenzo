'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Select } from '@/components/shared/Select';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import type { Media } from '@/types/media';
import type { Property } from '@/types/property';
import type { Report } from '@/types/report';

const mediaSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  type: z.enum(['Image', 'Document', 'Video']),
  reportId: z.string().min(1, 'Report is required'),
});

type MediaFormData = z.infer<typeof mediaSchema>;

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media?: Media;
  properties: Property[];
  reports: Report[];
  onSave: (data: MediaFormData & { propertyName: string; reportName: string; parish: string; fileName: string; fileUrl: string; uploadDate: string }) => Promise<void>;
}

export default function MediaModal({ isOpen, onClose, media, properties, reports, onSave }: MediaModalProps) {
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      propertyId: media?.propertyId || '',
      type: media?.type || 'Image',
      reportId: media?.reportId || '',
    },
  });

  const selectedPropertyId = watch('propertyId');
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);
  const filteredReports = selectedPropertyId
    ? reports.filter((r) => r.propertyId === selectedPropertyId)
    : reports;

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const onSubmit = async (data: MediaFormData) => {
    const property = properties.find((p) => p.id === data.propertyId);
    const report = reports.find((r) => r.id === data.reportId);
    await onSave({
      ...data,
      propertyName: property?.name || '',
      parish: property?.parish || '',
      reportName: report?.title || '',
      fileName,
      fileUrl: previewUrl,
      uploadDate: media?.uploadDate || new Date().toISOString().split('T')[0],
    });
    reset();
    setFileName('');
    setPreviewUrl('');
    onClose();
  };

  const handleClose = () => {
    reset();
    setFileName('');
    setPreviewUrl('');
    onClose();
  };

  return (
    <Modal
      key={media?.id || 'new'}
      isOpen={isOpen}
      onClose={handleClose}
      title={media ? 'Edit Media' : 'Upload Media'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="gold" form="media-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="media-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Select
          label="Select Property"
          placeholder="Select a property"
          options={properties.map((p) => ({ value: p.id, label: `${p.name} (${p.parish})` }))}
          error={errors.propertyId?.message}
          {...register('propertyId')}
        />
        <Select
          label="Select Report"
          placeholder="Select a report"
          options={filteredReports.map((r) => ({ value: r.id, label: r.title }))}
          error={errors.reportId?.message}
          {...register('reportId')}
        />
        <Select
          label="Media Type"
          options={[
            { value: 'Image', label: 'Image' },
            { value: 'Document', label: 'Document' },
            { value: 'Video', label: 'Video' },
          ]}
          error={errors.type?.message}
          {...register('type')}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-dark-200">File Upload</label>
          <label className="cursor-pointer">
            <div className="w-full bg-bg border-2 border-dark-400 border-dashed rounded-[8px] px-6 py-8 flex flex-col items-center justify-center gap-3 hover:border-gold-focus hover:bg-dark-600/30 transition-colors">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#989898" strokeWidth="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="#989898"/>
                <path d="M21 15L16 10L5 21" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-dark-200">
                {fileName || (media ? media.fileName : 'Click to upload a file')}
              </span>
              {fileName && (
                <span className="text-xs text-dark-100/60">{fileName}</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*,.pdf,.mp4,.mov"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>
        {previewUrl && (
          <div className="relative w-full h-48 mt-2">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain rounded-[4px] border border-dark-400"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </form>
    </Modal>
  );
}
