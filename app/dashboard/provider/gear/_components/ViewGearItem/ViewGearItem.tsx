'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item?.title}</DialogTitle>
          <DialogDescription>Gear item details</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
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
            <div className="col-span-2">
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
