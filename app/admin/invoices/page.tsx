'use client';

import React, { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

export default function InvoicesPage() {
  const { token } = useAuthStore();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [token]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/invoices', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.data || []);
      }
    } catch (err) {
      console.error('[ADMIN_INVOICES_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (inv: any) => {
    if (inv.downloadUrl && inv.downloadUrl !== '#' && inv.downloadUrl !== 'undefined') {
      window.open(inv.downloadUrl, '_blank');
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Header Background
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 38, 'F');

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('GetEasyCV', 15, 18);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Official Tax Invoice & Receipt', 15, 26);

      // Invoice Meta (Right side)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`INVOICE #${inv.id || 'INV-1001'}`, 195, 18, { align: 'right' });
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${inv.date || new Date().toISOString().split('T')[0]}`, 195, 26, { align: 'right' });

      // Customer & Company Details
      doc.setTextColor(30, 41, 59); // slate-800
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Billed To:', 15, 52);
      doc.setFont('helvetica', 'normal');
      doc.text(`User ID / Email: ${inv.userId || inv.email || 'Customer'}`, 15, 58);
      doc.text(`Payment Status: ${(inv.status || 'PAID').toUpperCase()}`, 15, 64);

      doc.setFont('helvetica', 'bold');
      doc.text('Issued By:', 120, 52);
      doc.setFont('helvetica', 'normal');
      doc.text('GetEasyCV Inc.', 120, 58);
      doc.text('info@geteasycv.com', 120, 64);
      doc.text('https://geteasycv.com', 120, 70);

      // Divider Line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(15, 78, 195, 78);

      // Line items table header
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 84, 180, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text('Description', 20, 90);
      doc.text('Qty', 130, 90);
      doc.text('Amount', 190, 90, { align: 'right' });

      // Item row
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      const currSymbol = inv.currency || '₹';
      doc.text(`GetEasyCV Subscription / License (${currSymbol} ${inv.amount})`, 20, 102);
      doc.text('1', 130, 102);
      doc.text(`${currSymbol} ${inv.amount}`, 190, 102, { align: 'right' });

      // Total box
      doc.line(15, 112, 195, 112);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Total Paid:', 130, 122);
      doc.text(`${currSymbol} ${inv.amount}`, 190, 122, { align: 'right' });

      // Footer
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('Thank you for using GetEasyCV! This is a computer-generated tax invoice.', 105, 275, { align: 'center' });

      doc.save(`Invoice_${inv.id || 'GetEasyCV'}.pdf`);
      toast.success(`Downloaded Invoice PDF (${inv.id})`);
    } catch (err) {
      console.error('[INVOICE_PDF_GENERATION_ERROR]', err);
      toast.error('Failed to generate invoice PDF.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-violet-600" />
            <span>Invoices & Billing Receipts</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">Generated customer invoices</p>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Invoice ID', 'User ID', 'Amount', 'Currency', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-xs text-slate-400 animate-pulse">
                    Loading invoices...
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-xs text-slate-400 font-medium">
                    No invoices generated yet.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-slate-900">{inv.id}</td>
                    <td className="px-6 py-4 text-xs text-slate-700">{inv.userId || 'User'}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">{inv.amount}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{inv.currency}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{inv.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDownloadInvoice(inv)}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-violet-600 rounded-md transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                        title="Download PDF Invoice"
                      >
                        <Download className="w-4 h-4 text-violet-600" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
