'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/shared/Modal';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import type {
  ServicePlan,
  CreateServicePlanInput,
  UpdateServicePlanInput,
  PlanBillingType,
  ServicePlanStatus,
} from '@/lib/api/services/service-plan.service';

const servicePlanSchema = z.object({
  name: z.string().min(2, 'Plan name must be at least 2 characters'),
  price: z.coerce.number().min(0, 'Price must be 0 or greater'),
  currency: z.string().min(1, 'Currency is required'),
  billingType: z.enum(['MONTHLY', 'ONE_TIME']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']),
  description: z.string().optional(),
});

export type ServicePlanFormValues = z.infer<typeof servicePlanSchema>;

interface ServicePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: ServicePlan;
  onSave: (payload: CreateServicePlanInput | UpdateServicePlanInput) => Promise<void>;
  isLoading?: boolean;
}

export default function ServicePlanModal({
  isOpen,
  onClose,
  plan,
  onSave,
  isLoading = false,
}: ServicePlanModalProps) {
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [featureError, setFeatureError] = useState<string | null>(null);

  const getFormDefaults = (p?: ServicePlan): ServicePlanFormValues => ({
    name: p?.name || '',
    price: p?.price !== undefined ? Number(p.price) : 0,
    currency: p?.currency || 'USD',
    billingType: (p?.billingType as PlanBillingType) || 'MONTHLY',
    status: (p?.status as ServicePlanStatus) || 'ACTIVE',
    description: p?.description || '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServicePlanFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(servicePlanSchema) as any,
    defaultValues: getFormDefaults(plan),
  });


  useEffect(() => {
    if (isOpen) {
      reset(getFormDefaults(plan));
      setFeatures(plan?.features && Array.isArray(plan.features) ? [...plan.features] : []);
      setFeatureInput('');
      setFeatureError(null);
    }
  }, [isOpen, plan, reset]);

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;

    if (features.includes(trimmed)) {
      setFeatureError('Feature already exists in list');
      return;
    }

    setFeatures((prev) => [...prev, trimmed]);
    setFeatureInput('');
    setFeatureError(null);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const onSubmit = async (data: ServicePlanFormValues) => {
    const payload: CreateServicePlanInput = {
      name: data.name,
      price: data.price,
      currency: data.currency,
      billingType: data.billingType,
      status: data.status,
      description: data.description?.trim() || undefined,
      features,
    };

    await onSave(payload);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setFeatures([]);
    setFeatureInput('');
    setFeatureError(null);
    onClose();
  };

  const isPending = isSubmitting || isLoading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={plan ? 'Edit Service Plan' : 'Add Service Plan'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="gold" form="service-plan-form" type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : plan ? 'Update Plan' : 'Create Plan'}
          </Button>
        </>
      }
    >
      <form id="service-plan-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Plan Name *"
            placeholder="e.g. Property Steward Plan"
            error={errors.name?.message}
            {...register('name')}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Price *"
              type="number"
              step="0.01"
              placeholder="99.99"
              error={errors.price?.message}
              {...register('price')}
            />
            <Input
              label="Currency *"
              placeholder="USD"
              error={errors.currency?.message}
              {...register('currency')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Billing Type *"
            options={[
              { value: 'MONTHLY', label: 'Monthly' },
              { value: 'ONE_TIME', label: 'One Time' },
            ]}
            error={errors.billingType?.message}
            {...register('billingType')}
          />
          <Select
            label="Status *"
            options={[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'INACTIVE', label: 'Inactive' },
              { value: 'ARCHIVED', label: 'Archived' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <Input
          label="Description"
          placeholder="Brief description of what this service plan provides..."
          error={errors.description?.message}
          {...register('description')}
        />

        {/* Features Management Section */}
        <div className="flex flex-col gap-2 pt-2 border-t border-dark-400/60">
          <label className="text-sm text-dark-200">Plan Features / Deliverables</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => {
                setFeatureInput(e.target.value);
                if (featureError) setFeatureError(null);
              }}
              onKeyDown={handleFeatureKeyDown}
              placeholder="Add a feature (e.g. 2 visits per month)"
              className="flex-1 bg-bg border border-dark-400 rounded-[4px] px-3 py-2 text-sm text-white placeholder-dark-200/50 focus:outline-none focus:ring-2 focus:ring-gold-focus/60 focus:border-gold-focus"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddFeature}
              className="!px-4 !py-2 shrink-0"
            >
              + Add
            </Button>
          </div>
          {featureError && <span className="text-xs text-danger">{featureError}</span>}

          {features.length > 0 ? (
            <ul className="flex flex-col gap-2 mt-2 max-h-48 overflow-y-auto pr-1">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-3 bg-dark-600 border border-dark-400 rounded px-3 py-2 text-sm text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-gold-mid shrink-0" />
                    {feature}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-white/60 hover:text-red-400 text-xs font-medium px-1.5 py-0.5 rounded transition-colors"
                    title="Remove feature"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-dark-200/70 italic mt-1">No features added yet.</p>
          )}
        </div>
      </form>
    </Modal>
  );
}
