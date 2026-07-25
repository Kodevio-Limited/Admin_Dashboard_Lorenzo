'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import type { Property } from '@/types/property';
import type { Client } from '@/types/client';

const propertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  parish: z.string().min(1, 'Parish is required'),
  gpsCoordinates: z.string().optional(),
  propertyType: z.enum(['Residential', 'Commercial', 'Vacant Land', 'Industrial', 'Mixed Use']),
  clientId: z.string().min(1, 'Client is required'),
  servicePlan: z.enum(['Premium', 'Standard', 'Basic']),
  assignedFieldRep: z.string().min(1, 'Field rep is required'),
  nextVisitDate: z.string().optional(),
  reportStatus: z.enum(['Up to Date', 'Pending', 'Overdue', 'Not Started']),
  notes: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  clients: Client[];
  onSave: (data: PropertyFormData & { clientName: string }) => Promise<void>;
}

const PARISHES = [
  'St. Ann', 'Trelawny', 'Kingston', 'Montego Bay',
  'Hanover', 'Westmoreland', 'Manchester', 'St. Catherine',
];

const FIELD_REPS = ['Owen Reid', 'Kareem James', 'Shane Gordon', 'Tanya Samuels'];

export default function PropertyModal({ isOpen, onClose, property, clients, onSave }: PropertyModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: property?.name || '',
      parish: property?.parish || '',
      gpsCoordinates: property?.gpsCoordinates || '',
      propertyType: property?.propertyType || 'Commercial',
      clientId: property?.clientId || '',
      servicePlan: property?.servicePlan || 'Standard',
      assignedFieldRep: property?.assignedFieldRep || '',
      nextVisitDate: property?.nextVisitDate || '',
      reportStatus: property?.reportStatus || 'Not Started',
      notes: property?.notes || '',
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    const client = clients.find((c) => c.id === data.clientId);
    await onSave({
      ...data,
      clientName: client?.name || '',
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={property ? 'Edit Property' : 'Add Property'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="gold" form="property-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="property-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Property Name" error={errors.name?.message} {...register('name')} />
          <Select
            label="Parish"
            placeholder="Select parish"
            options={PARISHES.map((p) => ({ value: p, label: p }))}
            error={errors.parish?.message}
            {...register('parish')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="GPS Coordinates" error={errors.gpsCoordinates?.message} {...register('gpsCoordinates')} />
          <Select
            label="Property Type"
            options={[
              { value: 'Residential', label: 'Residential' },
              { value: 'Commercial', label: 'Commercial' },
              { value: 'Vacant Land', label: 'Vacant Land' },
              { value: 'Industrial', label: 'Industrial' },
              { value: 'Mixed Use', label: 'Mixed Use' },
            ]}
            error={errors.propertyType?.message}
            {...register('propertyType')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Assigned Client"
            placeholder="Select a client"
            options={clients.map((c) => ({ value: c.id, label: c.name }))}
            error={errors.clientId?.message}
            {...register('clientId')}
          />
          <Select
            label="Service Plan"
            options={[
              { value: 'Premium', label: 'Premium' },
              { value: 'Standard', label: 'Standard' },
              { value: 'Basic', label: 'Basic' },
            ]}
            error={errors.servicePlan?.message}
            {...register('servicePlan')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Assigned Field Rep"
            placeholder="Select field rep"
            options={FIELD_REPS.map((r) => ({ value: r, label: r }))}
            error={errors.assignedFieldRep?.message}
            {...register('assignedFieldRep')}
          />
          <Input label="Next Visit Date" type="date" error={errors.nextVisitDate?.message} {...register('nextVisitDate')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Report Status"
            options={[
              { value: 'Up to Date', label: 'Up to Date' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Overdue', label: 'Overdue' },
              { value: 'Not Started', label: 'Not Started' },
            ]}
            error={errors.reportStatus?.message}
            {...register('reportStatus')}
          />
        </div>
        <Input label="Notes" error={errors.notes?.message} {...register('notes')} />
      </form>
    </Modal>
  );
}
