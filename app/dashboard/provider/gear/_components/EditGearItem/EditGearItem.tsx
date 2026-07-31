'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GearItemForm, gearItemSchema, type GearFormData } from '../CreateGearItem/GearItemForm';
import { updateGearItem } from '@/service/gear-items/update';
import type { GearItem } from '../../page';

interface EditGearItemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: GearItem | null;
  categories: { id: string; name: string }[];
  onSaved: (item: GearItem) => void;
}

export default function EditGearItem({
  open,
  onOpenChange,
  item,
  categories,
  onSaved,
}: EditGearItemProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GearFormData>({
    resolver: zodResolver(gearItemSchema),
    values: {
      title: item?.title ?? '',
      description: item?.description ?? '',
      pricePerDay: item?.pricePerDay ?? 0,
      location: item?.location ?? '',
      brand: item?.brand ?? '',
      stock: item?.stock ?? 0,
      categoryId: item?.categoryId ?? '',
    },
  });

  const handleSave = async (data: GearFormData) => {
    if (!item) return;
    try {
      const result = await updateGearItem(item.id, data);
      if (!result.success) {
        toast.error(result.message || 'Failed to update gear item');
        return;
      }
      toast.success('Gear item updated successfully');
      onSaved({
        ...item,
        ...data,
        id: item.id,
      });
      onOpenChange(false);
      reset();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleCancel(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Gear</DialogTitle>
          <DialogDescription>
            Update the gear item details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)}>
          <GearItemForm control={control} errors={errors} categories={categories} />

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? 'Saving...' : 'Update Gear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
