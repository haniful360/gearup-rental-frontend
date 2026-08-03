'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import CustomPagination from '@/components/dashboard/CustomPagination/CustomPagination';
import type { TColumn } from '@/types/custom-table.types';
import type { AdminGearItem, PaginationMeta } from '../../page';
import ViewAdminGearModal from '../ViewAdminGearModal/ViewAdminGearModal';

interface GearModerationTableProps {
  initialGear: AdminGearItem[];
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

export default function GearModerationTable({
  initialGear,
  meta,
}: GearModerationTableProps) {
  const [gear, setGear] = useState<AdminGearItem[]>(initialGear);
  const [viewTarget, setViewTarget] = useState<AdminGearItem | null>(null);

  useEffect(() => {
    setGear(initialGear);
  }, [initialGear]);

  const isServerPaginated = meta && meta.total > gear.length;
  const computedLimit = meta.limit || 10;
  const computedPage = meta.page || 1;

  const displayGear = isServerPaginated
    ? gear
    : gear.slice(
        (computedPage - 1) * computedLimit,
        computedPage * computedLimit
      );

  const totalItems = isServerPaginated ? meta.total : gear.length;
  const totalPages = isServerPaginated
    ? meta.totalPages
    : Math.max(1, Math.ceil(totalItems / computedLimit));

  const paginationMeta: PaginationMeta = {
    total: totalItems,
    page: computedPage,
    limit: computedLimit,
    totalPages: totalPages,
  };

  const columns: TColumn<AdminGearItem>[] = [
    {
      header: 'Gear',
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title?.slice(0, 40) || '—'}</p>
          <p className="text-xs text-muted-foreground">
            {row.description?.slice(0, 40) || '—'}
          </p>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (row) => <span>{row.category?.name || '—'}</span>,
    },
    {
      header: 'Provider',
      cell: (row) => (
        <span className="text-xs font-mono">#{row.providerId?.slice(0, 8) || '—'}</span>
      ),
    },
    {
      header: 'Price/Day',
      cell: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ${(row.pricePerDay ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Stock',
      cell: (row) => <span>{row.stock ?? 0}</span>,
    },
    {
      header: 'Availability',
      cell: (row) => (
        <DynamicBadge
          text={row.isAvailable ? 'Available' : 'Unavailable'}
          color={row.isAvailable ? '#10b981' : '#ef4444'}
        />
      ),
    },
    {
      header: 'Listed',
      cell: (row) => <span>{formatDate(row.createdAt)}</span>,
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
        <CustomTable columns={columns} data={displayGear} />
        {displayGear.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No gear items listed yet.{' '}
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

      <ViewAdminGearModal
        open={!!viewTarget}
        onOpenChange={(open) => {
          if (!open) setViewTarget(null);
        }}
        item={viewTarget}
      />
    </div>
  );
}
