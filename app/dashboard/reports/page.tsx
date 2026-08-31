'use client';

import { useState } from 'react';
import Image from 'next/image';
import DataTable from '@/components/shared/DataTable';
import { reportColumns } from '@/components/reports/report-table-config';
import ReportModal from '@/components/reports/ReportModal';
import Header from '@/components/layout/Header';
import { Button } from '@/components/shared/Button';
import { useGetReports, useCreateReport, useUpdateReport } from '@/hooks/api/useReports';
import { useGetProperties } from '@/hooks/api/useProperties';
import { useGetClients } from '@/hooks/api/useClients';
import { useUIStore } from '@/store/uiStore';
import type { Report, CreateReportInput } from '@/types/report';

export default function ReportsPage() {
  const addToast = useUIStore((s) => s.addToast);

  // TanStack Query Hooks
  const { data: reports = [], isLoading, isError, error } = useGetReports();
  const { data: properties = [] } = useGetProperties();
  const { data: clients = [] } = useGetClients();

  const createReportMutation = useCreateReport();
  const updateReportMutation = useUpdateReport();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | undefined>();

  const handleEdit = (report: Report) => {
    setEditingReport(report);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingReport(undefined);
    setModalOpen(true);
  };

  const handleSave = async (payload: CreateReportInput) => {
    try {
      if (editingReport) {
        await updateReportMutation.mutateAsync({
          id: editingReport.id,
          data: payload,
        });
        addToast('Report updated successfully', 'success');
      } else {
        await createReportMutation.mutateAsync(payload);
        addToast('Report created successfully', 'success');
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
            <h2 className="text-[24px] font-medium text-white leading-[1.3]">Reports</h2>
          </div>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            Manage property verification reports and PDF documents.
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
        {isError && (
          <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
            Failed to load reports: {error?.message || 'Unknown error'}
          </div>
        )}

        <DataTable
          data={reports}
          columns={reportColumns}
          isLoading={isLoading}
          emptyMessage="No reports found. Click 'Add Report' to create and upload one."
          actions={{ onEdit: handleEdit }}
        />
      </div>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        report={editingReport}
        properties={properties}
        clients={clients}
        onSave={handleSave}
        isLoading={createReportMutation.isPending || updateReportMutation.isPending}
      />
    </>
  );
}
