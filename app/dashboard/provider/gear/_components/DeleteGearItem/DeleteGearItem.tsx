'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { deleteGearItem } from '@/service/gear-items/delete';
import type { GearItem } from '../../page';

interface DeleteGearItemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: GearItem | null;
  onDeleted: (id: string) => void;
}

export default function DeleteGearItem({
  open,
  onOpenChange,
  item,
  onDeleted,
}: DeleteGearItemProps) {
  const router = useRouter();

  const confirmDelete = async () => {
    if (!item) return;
    try {
      const result = await deleteGearItem(item.id);
      if (!result.success) {
        toast.error(result.message || 'Failed to delete gear item');
        return;
      }
      toast.success('Gear item deleted successfully');
      onDeleted(item.id);
      onOpenChange(false);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(open) => { if (!open) onOpenChange(false); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Gear</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{item?.title}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
