'use client';

import { useState, useMemo } from 'react';
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

const STATUS_OPTIONS = ['ALL', 'ACTIVE', 'INACTIVE', 'PENDING', 'ARCHIVED'] as const;

export default function ClientsPage() {
  const addToast = useUIStore((s) => s.addToast);
  
  // TanStack Query Hooks
  const { data: clients = [], isLoading, isError, error } = useGetClients();
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

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

  // Filter and sort clients:
  // 1. ACTIVE clients appear first
  // 2. Filter by status if selected
  // 3. Search by name, email, phone/whatsapp, country, service plan
  const processedClients = useMemo(() => {
    return [...clients]
      .filter((client) => {
        const rawStatus = (client.clientProfile?.status || client.status || '').toUpperCase();
        
        // Status filter
        if (statusFilter !== 'ALL' && rawStatus !== statusFilter) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const fullName = [client.firstName, client.lastName].filter(Boolean).join(' ').toLowerCase();
          const legacyName = (client.name || '').toLowerCase();
          const email = (client.email || '').toLowerCase();
          const phone = (client.phone || '').toLowerCase();
          const whatsapp = (client.clientProfile?.whatsapp || client.whatsapp || '').toLowerCase();
          const country = (client.clientProfile?.country || client.country || '').toLowerCase();
          const plan = (
            client.clientProfile?.servicePlantype ||
            client.clientProfile?.servicePlanType ||
            client.clientProfile?.servicePlan ||
            client.servicePlanType ||
            client.servicePlan ||
            ''
          ).toLowerCase();

          const matchesName = fullName.includes(q) || legacyName.includes(q);
          const matchesEmail = email.includes(q);
          const matchesPhone = phone.includes(q) || whatsapp.includes(q);
          const matchesCountry = country.includes(q);
          const matchesPlan = plan.includes(q);

          return matchesName || matchesEmail || matchesPhone || matchesCountry || matchesPlan;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort ACTIVE clients first
        const statusA = (a.clientProfile?.status || a.status || '').toUpperCase();
        const statusB = (b.clientProfile?.status || b.status || '').toUpperCase();

        const isAActive = statusA === 'ACTIVE';
        const isBActive = statusB === 'ACTIVE';

        if (isAActive && !isBActive) return -1;
        if (!isAActive && isBActive) return 1;

        return 0;
      });
  }, [clients, searchQuery, statusFilter]);

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex flex-col md:flex-row md:items-end justify-between gap-4">
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
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px] shrink-0"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Add Client
        </Button>
      </div>

      <div className="px-6 space-y-4">
        {/* Search & Status Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-dark-500/80 p-4 rounded-lg border border-dark-400">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients by name, email, phone, country..."
              className="w-full bg-dark-600 border border-dark-400 rounded-md pl-9 pr-8 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
                title="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Status Filter Tabs / Select */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-white/50 font-medium mr-1 uppercase tracking-wider shrink-0">Status:</span>
            {STATUS_OPTIONS.map((opt) => {
              const isActive = statusFilter === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setStatusFilter(opt)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-all shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-black shadow'
                      : 'bg-dark-600 text-white/70 border border-dark-400 hover:bg-dark-400 hover:text-white'
                  }`}
                >
                  {opt === 'ALL' ? 'ALL' : opt}
                </button>
              );
            })}
          </div>
        </div>

        {isError && (
          <div className="p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load clients: {error?.message || 'Unknown error'}
          </div>
        )}

        <DataTable
          data={processedClients}
          columns={clientColumns}
          isLoading={isLoading}
          emptyMessage={
            searchQuery || statusFilter !== 'ALL'
              ? 'No clients match your filter criteria.'
              : "No clients found. Click 'Add Client' to create one."
          }
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

