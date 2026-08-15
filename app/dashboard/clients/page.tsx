'use client';

import { useState } from 'react';
import Image from 'next/image';
import DataTable from '@/components/shared/DataTable';
import { clientColumns } from '@/components/clients/client-table-config';
import ClientModal, { ClientFormData } from '@/components/clients/ClientModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import {
  useGetClients,
  useCreateClient,
  useUpdateClient,
} from '@/hooks/api/useClients';
import { useUIStore } from '@/store/uiStore';
import type { Client } from '@/types/client';

export default function ClientsPage() {
  const addToast = useUIStore((s) => s.addToast);
  
  // TanStack Query Hooks
  const { data: clients = [], isLoading, isError, error } = useGetClients();
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingClient(undefined);
    setModalOpen(true);
  };

  const handleSave = async (formData: ClientFormData) => {
    try {
      if (editingClient) {
        await updateClientMutation.mutateAsync({
          id: editingClient.id,
          data: formData,
        });
        addToast('Client updated successfully', 'success');
      } else {
        await createClientMutation.mutateAsync(formData);
        addToast('Client created successfully', 'success');
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
            <h2 className="text-[24px] font-medium text-white leading-[1.3]">Clients</h2>
          </div>
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
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load clients: {error?.message || 'Unknown error'}
          </div>
        )}

        <DataTable
          data={clients}
          columns={clientColumns}
          isLoading={isLoading}
          emptyMessage="No clients found. Click 'Add Client' to create one."
          actions={{ onEdit: handleEdit }}
        />
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        client={editingClient}
        onSave={handleSave}
        isLoading={createClientMutation.isPending || updateClientMutation.isPending}
      />
    </>
  );
}
