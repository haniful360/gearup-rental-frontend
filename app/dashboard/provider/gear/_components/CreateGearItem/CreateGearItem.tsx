'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GearItemForm, gearItemSchema, type GearFormData } from './GearItemForm';
import { createGearItem } from '@/service/gear-items/create';
import type { GearItem } from '../../page';

interface CreateGearItemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: { id: string; name: string }[];
  onSaved: (item: GearItem) => void;
}

const defaultValues: GearFormData = {
  title: '',
  description: '',
  pricePerDay: 0,
  location: '',
  brand: '',
  stock: 0,
  categoryId: '',
};

export default function CreateGearItem({
  open,
  onOpenChange,
  categories,
  onSaved,
}: CreateGearItemProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GearFormData>({
    resolver: zodResolver(gearItemSchema),
    defaultValues,
  });

  const handleSave = async (data: GearFormData) => {
    try {
      const result = await createGearItem(data);
      if (!result.success) {
        toast.error(result.message || 'Failed to create gear item');
        return;
      }
      toast.success('Gear item created successfully');
      const created = result?.data as { id?: string; _id?: string } | null | undefined;
      onSaved({
        id: created?.id ?? created?._id ?? '',
        title: data.title,
        description: data.description,
        pricePerDay: data.pricePerDay,
        location: data.location,
        brand: data.brand,
        stock: data.stock,
        categoryId: data.categoryId,
      });
      onOpenChange(false);
      reset(defaultValues);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleCancel(); }}>
      <DialogContent maxHeight="90vh">
        <DialogHeader>
          <DialogTitle>Add Gear</DialogTitle>
          <DialogDescription>
            Fill in the details to list a new gear item for rent.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)}>
          <GearItemForm control={control} errors={errors} categories={categories} />

          <div className="flex justify-end gap-3 border-t pt-4">
            <DynamicActionButton
              label="Cancel"
              variant="outline"
              type="button"
              onClick={handleCancel}
            />
            <DynamicActionButton
              label={isSubmitting ? 'Creating...' : 'Create Gear'}
              type="submit"
              isLoading={isSubmitting}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
