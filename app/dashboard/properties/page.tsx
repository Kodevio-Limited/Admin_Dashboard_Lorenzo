'use client';

import { useState } from 'react';
import Image from 'next/image';
import DataTable from '@/components/shared/DataTable';
import { propertyColumns } from '@/components/properties/property-table-config';
import PropertyModal from '@/components/properties/PropertyModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useProperties } from '@/hooks/useProperties';
import { useClients } from '@/hooks/useClients';
import { useUIStore } from '@/store/uiStore';
import type { Property } from '@/types/property';

export default function PropertiesPage() {
  const { data, isLoading, create, update } = useProperties();
  const { data: clients } = useClients();
  const addToast = useUIStore((s) => s.addToast);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Property | undefined>();

  const handleEdit = (property: Property) => {
    setEditing(property);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const handleSave = async (formData: { name: string; location: string; clientId: string; clientName: string }) => {
    if (editing) {
      await update(editing.id, formData);
      addToast('Property updated successfully', 'success');
    } else {
      await create(formData);
      addToast('Property created successfully', 'success');
    }
  };

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Properties</h2>
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
        <DataTable
          data={data}
          columns={propertyColumns}
          isLoading={isLoading}
          emptyMessage="No properties yet. Add your first property."
          actions={{ onEdit: handleEdit }}
        />
      </div>
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        property={editing}
        clients={clients}
        onSave={handleSave}
      />
    </>
  );
}
