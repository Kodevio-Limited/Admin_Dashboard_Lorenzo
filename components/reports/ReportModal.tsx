'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import type { Report } from '@/types/report';
import type { Client } from '@/types/client';
import type { Property } from '@/types/property';

const reportSchema = z.object({
  title: z.string().min(1, 'Report title is required'),
  propertyId: z.string().min(1, 'Property is required'),
  clientId: z.string().min(1, 'Client is required'),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report?: Report;
  properties: Property[];
  clients: Client[];
  onSave: (data: ReportFormData & { propertyName: string; clientName: string; uploadDate: string; fileName?: string }) => Promise<void>;
}

export default function ReportModal({ isOpen, onClose, report, properties, clients, onSave }: ReportModalProps) {
  const [fileName, setFileName] = useState(report?.fileName || '');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: report?.title || '',
      propertyId: report?.propertyId || '',
      clientId: report?.clientId || '',
    },
  });

  const onSubmit = async (data: ReportFormData) => {
    const property = properties.find((p) => p.id === data.propertyId);
    const client = clients.find((c) => c.id === data.clientId);
    await onSave({
      ...data,
      propertyName: property?.name || '',
      clientName: client?.name || '',
      uploadDate: report?.uploadDate || new Date().toISOString().split('T')[0],
      fileName: fileName || undefined,
    });
    reset();
    setFileName('');
    onClose();
  };

  const handleClose = () => {
    reset();
    setFileName(report?.fileName || '');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={report ? 'Edit Report' : 'Upload Report'}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="gold" form="report-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="report-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Report Title" error={errors.title?.message} {...register('title')} />
        <Select
          label="Select Property"
          placeholder="Select a property"
          options={properties.map((p) => ({ value: p.id, label: p.name }))}
          error={errors.propertyId?.message}
          {...register('propertyId')}
        />
        <Select
          label="Assign Client"
          placeholder="Select a client"
          options={clients.map((c) => ({ value: c.id, label: c.name }))}
          error={errors.clientId?.message}
          {...register('clientId')}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-dark-200">Upload File</label>
          <label className="cursor-pointer">
            <div className="w-full bg-bg border-2 border-dark-400 border-dashed rounded-[8px] px-6 py-8 flex flex-col items-center justify-center gap-3 hover:border-gold-focus hover:bg-dark-600/30 transition-colors">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V15" stroke="#989898" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-sm text-dark-200">
                {fileName || 'Click to upload a file'}
              </span>
              {fileName && (
                <span className="text-xs text-dark-100/60">{fileName}</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFileName(file.name);
              }}
            />
          </label>
        </div>
      </form>
    </Modal>
  );
}
