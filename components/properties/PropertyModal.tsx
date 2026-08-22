'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import type { Property, PropertyType, ReportSubmissionStatus, PropertyServicePlanType, CreatePropertyInput } from '@/types/property';
import type { Client } from '@/types/client';

const propertySchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  name: z.string().min(2, 'Property name must be at least 2 characters'),
  parish: z.string().optional(),
  city: z.string().optional(),
  gpsCoordinates: z.string().optional(),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'VACANT_LAND', 'INDUSTRIAL', 'MIXED_USED', 'OTHER']),
  fieldRep: z.string().min(2, 'Field rep is required'),
  nextVisitDate: z.string().min(1, 'Next visit date is required'),
  reportSubmissionStatus: z.enum(['UPTODATE', 'PENDING', 'OVERDUE', 'NOTSTARTED']).optional(),
  servicePlanType: z.enum(['BASIC', 'STANDARD', 'PREMIUM']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']),
  note: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  clients: Client[];
  onSave: (data: CreatePropertyInput) => Promise<void>;
  isLoading?: boolean;
}

const PARISHES = [
  'Kingston', 'St. Andrew', 'St. Catherine', 'Clarendon', 'Manchester',
  'St. Elizabeth', 'Westmoreland', 'Hanover', 'St. James', 'Trelawny',
  'St. Ann', 'St. Mary', 'Portland', 'St. Thomas',
];

const FIELD_REPS = ['John Doe', 'Owen Reid', 'Kareem James', 'Shane Gordon', 'Tanya Samuels'];

function normalizeType(type?: string): 'RESIDENTIAL' | 'COMMERCIAL' | 'VACANT_LAND' | 'INDUSTRIAL' | 'MIXED_USED' | 'OTHER' {
  if (type === 'Residential' || type === 'RESIDENTIAL') return 'RESIDENTIAL';
  if (type === 'Commercial' || type === 'COMMERCIAL') return 'COMMERCIAL';
  if (type === 'Vacant Land' || type === 'VACANT_LAND') return 'VACANT_LAND';
  if (type === 'Industrial' || type === 'INDUSTRIAL') return 'INDUSTRIAL';
  if (type === 'Mixed Use' || type === 'MIXED_USED') return 'MIXED_USED';
  return 'OTHER';
}

function normalizeReportStatus(status?: string | null): 'UPTODATE' | 'PENDING' | 'OVERDUE' | 'NOTSTARTED' {
  if (status === 'Up to Date' || status === 'UPTODATE') return 'UPTODATE';
  if (status === 'Overdue' || status === 'OVERDUE') return 'OVERDUE';
  if (status === 'Not Started' || status === 'NOTSTARTED') return 'NOTSTARTED';
  return 'PENDING';
}

function normalizePlan(plan?: string | null): 'BASIC' | 'STANDARD' | 'PREMIUM' {
  if (plan === 'PREMIUM' || plan === 'Premium' || plan === 'PRO') return 'PREMIUM';
  if (plan === 'STANDARD' || plan === 'Standard') return 'STANDARD';
  return 'BASIC';
}

function normalizePropertyStatus(status?: string | null): 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' {
  if (status === 'INACTIVE' || status === 'Inactive') return 'INACTIVE';
  if (status === 'ARCHIVED' || status === 'Archived') return 'ARCHIVED';
  return 'ACTIVE';
}

