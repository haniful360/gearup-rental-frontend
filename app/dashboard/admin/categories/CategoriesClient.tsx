'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import DynamicPageHeader from '@/components/dashboard/DynamicPageHeader/DynamicPageHeader';
import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);

  const resetForm = useCallback(() => {
    setFormData({ name: '', description: '' });
    setEditingCategory(null);
  }, []);

  const openCreate = useCallback(() => {
    resetForm();
    setSheetOpen(true);
  }, [resetForm]);

  const openEdit = useCallback((cat: Category) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description });
    setSheetOpen(true);
  }, []);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      if (editingCategory) {
        const result = await updateCategory(editingCategory._id, formData);
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
      setSheetOpen(false);
      resetForm();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const result = await deleteCategory(id);
      if (!result.success) {
        toast.error(result.message || 'Failed to delete category');
        return;
      }
      toast.success('Category deleted successfully');
      setCategories((prev) => prev.filter((c) => c._id !== id));
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const columns = [
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
      accessor: '_id' as const,
      cell: (row: Category) => (
        <DynamicTableActions
          actions={[
            { type: 'edit', onClick: () => openEdit(row) },
            { type: 'delete', onClick: () => handleDelete(row._id) },
          ]}
        />
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
        <DynamicActionButton
          label="Add Category"
          icon={Plus}
          showIcon
          onClick={openCreate}
        />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={categories} />
      </div>

      <Sheet open={sheetOpen} onOpenChange={(open) => { if (!open) { setSheetOpen(false); resetForm(); } }}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</SheetTitle>
            <SheetDescription>
              {editingCategory ? 'Update the category details below.' : 'Fill in the details to create a new category.'}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex flex-1 flex-col gap-5 px-4">
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

          <div className="mt-auto border-t p-4">
            <DynamicActionButton
              label={editingCategory ? 'Update Category' : 'Create Category'}
              onClick={handleSave}
              isLoading={saving}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
