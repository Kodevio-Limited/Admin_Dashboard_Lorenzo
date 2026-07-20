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
  location: z.string().min(1, 'Location is required'),
  clientId: z.string().min(1, 'Client is required'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  clients: Client[];
  onSave: (data: PropertyFormData & { clientName: string }) => Promise<void>;
}

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
      location: property?.location || '',
      clientId: property?.clientId || '',
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
        <Input label="Property Name" error={errors.name?.message} {...register('name')} />
        <Input label="Location" error={errors.location?.message} {...register('location')} />
        <Select
          label="Assigned Client"
          placeholder="Select a client"
          options={clients.map((c) => ({ value: c.id, label: c.name }))}
          error={errors.clientId?.message}
          {...register('clientId')}
        />
      </form>
    </Modal>
  );
}
