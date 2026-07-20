'use client';

import { useState } from 'react';
import Image from 'next/image';
import DataTable from '@/components/shared/DataTable';
import { reportColumns } from '@/components/reports/report-table-config';
import ReportModal from '@/components/reports/ReportModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useReports } from '@/hooks/useReports';
import { useProperties } from '@/hooks/useProperties';
import { useClients } from '@/hooks/useClients';
import { useUIStore } from '@/store/uiStore';
import type { Report } from '@/types/report';

export default function ReportsPage() {
  const { data, isLoading, create, update } = useReports();
  const { data: properties } = useProperties();
  const { data: clients } = useClients();
  const addToast = useUIStore((s) => s.addToast);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Report | undefined>();

  const handleEdit = (report: Report) => {
    setEditing(report);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const handleSave = async (formData: {
    title: string;
    propertyId: string;
    clientId: string;
    propertyName: string;
    clientName: string;
    uploadDate: string;
    fileName?: string;
  }) => {
    if (editing) {
      await update(editing.id, formData);
      addToast('Report updated successfully', 'success');
    } else {
      await create(formData);
      addToast('Report created successfully', 'success');
    }
  };

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Reports</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage your reports and their details.
          </span>
        </div>
        <Button
          variant="gold"
          onClick={handleAdd}
          className="!px-[14px] !py-[7px] !text-[13px] !font-medium flex items-center gap-[6px]"
        >
          <Image src="/assets/icons/plus-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
          Add Report
        </Button>
      </div>
      <div className="px-6">
        <DataTable
          data={data}
          columns={reportColumns}
          isLoading={isLoading}
          emptyMessage="No reports yet. Add your first report."
          actions={{ onEdit: handleEdit }}
        />
      </div>
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        report={editing}
        properties={properties}
        clients={clients}
        onSave={handleSave}
      />
    </>
  );
}
