'use client';

import { useState } from 'react';
import Image from 'next/image';
import DataTable from '@/components/shared/DataTable';
import { clientColumns } from '@/components/clients/client-table-config';
import ClientModal from '@/components/clients/ClientModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useClients } from '@/hooks/useClients';
import { useUIStore } from '@/store/uiStore';
import type { Client } from '@/types/client';

export default function ClientsPage() {
  const { data, isLoading, create, update } = useClients();
  const addToast = useUIStore((s) => s.addToast);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | undefined>();

  const handleEdit = (client: Client) => {
    setEditing(client);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const handleSave = async (formData: { name: string; email: string; phone: string; whatsapp?: string; country: string; servicePlan: 'Premium' | 'Standard' | 'Basic'; status: 'Active' | 'Inactive' | 'Pending'; notes?: string }) => {
    if (editing) {
      await update(editing.id, { ...formData, assignedPropertyIds: editing.assignedPropertyIds });
      addToast('Client updated successfully', 'success');
    } else {
      await create({ ...formData, assignedPropertyIds: [] });
      addToast('Client created successfully', 'success');
    }
  };

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Clients</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage your client list and their details.
          </span>
        </div>
        <Button
          variant="gold"
          onClick={handleAdd}
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px]"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Add Client
        </Button>
      </div>
      <div className="px-6">
        <DataTable
          data={data}
          columns={clientColumns}
          isLoading={isLoading}
          emptyMessage="No clients yet. Add your first client."
          actions={{ onEdit: handleEdit }}
        />
      </div>
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        client={editing}
        onSave={handleSave}
      />
    </>
  );
}
