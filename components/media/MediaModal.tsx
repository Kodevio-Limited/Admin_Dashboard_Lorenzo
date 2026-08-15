'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import { attachmentService, AttachmentType } from '@/lib/api/services/attachment.service';
import { useUIStore } from '@/store/uiStore';
import type { Media, CreateMediaInput, BackendMediaType } from '@/types/media';
import type { Property } from '@/types/property';
import type { Report } from '@/types/report';

const mediaSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  reportId: z.string().min(1, 'Report is required'),
  type: z.enum(['PHOTO', 'VIDEO', 'DOCUMENT']),
});

export type MediaFormValues = z.infer<typeof mediaSchema>;

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media?: Media;
  properties: Property[];
  reports: Report[];
  onSave: (data: CreateMediaInput) => Promise<void>;
  isLoading?: boolean;
}

function normalizeMediaType(type?: string): BackendMediaType {
  if (type === 'PHOTO' || type === 'Image') return 'PHOTO';
  if (type === 'VIDEO' || type === 'Video') return 'VIDEO';
  return 'DOCUMENT';
}

export default function MediaModal({
  isOpen,
  onClose,
  media,
  properties,
  reports,
  onSave,
  isLoading = false,
}: MediaModalProps) {
  const addToast = useUIStore((s) => s.addToast);
  const [fileName, setFileName] = useState(media?.fileName || media?.attachment?.originalName || '');
  const [attachmentId, setAttachmentId] = useState(media?.attachmentId || '');
  const [isUploading, setIsUploading] = useState(false);

  const getFormDefaults = (m?: Media): MediaFormValues => {
    return {
      propertyId: m?.propertyId !== undefined ? String(m.propertyId) : '',
      reportId: m?.reportId !== undefined ? String(m.reportId) : '',
      type: normalizeMediaType(m?.type),
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: getFormDefaults(media),
  });

  const selectedPropertyId = watch('propertyId');
  const filteredReports = selectedPropertyId
    ? reports.filter((r) => String(r.propertyId) === selectedPropertyId)
    : reports;

  useEffect(() => {
    if (isOpen) {
      reset(getFormDefaults(media));
      setFileName(media?.fileName || media?.attachment?.originalName || '');
      setAttachmentId(media?.attachmentId || '');
    }
  }, [isOpen, media, reset]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    const mediaType = watch('type');
    let attachmentType: AttachmentType = 'DOCUMENT';
    if (mediaType === 'PHOTO') attachmentType = 'PROPERTY_IMAGE';
    if (mediaType === 'VIDEO') attachmentType = 'PROPERTY_VIDEO';

    try {
      // Upload file to /api/v1/attachments
      const uploadRes = await attachmentService.upload(file, attachmentType);
      setAttachmentId(uploadRes.id);
      addToast('File uploaded successfully', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'File upload failed';
      addToast(msg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: MediaFormValues) => {
    if (!attachmentId) {
      addToast('Please upload a file attachment before saving media', 'error');
      return;
    }

    const payload: CreateMediaInput = {
      propertyId: parseInt(data.propertyId, 10),
      reportId: parseInt(data.reportId, 10),
      type: data.type,
      attachmentId: attachmentId,
    };

    await onSave(payload);
    reset();
    setFileName('');
    setAttachmentId('');
    onClose();
  };

  const handleClose = () => {
    reset();
    setFileName('');
    setAttachmentId('');
    onClose();
  };

  const isPending = isSubmitting || isLoading || isUploading;

  return (
    <Modal
      key={media?.id || 'new'}
      isOpen={isOpen}
      onClose={handleClose}
      title={media ? 'Edit Media' : 'Upload Media'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="gold" form="media-form" type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="media-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Select
          label="Select Property *"
          placeholder="Select a property"
          options={properties.map((p) => ({ value: String(p.id), label: `${p.name} (${p.parish || ''})` }))}
          error={errors.propertyId?.message}
          {...register('propertyId')}
        />
        <Select
          label="Select Report *"
          placeholder="Select a report"
          options={filteredReports.map((r) => ({ value: String(r.id), label: r.title }))}
          error={errors.reportId?.message}
          {...register('reportId')}
        />
        <Select
          label="Media Type *"
          options={[
            { value: 'PHOTO', label: 'Photo' },
            { value: 'VIDEO', label: 'Video' },
            { value: 'DOCUMENT', label: 'Document' },
          ]}
          error={errors.type?.message}
          {...register('type')}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white">Upload File Attachment *</label>
          <label className="cursor-pointer">
            <div className="w-full bg-dark-500 border-2 border-dark-400 border-dashed rounded-lg px-6 py-8 flex flex-col items-center justify-center gap-3 hover:border-amber-400/60 hover:bg-dark-600/30 transition-colors">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-amber-400 font-medium">Uploading media file...</span>
                </div>
              ) : (
                <>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#989898" strokeWidth="1.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="#989898"/>
                    <path d="M21 15L16 10L5 21" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-dark-200">
                    {fileName ? `Selected: ${fileName}` : 'Click to select and upload a media file'}
                  </span>
                  {attachmentId && (
                    <span className="text-xs text-green-400 font-medium">✓ Uploaded & Linked (ID: {attachmentId.substring(0, 8)}...)</span>
                  )}
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*,.pdf,.mp4,.mov"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        </div>
      </form>
    </Modal>
  );
}
