'use client';

import React from 'react';
import Spinner from './Spinner';
import EmptyState from './EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  keyExtractor: (row: T) => string;
  footer?: React.ReactNode;
}

export default function DataTable<T>({ columns, data, loading, emptyTitle = 'No data found', emptyDescription, keyExtractor, footer }: DataTableProps<T>) {
  return (
    <div className="rounded-[20px] border border-slate-200/70 bg-white overflow-hidden">
      {loading ? (
        <div className="py-16 flex items-center justify-center">
          <Spinner size="lg" label="Loading data…" />
        </div>
      ) : data.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 ${col.width ?? ''} ${col.className ?? ''}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr key={keyExtractor(row)} className="hover:bg-slate-50/60 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-slate-700 ${col.className ?? ''}`}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {footer && (
        <div className="px-4 py-3 border-t border-slate-100 bg-white">
          {footer}
        </div>
      )}
    </div>
  );
}
