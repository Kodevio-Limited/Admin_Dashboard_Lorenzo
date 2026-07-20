'use client';

import { useState, useMemo } from 'react';

export interface ColumnDef<T> {
  key: keyof T;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  actions?: {
    onEdit?: (row: T) => void;
  };
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  emptyMessage = 'No data found.',
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = String(a[sortKey] ?? '');
      const bVal = String(b[sortKey] ?? '');
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-dark-400 animate-pulse">
            {columns.map((col) => (
              <div key={String(col.key)} className="h-4 bg-dark-400 rounded flex-1" />
            ))}
            {actions && <div className="h-4 w-16 bg-dark-400 rounded" />}
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-dark-200">{emptyMessage}</div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-dark-500 rounded-[4px]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left text-[13px] font-medium text-dark-200 py-[10px] px-[18px] leading-[1.3] ${col.sortable ? 'cursor-pointer hover:text-dark-100 select-none' : ''} ${col.width || ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <span className="text-xs">{sortDir === 'asc' ? '▲' : '▼'}</span>
                  )}
                </span>
              </th>
            ))}
            {actions && <th className="text-left text-[13px] font-medium text-dark-200 py-[10px] px-[18px] leading-[1.3]">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className="border-b border-dark-400 transition-colors hover:bg-dark-600/30"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="py-[10px] px-[18px] text-[15px] font-medium text-white leading-[1.3]">
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
              {actions && (
                <td className="py-[10px] px-[18px]">
                  <div className="flex items-center gap-2">
                    {actions.onEdit && (
                      <div
                        className="flex items-center justify-center rounded-[4px] cursor-pointer overflow-hidden"
                        style={{ width: 38, height: 38, backgroundColor: '#1E1E1E' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.onEdit!(row);
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Edit"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            actions.onEdit!(row);
                          }
                        }}
                      >
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="38" height="38" rx="4" fill="#1E1E1E"/>
                          <path d="M12 28H26C27.1 28 28 27.1 28 26V19H26V26H12V12H19V10H12C10.9 10 10 10.9 10 12V26C10 27.1 10.9 28 12 28Z" fill="white"/>
                          <path d="M14 20V23C14 23.55 14.45 24 15 24H18C18.27 24 18.52 23.89 18.71 23.71L27.71 14.71C27.8 14.617 27.88 14.508 27.93 14.387C27.98 14.266 28 14.136 28 14.005C28 13.874 27.98 13.744 27.93 13.623C27.88 13.502 27.8 13.393 27.71 13.3L24.71 10.3C24.62 10.207 24.51 10.134 24.39 10.084C24.27 10.033 24.14 10.008 24.01 10.008C23.87 10.008 23.74 10.033 23.62 10.084C23.5 10.134 23.39 10.207 23.3 10.3L14.29 19.29C14.2 19.383 14.12 19.494 14.07 19.616C14.02 19.738 14 19.868 14 20ZM24 12.41L25.59 14L24.5 15.09L22.91 13.5L24 12.41ZM16 20.41L21.5 14.91L23.09 16.5L17.59 22H16V20.41Z" fill="white"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
