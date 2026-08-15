'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import { attachmentService } from '@/lib/api/services/attachment.service';
import { useUIStore } from '@/store/uiStore';
import type { Report, CreateReportInput } from '@/types/report';
import type { Client } from '@/types/client';
import type { Property } from '@/types/property';

const reportSchema = z.object({
  title: z.string().min(2, 'Report title must be at least 2 characters'),
  visitDate: z.string().min(1, 'Visit date is required'),
  parish: z.string().min(1, 'Parish is required'),
  propertyId: z.string().min(1, 'Property is required'),
  clientId: z.string().min(1, 'Client is required'),
  fieldRep: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report?: Report;
  properties: Property[];
  clients: Client[];
  onSave: (data: CreateReportInput) => Promise<void>;
  isLoading?: boolean;
}

const PARISHES = [
  'Kingston', 'St. Andrew', 'St. Catherine', 'Clarendon', 'Manchester',
  'St. Elizabeth', 'Westmoreland', 'Hanover', 'St. James', 'Trelawny',
  'St. Ann', 'St. Mary', 'Portland', 'St. Thomas',
];

export default function ReportModal({
  isOpen,
  onClose,
  report,
  properties,
  clients,
  onSave,
  isLoading = false,
}: ReportModalProps) {
  const addToast = useUIStore((s) => s.addToast);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState(report?.fileName || report?.attachment?.originalName || '');
  const [attachmentId, setAttachmentId] = useState(report?.attachmentId || '');
  const [isUploading, setIsUploading] = useState(false);

  const getFormDefaults = (r?: Report): ReportFormValues => {
    let dateStr = '';
    if (r?.visitDate) {
      dateStr = new Date(r.visitDate).toISOString().split('T')[0];
    }
    return {
      title: r?.title || '',
      visitDate: dateStr,
      parish: r?.parish || 'Kingston',
      propertyId: r?.propertyId !== undefined ? String(r.propertyId) : '',
      clientId: r?.clientId !== undefined ? String(r.clientId) : '',
      fieldRep: r?.fieldRep || r?.assignedFieldRep || '',
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: getFormDefaults(report),
  });

  useEffect(() => {
    if (isOpen) {
      reset(getFormDefaults(report));
      setFileName(report?.fileName || report?.attachment?.originalName || '');
      setAttachmentId(report?.attachmentId || '');
      setSelectedFile(null);
    }
  }, [isOpen, report, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
    setIsUploading(true);

    try {
      // Step 1: Upload Attachment File to /api/v1/attachments
      const uploadRes = await attachmentService.upload(file, 'REPORT_PDF');
      setAttachmentId(uploadRes.id);
      addToast('PDF file uploaded successfully', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'File upload failed';
      addToast(msg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ReportFormValues) => {
    if (!attachmentId) {
      addToast('Please upload a PDF report attachment before saving', 'error');
      return;
    }

    const visitDateISO = new Date(data.visitDate).toISOString();

    const payload: CreateReportInput = {
      title: data.title,
      visitDate: visitDateISO,
      parish: data.parish,
      propertyId: parseInt(data.propertyId, 10),
      fieldRep: data.fieldRep || 'Admin',
      clientId: parseInt(data.clientId, 10),
      attachmentId: attachmentId,
    };

    await onSave(payload);
    reset();
    setFileName('');
    setAttachmentId('');
    setSelectedFile(null);
    onClose();
  };

  const handleClose = () => {
    reset();
    setFileName('');
    setAttachmentId('');
    setSelectedFile(null);
    onClose();
  };

  const isPending = isSubmitting || isLoading || isUploading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={report ? 'Edit Report' : 'Upload Report'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="gold" form="report-form" type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="report-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Report Title *" error={errors.title?.message} {...register('title')} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Visit Date *" type="date" error={errors.visitDate?.message} {...register('visitDate')} />
          <Select
            label="Parish *"
            placeholder="Select parish"
            options={PARISHES.map((p) => ({ value: p, label: p }))}
            error={errors.parish?.message}
            {...register('parish')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Select Property *"
            placeholder="Select a property"
            options={properties.map((p) => ({ value: String(p.id), label: `${p.name} (${p.parish || ''})` }))}
            error={errors.propertyId?.message}
            {...register('propertyId')}
          />
          <Select
            label="Assign Client *"
            placeholder="Select a client"
            options={clients.map((c) => ({
              value: String(c.id),
              label: [c.firstName, c.lastName].filter(Boolean).join(' ') || c.name || c.email,
            }))}
            error={errors.clientId?.message}
            {...register('clientId')}
          />
        </div>
        <Input
          label="Assigned Field Rep"
          placeholder="Enter field rep name (Optional)"
          error={errors.fieldRep?.message}
          {...register('fieldRep')}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white">Upload PDF Attachment *</label>
          <label className="cursor-pointer">
            <div className="w-full bg-dark-500 border-2 border-dark-400 border-dashed rounded-lg px-6 py-8 flex flex-col items-center justify-center gap-3 hover:border-amber-400/60 hover:bg-dark-600/30 transition-colors">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-amber-400 font-medium">Uploading attachment file...</span>
                </div>
              ) : (
                <>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="#989898" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm text-dark-200">
                    {fileName ? `Selected: ${fileName}` : 'Click to select and upload a PDF report file'}
                  </span>
                  {attachmentId && (
                    <span className="text-xs text-green-400 font-medium">✓ Uploaded & Linked (ID: {attachmentId.substring(0, 8)}...)</span>
                  )}
                </>
              )}
            </div>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </form>
    </Modal>
  );
}