export default function PropertyModal({
  isOpen,
  onClose,
  property,
  clients,
  onSave,
  isLoading = false,
}: PropertyModalProps) {
  const getFormDefaults = (p?: Property): PropertyFormValues => {
    let dateStr = '';
    if (p?.nextVisitDate) {
      dateStr = new Date(p.nextVisitDate).toISOString().split('T')[0];
    }

    return {
      clientId: p?.clientId !== undefined ? String(p.clientId) : '',
      name: p?.name || '',
      parish: p?.parish || 'Kingston',
      city: p?.city || 'Kingston',
      gpsCoordinates: p?.gpsCoordinates || '',
      type: normalizeType(p?.type || p?.propertyType),
      fieldRep: p?.fieldRep || p?.assignedFieldRep || '',
      nextVisitDate: dateStr,
      reportSubmissionStatus: normalizeReportStatus(p?.reportSubmissionStatus || p?.reportStatus),
      servicePlanType: normalizePlan(p?.servicePlantype || p?.servicePlanType || p?.servicePlan),
      status: normalizePropertyStatus(p?.status),
      note: p?.note || p?.notes || '',
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: getFormDefaults(property),
  });

  useEffect(() => {
    if (isOpen) {
      reset(getFormDefaults(property));
    }
  }, [isOpen, property, reset]);

  const onSubmit = async (data: PropertyFormValues) => {
    const nextVisitDateISO = new Date(data.nextVisitDate).toISOString();

    const cleanPayload: CreatePropertyInput = {
      clientId: parseInt(data.clientId, 10),
      name: data.name,
      type: data.type,
      fieldRep: data.fieldRep,
      nextVisitDate: nextVisitDateISO,
      servicePlanType: data.servicePlanType,
      status: data.status,
    };

    if (data.parish && data.parish.trim() !== '') cleanPayload.parish = data.parish;
    if (data.city && data.city.trim() !== '') cleanPayload.city = data.city;
    if (data.gpsCoordinates && data.gpsCoordinates.trim() !== '') cleanPayload.gpsCoordinates = data.gpsCoordinates;
    if (data.reportSubmissionStatus) cleanPayload.reportSubmissionStatus = data.reportSubmissionStatus;
    if (data.note && data.note.trim() !== '') cleanPayload.note = data.note;

    await onSave(cleanPayload);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const isPending = isSubmitting || isLoading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={property ? 'Edit Property' : 'Add Property'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="gold" form="property-form" type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="property-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Property Name *" error={errors.name?.message} {...register('name')} />
          <Select
            label="Assigned Client *"
            placeholder="Select a client"
            options={clients.map((c) => ({
              value: String(c.id),
              label: [c.firstName, c.lastName].filter(Boolean).join(' ') || c.name || c.email,
            }))}
            error={errors.clientId?.message}
            {...register('clientId')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Parish"
            placeholder="Select parish"
            options={PARISHES.map((p) => ({ value: p, label: p }))}
            error={errors.parish?.message}
            {...register('parish')}
          />
          <Input label="City" placeholder="Kingston" error={errors.city?.message} {...register('city')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="GPS Coordinates" placeholder="18.0179,-76.8099" error={errors.gpsCoordinates?.message} {...register('gpsCoordinates')} />
          <Select
            label="Property Type *"
            options={[
              { value: 'RESIDENTIAL', label: 'Residential' },
              { value: 'COMMERCIAL', label: 'Commercial' },
              { value: 'VACANT_LAND', label: 'Vacant Land' },
              { value: 'INDUSTRIAL', label: 'Industrial' },
              { value: 'MIXED_USED', label: 'Mixed Used' },
              { value: 'OTHER', label: 'Other' },
            ]}
            error={errors.type?.message}
            {...register('type')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Assigned Field Rep *"
            placeholder="Enter field rep name"
            error={errors.fieldRep?.message}
            {...register('fieldRep')}
          />
          <Input label="Next Visit Date *" type="date" error={errors.nextVisitDate?.message} {...register('nextVisitDate')} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Report Submission Status"
            options={[
              { value: 'PENDING', label: 'Pending' },
              { value: 'UPTODATE', label: 'Up to Date' },
              { value: 'OVERDUE', label: 'Overdue' },
              { value: 'NOTSTARTED', label: 'Not Started' },
            ]}
            error={errors.reportSubmissionStatus?.message}
            {...register('reportSubmissionStatus')}
          />
          <Select
            label="Service Plan Type *"
            options={[
              { value: 'BASIC', label: 'BASIC' },
              { value: 'STANDARD', label: 'STANDARD' },
              { value: 'PREMIUM', label: 'PREMIUM' },
            ]}
            error={errors.servicePlanType?.message}
            {...register('servicePlanType')}
          />
          <Select
            label="Property Status *"
            options={[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'INACTIVE', label: 'Inactive' },
              { value: 'ARCHIVED', label: 'Archived' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <Input label="Property Note" error={errors.note?.message} {...register('note')} />
      </form>
    </Modal>
  );
}

