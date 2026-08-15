'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import type { Client, ServicePlanType, ClientStatus } from '@/types/client';

const clientSchema = z.object({
  firstName: z.string().min(2, 'First Name must be at least 2 characters'),
  lastName: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  servicePlanType: z.enum(['BASIC', 'STANDARD', 'PREMIUM']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'ARCHIVED']).optional(),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client;
  onSave: (data: ClientFormData) => Promise<void>;
  isLoading?: boolean;
}

function normalizePlan(plan?: string): 'BASIC' | 'STANDARD' | 'PREMIUM' {
  if (plan === 'PREMIUM' || plan === 'Premium' || plan === 'PRO') return 'PREMIUM';
  if (plan === 'STANDARD' || plan === 'Standard') return 'STANDARD';
  return 'BASIC';
}

function normalizeStatus(status?: string): 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ARCHIVED' {
  if (status === 'INACTIVE' || status === 'Inactive') return 'INACTIVE';
  if (status === 'PENDING' || status === 'Pending') return 'PENDING';
  if (status === 'ARCHIVED') return 'ARCHIVED';
  return 'ACTIVE';
}

export default function ClientModal({
  isOpen,
  onClose,
  client,
  onSave,
  isLoading = false,
}: ClientModalProps) {
  const getFormDefaults = (c?: Client): ClientFormData => {
    const prof = c?.clientProfile;
    const plan = prof?.servicePlantype || prof?.servicePlanType || prof?.servicePlan || c?.servicePlanType || c?.servicePlan;
    return {
      firstName: c?.firstName || c?.name || '',
      lastName: c?.lastName || '',
      email: c?.email || '',
      phone: c?.phone || '',
      whatsapp: prof?.whatsapp || c?.whatsapp || '',
      country: prof?.country || c?.country || 'Jamaica',
      servicePlanType: normalizePlan(plan),
      status: normalizeStatus(prof?.status || c?.status),
      notes: prof?.notes || c?.notes || '',
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: getFormDefaults(client),
  });

  useEffect(() => {
    if (isOpen) {
      reset(getFormDefaults(client));
    }
  }, [isOpen, client, reset]);

  const onSubmit = async (data: ClientFormData) => {
    // Construct clean payload matching NestJS CreateClientDto / UpdateClientDto exactly
    const cleanPayload: ClientFormData = {
      firstName: data.firstName,
      email: data.email,
      country: data.country || 'Jamaica',
      servicePlanType: data.servicePlanType,
    };

    if (data.lastName && data.lastName.trim() !== '') cleanPayload.lastName = data.lastName;
    if (data.phone && data.phone.trim() !== '') cleanPayload.phone = data.phone;
    if (data.whatsapp && data.whatsapp.trim() !== '') cleanPayload.whatsapp = data.whatsapp;
    if (data.status) cleanPayload.status = data.status;
    if (data.notes && data.notes.trim() !== '') cleanPayload.notes = data.notes;

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
      title={client ? 'Edit Client' : 'Add Client'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="gold" form="client-form" type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form id="client-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name *" error={errors.firstName?.message} {...register('firstName')} />
          <Input label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Email *" error={errors.email?.message} {...register('email')} />
          <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="WhatsApp" error={errors.whatsapp?.message} {...register('whatsapp')} />
          <Input label="Country *" error={errors.country?.message} {...register('country')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Service Plan *"
            options={[
              { value: 'BASIC', label: 'BASIC' },
              { value: 'STANDARD', label: 'STANDARD' },
              { value: 'PREMIUM', label: 'PREMIUM' },
            ]}
            error={errors.servicePlanType?.message}
            {...register('servicePlanType')}
          />
          <Select
            label="Status"
            options={[
              { value: 'ACTIVE', label: 'ACTIVE' },
              { value: 'INACTIVE', label: 'INACTIVE' },
              { value: 'PENDING', label: 'PENDING' },
              { value: 'ARCHIVED', label: 'ARCHIVED' },
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
