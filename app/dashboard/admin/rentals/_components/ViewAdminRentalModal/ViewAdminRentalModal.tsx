'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import type { AdminRental } from '../../page';

interface ViewAdminRentalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: AdminRental | null;
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

function calculateDays(start?: string, end?: string) {
  if (!start || !end) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export default function ViewAdminRentalModal({
  open,
  onOpenChange,
  rental,
}: ViewAdminRentalModalProps) {
  const duration = calculateDays(rental?.startDate, rental?.endDate);

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onOpenChange(false); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle className="text-xl font-bold">
              Rental Order #{rental?.id?.slice(0, 8) || '—'}
            </DialogTitle>
            <DynamicBadge
              text={rental?.status || 'UNKNOWN'}
              color={statusColor(rental?.status)}
            />
          </div>
          <DialogDescription>Full rental transaction overview</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Customer Details */}
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Customer Information
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{rental?.customer?.name || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{rental?.customer?.email || '—'}</p>
              </div>
            </div>
          </div>

          {/* Rental Gear & Pricing */}
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Item & Billing Details
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground">Gear Item</p>
                <p className="font-semibold text-foreground text-base mt-0.5">
                  {rental?.gearItem?.title || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rental Duration</p>
                <p className="font-medium text-foreground">
                  {formatDate(rental?.startDate)} → {formatDate(rental?.endDate)} ({duration} {duration === 1 ? 'day' : 'days'})
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="font-medium text-foreground">{rental?.quantity ?? 1}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                  ${(rental?.totalPrice ?? 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment Status</p>
                <div className="mt-1">
                  <DynamicBadge
                    text={rental?.paymentStatus || 'UNPAID'}
                    color={statusColor(rental?.paymentStatus)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>Transaction ID: #{rental?.id || '—'}</span>
            <span>Created: {formatDate(rental?.createdAt)}</span>
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
