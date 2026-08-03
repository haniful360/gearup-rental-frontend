'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import type { TColumn } from '@/types/custom-table.types';
import type { AdminRental, PaginationMeta } from '../../page';
import ViewAdminRentalModal from '../ViewAdminRentalModal/ViewAdminRentalModal';

interface AdminRentalsTableProps {
  initialRentals: AdminRental[];
  meta: PaginationMeta;
}

function formatDate(value?: string) {
  if (!value) return '—';
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function statusColor(status?: string) {
  const s = (status || '').toUpperCase();
  if (s === 'PLACED' || s === 'PENDING' || s === 'REQUESTED') return '#f59e0b';
  if (s === 'CONFIRMED' || s === 'COMPLETED' || s === 'APPROVED') return '#10b981';
  if (s === 'ACTIVE' || s === 'ONGOING') return '#3b82f6';
  if (s === 'CANCELLED' || s === 'CANCELED' || s === 'REJECTED' || s === 'FAILED') return '#ef4444';
  return '#94a3b8';
}

export default function AdminRentalsTable({
  initialRentals,
  meta,
}: AdminRentalsTableProps) {
  const [rentals, setRentals] = useState<AdminRental[]>(initialRentals);
  const [viewTarget, setViewTarget] = useState<AdminRental | null>(null);

  useEffect(() => {
    setRentals(initialRentals);
  }, [initialRentals]);

  const isServerPaginated = meta && meta.total > rentals.length;
  const computedLimit = meta.limit || 10;
  const computedPage = meta.page || 1;

  const displayRentals = isServerPaginated
    ? rentals
    : rentals.slice(
        (computedPage - 1) * computedLimit,
        computedPage * computedLimit
      );

  const totalItems = isServerPaginated ? meta.total : rentals.length;
  const totalPages = isServerPaginated
    ? meta.totalPages
    : Math.max(1, Math.ceil(totalItems / computedLimit));

  const paginationMeta: PaginationMeta = {
    total: totalItems,
    page: computedPage,
    limit: computedLimit,
    totalPages: totalPages,
  };

  const columns: TColumn<AdminRental>[] = [
    {
      header: 'Order',
      cell: (row) => (
        <span className="font-medium font-mono text-xs">#{row.id?.slice(0, 8) || '—'}</span>
      ),
    },
    {
      header: 'Customer',
      cell: (row) => (
        <div>
          <p className="font-medium">{row.customer?.name || '—'}</p>
          <p className="text-xs text-muted-foreground">{row.customer?.email || ''}</p>
        </div>
      ),
    },
    {
      header: 'Gear',
      cell: (row) => <span className="font-medium">{row.gearItem?.title || '—'}</span>,
    },
    {
      header: 'Rental Period',
      cell: (row) => (
        <span className="text-xs">
          {formatDate(row.startDate)} → {formatDate(row.endDate)}
        </span>
      ),
    },
    {
      header: 'Qty',
      cell: (row) => <span>{row.quantity ?? 1}</span>,
    },
    {
      header: 'Total',
      cell: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ${(row.totalPrice ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <DynamicBadge text={row.status || '—'} color={statusColor(row.status)} />
      ),
    },
    {
      header: 'Payment',
      cell: (row) => (
        <DynamicBadge
          text={row.paymentStatus || '—'}
          color={statusColor(row.paymentStatus)}
        />
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewTarget(row)}
          className="gap-1.5 cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5" />
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
      <div className="overflow-hidden rounded-lg border">
        <CustomTable columns={columns} data={displayRentals} />
        {displayRentals.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No rental transactions yet.{' '}
            <Link
              href="/dashboard/admin"
              className="font-medium text-emerald-600 hover:underline"
            >
              Back to overview
            </Link>
          </div>
        )}
      </div>

      <CustomPagination meta={paginationMeta} />

      <ViewAdminRentalModal
        open={!!viewTarget}
        onOpenChange={(open) => {
          if (!open) setViewTarget(null);
        }}
        rental={viewTarget}
      />
    </div>
  );
}
