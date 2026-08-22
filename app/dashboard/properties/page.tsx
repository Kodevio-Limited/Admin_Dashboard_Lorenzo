'use client';

import { useState, useMemo } from 'react';
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

const STATUS_OPTIONS = ['ALL', 'ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export default function PropertiesPage() {
  const addToast = useUIStore((s) => s.addToast);

  // TanStack Query Hooks
  const { data: properties = [], isLoading, isError, error } = useGetProperties();
  const { data: clients = [] } = useGetClients();

  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

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

  // Filter & Sort properties:
  // 1. ACTIVE properties appear first
  // 2. Filter by Property Status if selected
  // 3. Search by name, parish, city, fieldRep, client name, type, service plan
  const processedProperties = useMemo(() => {
    return [...properties]
      .filter((prop) => {
        const rawStatus = (prop.status || 'ACTIVE').toUpperCase();

        // Status filter
        if (statusFilter !== 'ALL' && rawStatus !== statusFilter) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const name = (prop.name || '').toLowerCase();
          const parish = (prop.parish || '').toLowerCase();
          const city = (prop.city || '').toLowerCase();
          const fieldRep = (prop.fieldRep || prop.assignedFieldRep || '').toLowerCase();
          const type = (prop.type || prop.propertyType || '').toLowerCase();
          const plan = (prop.servicePlantype || prop.servicePlanType || prop.servicePlan || '').toLowerCase();
          const clientName = (
            prop.client
              ? [prop.client.firstName, prop.client.lastName].filter(Boolean).join(' ')
              : prop.clientName || ''
          ).toLowerCase();

          const matchesName = name.includes(q);
          const matchesLocation = parish.includes(q) || city.includes(q);
          const matchesFieldRep = fieldRep.includes(q);
          const matchesType = type.includes(q);
          const matchesPlan = plan.includes(q);
          const matchesClient = clientName.includes(q);

          return (
            matchesName ||
            matchesLocation ||
            matchesFieldRep ||
            matchesType ||
            matchesPlan ||
            matchesClient
          );
        }

        return true;
      })
      .sort((a, b) => {
        // Sort ACTIVE properties first
        const statusA = (a.status || 'ACTIVE').toUpperCase();
        const statusB = (b.status || 'ACTIVE').toUpperCase();

        const isAActive = statusA === 'ACTIVE';
        const isBActive = statusB === 'ACTIVE';

        if (isAActive && !isBActive) return -1;
        if (!isAActive && isBActive) return 1;

        return 0;
      });
  }, [properties, searchQuery, statusFilter]);

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex flex-col md:flex-row md:items-end justify-between gap-4">
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
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px] shrink-0"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Add Property
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
              placeholder="Search properties by name, parish, client, field rep..."
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

          {/* Status Filter Buttons */}
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
            Failed to load properties: {error?.message || 'Unknown error'}
          </div>
        )}

        <DataTable
          data={processedProperties}
          columns={propertyColumns}
          isLoading={isLoading}
          emptyMessage={
            searchQuery || statusFilter !== 'ALL'
              ? 'No properties match your filter criteria.'
              : "No properties found. Click 'Add Property' to create one."
          }
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

