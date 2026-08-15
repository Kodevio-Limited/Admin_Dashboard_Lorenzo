'use client';

import { useState } from 'react';
import Image from 'next/image';
import DataTable from '@/components/shared/DataTable';
import { propertyColumns } from '@/components/properties/property-table-config';
import PropertyModal from '@/components/properties/PropertyModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useGetProperties, useCreateProperty, useUpdateProperty } from '@/hooks/api/useProperties';
import { useGetClients } from '@/hooks/api/useClients';
import { useUIStore } from '@/store/uiStore';
import type { Property, CreatePropertyInput } from '@/types/property';

export default function PropertiesPage() {
  const addToast = useUIStore((s) => s.addToast);

  // TanStack Query Hooks
  const { data: properties = [], isLoading, isError, error } = useGetProperties();
  const { data: clients = [] } = useGetClients();

  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProperty(undefined);
    setModalOpen(true);
  };

  const handleSave = async (payload: CreatePropertyInput) => {
    try {
      if (editingProperty) {
        await updatePropertyMutation.mutateAsync({
          id: editingProperty.id,
          data: payload,
        });
        addToast('Property updated successfully', 'success');
      } else {
        await createPropertyMutation.mutateAsync(payload);
        addToast('Property created successfully', 'success');
      }
      setModalOpen(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      addToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <div className="flex items-center gap-3">
            <h2 className="text-[24px] font-medium text-white leading-[1.3]">Properties</h2>
          </div>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage your properties and their details.
          </span>
        </div>
        <Button
          variant="gold"
          onClick={handleAdd}
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px]"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Add Property
        </Button>
      </div>

      <div className="px-6">
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load properties: {error?.message || 'Unknown error'}
          </div>
        )}

        <DataTable
          data={properties}
          columns={propertyColumns}
          isLoading={isLoading}
          emptyMessage="No properties found. Click 'Add Property' to create one."
          actions={{ onEdit: handleEdit }}
        />
      </div>

      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        property={editingProperty}
        clients={clients}
        onSave={handleSave}
        isLoading={createPropertyMutation.isPending || updatePropertyMutation.isPending}
      />
    </>
  );
}
