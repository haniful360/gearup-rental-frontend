'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, ExternalLink, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import type { AdminGearItem } from '../../page';

interface ViewAdminGearModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminGearItem | null;
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

export default function ViewAdminGearModal({
  open,
  onOpenChange,
  item,
}: ViewAdminGearModalProps) {
  const images = item?.images && item.images.length > 0
    ? item.images
    : item?.image
    ? [item.image]
    : item?.imageUrl
    ? [item.imageUrl]
    : [];

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onOpenChange(false); }}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle className="text-xl font-bold">{item?.title || 'Gear Details'}</DialogTitle>
            {item?.isFeature && (
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 flex items-center gap-1 shrink-0">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                Featured
              </Badge>
            )}
          </div>
          <DialogDescription>
            Admin moderation view for gear item #{item?.id?.slice(0, 8) || ''}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          {/* Images Section */}
          {images.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Gear Images
              </p>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border bg-zinc-900"
                  >
                    <Image
                      src={img}
                      alt={`${item?.title || 'Gear'} image ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed bg-muted/40 text-xs text-muted-foreground">
              No images uploaded for this item
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-4 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Brand</p>
              <p className="font-semibold text-foreground mt-0.5">{item?.brand || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Category</p>
              <p className="font-semibold text-foreground mt-0.5">
                {item?.category?.name || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Price Per Day</p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                ${(item?.pricePerDay ?? 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Stock</p>
              <p className="font-semibold text-foreground mt-0.5">{item?.stock ?? 0}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Availability</p>
              <div className="mt-1">
                <DynamicBadge
                  text={item?.isAvailable ? 'Available' : 'Unavailable'}
                  color={item?.isAvailable ? '#10b981' : '#ef4444'}
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Provider ID</p>
              <p className="font-mono text-xs text-foreground mt-0.5">
                {item?.providerId ? `#${item.providerId}` : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground mt-0.5">{item?.location || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Date Listed</p>
              <p className="font-semibold text-foreground mt-0.5">{formatDate(item?.createdAt)}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Description
            </p>
            <div className="rounded-lg border bg-muted/30 p-3 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {item?.description || 'No description provided.'}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t pt-4">
          {item?.id ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/gear/${item.id}`} target="_blank">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View Public Listing
              </Link>
            </Button>
          ) : (
            <div />
          )}
          <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
