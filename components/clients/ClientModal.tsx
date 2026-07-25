'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import type { Client } from '@/types/client';

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  whatsapp: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  servicePlan: z.enum(['Premium', 'Standard', 'Basic']),
  status: z.enum(['Active', 'Inactive', 'Pending']),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client;
  onSave: (data: ClientFormData) => Promise<void>;
}

export default function ClientModal({ isOpen, onClose, client, onSave }: ClientModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || '',
      email: client?.email || '',
      phone: client?.phone || '',
      whatsapp: client?.whatsapp || '',
      country: client?.country || 'Jamaica',
      servicePlan: client?.servicePlan || 'Standard',
      status: client?.status || 'Active',
      notes: client?.notes || '',
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    await onSave(data);
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
      title={client ? 'Edit Client' : 'Add Client'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="gold" form="client-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="client-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Client Name" error={errors.name?.message} {...register('name')} />
          <Input label="Email" error={errors.email?.message} {...register('email')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
          <Input label="WhatsApp" error={errors.whatsapp?.message} {...register('whatsapp')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Country" error={errors.country?.message} {...register('country')} />
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
            label="Status"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
              { value: 'Pending', label: 'Pending' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>
        <Input label="Notes" error={errors.notes?.message} {...register('notes')} />
      </form>
    </Modal>
  );
}
