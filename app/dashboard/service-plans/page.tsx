'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/shared/Button';
import ServicePlanModal from '@/components/service-plans/ServicePlanModal';
import {
  useGetServicePlans,
  useCreateServicePlan,
  useUpdateServicePlan,
} from '@/hooks/api/useServicePlans';
import { useUIStore } from '@/store/uiStore';
import type {
  ServicePlan,
  CreateServicePlanInput,
  UpdateServicePlanInput,
} from '@/lib/api/services/service-plan.service';

export default function ServicePlansPage() {
  const addToast = useUIStore((s) => s.addToast);

  const { data: plans = [], isLoading, isError, error } = useGetServicePlans();
  const createPlanMutation = useCreateServicePlan();
  const updatePlanMutation = useUpdateServicePlan();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ServicePlan | undefined>(undefined);

  const handleAddPlan = () => {
    setEditingPlan(undefined);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan: ServicePlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleSave = async (payload: CreateServicePlanInput | UpdateServicePlanInput) => {
    try {
      if (editingPlan) {
        await updatePlanMutation.mutateAsync({
          id: editingPlan.id,
          data: payload,
        });
        addToast('Service plan updated successfully', 'success');
      } else {
        await createPlanMutation.mutateAsync(payload as CreateServicePlanInput);
        addToast('Service plan created successfully', 'success');
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save service plan';
      addToast(errorMessage, 'error');
    }
  };

  const getStatusVariant = (status?: string) => {
    if (!status || status === 'ACTIVE') return 'green';
    if (status === 'INACTIVE') return 'gray';
    return 'yellow';
  };

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Service Plans</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            View and manage active verification and advisory service plans.
          </span>
        </div>

        <Button
          variant="gold"
          onClick={handleAddPlan}
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px]"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Add Service Plan
        </Button>
      </div>

      <div className="px-6 pb-6">
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load service plans: {error?.message || 'Unknown error'}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-dark-600 rounded-[8px] p-5 border border-dark-400 animate-pulse space-y-3">
                <div className="h-5 bg-dark-400 rounded w-1/2" />
                <div className="h-8 bg-dark-400 rounded w-1/3" />
                <div className="h-4 bg-dark-400 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12 bg-dark-600 rounded-[8px] border border-dark-400">
            <p className="text-dark-200 mb-4">No service plans found.</p>
            <Button variant="gold" onClick={handleAddPlan} className="!px-4 !py-2 text-sm">
              Create First Service Plan
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-dark-600 rounded-[8px] p-5 border border-dark-400 flex flex-col justify-between gap-5 hover:border-gold-mid/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[16px] font-medium text-white leading-[1.3]">{plan.name}</h3>
                    <StatusBadge
                      label={plan.status || 'ACTIVE'}
                      variant={getStatusVariant(plan.status)}
                    />
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[28px] font-bold text-white leading-[1.1]">
                      {plan.currency === 'USD' || !plan.currency ? '$' : `${plan.currency} `}
                      {plan.price}
                    </span>
                    <span className="text-[13px] font-normal text-dark-100 leading-[1.2] uppercase">
                      /{plan.billingType === 'MONTHLY' ? 'MONTH' : 'ONE-TIME'}
                    </span>
                  </div>

                  {plan.description && (
                    <p className="text-[13px] text-dark-200 leading-[1.4]">{plan.description}</p>
                  )}

                  {plan.features && plan.features.length > 0 && (
                    <ul className="flex flex-col gap-1.5 pt-3 border-t border-dark-400/50">
                      {plan.features.map((f, i) => (
                        <li key={i} className="text-[13px] font-normal text-dark-200 leading-[1.3] flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-gold-mid shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-dark-400/40 flex items-center justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleEditPlan(plan)}
                    className="!px-3 !py-1.5 !text-[12px] flex items-center gap-1.5"
                  >
                    <Image src="/assets/icons/edit-icon.svg" alt="" width={14} height={14} aria-hidden="true" />
                    Edit Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ServicePlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={editingPlan}
        onSave={handleSave}
        isLoading={createPlanMutation.isPending || updatePlanMutation.isPending}
      />
    </>
  );
}

