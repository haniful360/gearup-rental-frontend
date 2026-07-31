'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import DynamicPageHeader from '@/components/dashboard/DynamicPageHeader/DynamicPageHeader';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import type { TColumn } from '@/types/custom-table.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { GearItemForm, type GearFormData } from './GearItemForm';
import { createGearItem } from '@/service/gear-items/create';
import { updateGearItem } from '@/service/gear-items/update';
import { deleteGearItem } from '@/service/gear-items/delete';

interface GearItem {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  location: string;
  brand: string;
  stock: number;
  categoryId?: string;
  categoryName?: string;
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

interface InventoryClientProps {
  initialItems: GearItem[];
  categories: { id: string; name: string }[];
}

export default function InventoryClient({ initialItems, categories }: InventoryClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<GearItem[]>(initialItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GearItem | null>(null);
  const [viewTarget, setViewTarget] = useState<GearItem | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<GearFormData>({ defaultValues });

  useEffect(() => {
    if (dialogOpen && editingItem) {
      reset({
        title: editingItem.title,
        description: editingItem.description,
        pricePerDay: editingItem.pricePerDay,
        location: editingItem.location,
        brand: editingItem.brand,
        stock: editingItem.stock,
        categoryId: editingItem.categoryId || '',
      });
    } else if (dialogOpen && !editingItem) {
      reset(defaultValues);
    }
  }, [dialogOpen, editingItem, reset]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((item: GearItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  }, []);

  const onSave = handleSubmit(async (data) => {
    setSaving(true);
    try {
      if (editingItem) {
        const result = await updateGearItem(editingItem.id, data);
        if (!result.success) {
          toast.error(result.message || 'Failed to update gear');
          return;
        }
        toast.success('Gear item updated successfully');
      } else {
        const result = await createGearItem(data);
        if (!result.success) {
          toast.error(result.message || 'Failed to create gear');
          return;
        }
        toast.success('Gear item created successfully');
      }
      setDialogOpen(false);
      setEditingItem(null);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const result = await deleteGearItem(deleteTarget.id);
      if (!result.success) {
        toast.error(result.message || 'Failed to delete gear');
        return;
      }
      toast.success('Gear item deleted successfully');
      setItems((prev) => prev.filter((g) => g.id !== deleteTarget.id));
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeleteTarget(null);
    }
  };

  const categoryName = (id?: string) => categories.find((c) => c.id === id)?.name || '—';

  const columns: TColumn<GearItem>[] = [
    { header: '#', cell: (_, idx) => <span>{(idx ?? 0) + 1}</span> },
    { header: 'Title', accessor: 'title' },
    {
      header: 'Category',
      cell: (row) => <span>{categoryName(row.categoryId)}</span>,
    },
    { header: 'Brand', accessor: 'brand' },
    {
      header: 'Price/Day',
      cell: (row) => (
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
          ${row.pricePerDay.toFixed(2)}
        </span>
      ),
    },
    { header: 'Stock', accessor: 'stock' },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewTarget(row)}>
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => openEdit(row)}>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteTarget(row)}>
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DynamicPageHeader
          title="My Inventory"
          description="Manage your gear items available for rent"
        />
        <Button
          onClick={openCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Gear
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto border-t">
          <CustomTable columns={columns} data={items} />
          {items.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground border-t">
              No gear items yet. Click &quot;Add Gear&quot; to list your first item.
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); setEditingItem(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Gear' : 'Add Gear'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the gear item details below.' : 'Fill in the details to list a new gear item for rent.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSave}>
            <GearItemForm control={control} errors={errors} categories={categories} />

            <div className="flex justify-end gap-3 border-t pt-4">
              <Button variant="outline" type="button" onClick={() => { setDialogOpen(false); setEditingItem(null); }}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {saving ? 'Saving...' : editingItem ? 'Update Gear' : 'Create Gear'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={!!viewTarget} onOpenChange={(open) => { if (!open) setViewTarget(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewTarget?.title}</DialogTitle>
            <DialogDescription>Gear item details</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Brand</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{viewTarget?.brand || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{categoryName(viewTarget?.categoryId)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Price Per Day</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">${viewTarget?.pricePerDay.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Stock</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{viewTarget?.stock}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Location</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">{viewTarget?.location || '—'}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100 mt-0.5 leading-relaxed">{viewTarget?.description || '—'}</p>
            </div>
          </div>

          <div className="flex justify-end border-t pt-4">
            <Button variant="outline" onClick={() => setViewTarget(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gear</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
