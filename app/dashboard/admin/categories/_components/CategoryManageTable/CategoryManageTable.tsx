'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicPageHeader from '@/components/dashboard/DynamicPageHeader/DynamicPageHeader';
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
import { deleteCategory } from '@/service/category/delete';
import CategoryFormDialog from '../CreateCategory/CreateCategory';
import { Category } from '../../page';


export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const openCreate = useCallback(() => {
    setEditingCategory(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((cat: Category) => {
    setEditingCategory(cat);
    setDialogOpen(true);
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const result = await deleteCategory(deleteTarget.id);
      if (!result.success) {
        toast.error(result.message || 'Failed to delete category');
        return;
      }
      toast.success('Category deleted successfully');
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = [
    { header: '#', cell: (_: Category, index?: number) => <span className="text-xs">{(index ?? 0) + 1}</span> },
    { header: 'Name', accessor: 'name' as const },
    {
      header: 'Description',
      accessor: 'description' as const,
      cell: (row: Category) => (
        <span className="line-clamp-1 max-w-xs">{row.description || '—'}</span>
      ),
    },
    {
      header: 'Actions',
      cell: (row: Category) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEdit(row)}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteTarget(row)}
          >
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
          title="Categories"
          description="Manage gear categories"
        />
        <Button
          onClick={openCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={categories} />
      </div>

      <CategoryFormDialog
        open={dialogOpen}
        onOpenChange={(open) => { if (!open) setDialogOpen(false); }}
        editingCategory={editingCategory}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
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
