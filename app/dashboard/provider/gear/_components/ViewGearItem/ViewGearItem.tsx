'use client';

import Image from 'next/image';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { GearItem } from '../../page';

interface ViewGearItemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: GearItem | null;
  categories: { id: string; name: string }[];
}

export default function ViewGearItem({
  open,
  onOpenChange,
  item,
  categories,
}: ViewGearItemProps) {
  const categoryName =
    categories.find((c) => c.id === item?.categoryId)?.name || '—';

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) onOpenChange(false); }}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle>{item?.title}</DialogTitle>
            {item?.isFeature && (
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 flex items-center gap-1 shrink-0">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                Featured
              </Badge>
            )}
          </div>
          <DialogDescription>Gear item details</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-3">
          {item?.images && item.images.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Images</p>
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border bg-zinc-900">
                    <Image
                      src={img}
                      alt={`${item.title} image ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Brand</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{item?.brand || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{categoryName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Price Per Day</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                ${item?.pricePerDay.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Stock</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{item?.stock}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Featured Item</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">
                {item?.isFeature ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Location</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{item?.location || '—'}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</p>
            <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5 leading-relaxed">
              {item?.description || '—'}
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <DynamicActionButton
            label="Close"
            variant="outline"
            onClick={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
