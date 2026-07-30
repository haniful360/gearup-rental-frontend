'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicPageHeader from '@/components/dashboard/DynamicPageHeader/DynamicPageHeader';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createCategory } from '@/service/category/create';
import { updateCategory } from '@/service/category/update';
import { deleteCategory } from '@/service/category/delete';
import type { Category } from './page';

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const resetForm = useCallback(() => {
    setFormData({ name: '', description: '' });
    setEditingCategory(null);
  }, []);

  const openCreate = useCallback(() => {
    resetForm();
    setDialogOpen(true);
  }, [resetForm]);

  const openEdit = useCallback((cat: Category) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description });
    setDialogOpen(true);
  }, []);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      if (editingCategory) {
        const result = await updateCategory(editingCategory.id, formData);
        if (!result.success) {
          toast.error(result.message || 'Failed to update category');
          return;
        }
        toast.success('Category updated successfully');
      } else {
        const result = await createCategory(formData);
        if (!result.success) {
          toast.error(result.message || 'Failed to create category');
          return;
        }
        toast.success('Category created successfully');
      }
      setDialogOpen(false);
      resetForm();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

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

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update the category details below.' : 'Fill in the details to create a new category.'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name <span className="text-rose-500">*</span></Label>
              <Input
                id="name"
                placeholder="e.g. Camping & Hiking"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this category"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {saving ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
