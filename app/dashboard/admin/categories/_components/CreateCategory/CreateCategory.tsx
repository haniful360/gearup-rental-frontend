'use client';

import { useForm } from 'react-hook-form';
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
import InputField from '@/components/dashboard/Fields/InputField/InputField';
import TextAreaField from '@/components/dashboard/Fields/TextAreaField/TextAreaField';
import { createCategory } from '@/service/category/create';
import { updateCategory } from '@/service/category/update';
import type { Category } from '../../page';

interface CategoryFormValues {
  name: string;
  description: string;
}

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: Category | null;
}

export default function CategoryFormDialog({
  open,
  onOpenChange,
  editingCategory,
}: CategoryFormDialogProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormValues>({
    values: {
      name: editingCategory?.name ?? '',
      description: editingCategory?.description ?? '',
    },
  });

  const handleSave = async (data: CategoryFormValues) => {
    try {
      if (editingCategory) {
        const result = await updateCategory(editingCategory.id, data);
        if (!result.success) {
          toast.error(result.message || 'Failed to update category');
          return;
        }
        toast.success('Category updated successfully');
      } else {
        const result = await createCategory(data);
        if (!result.success) {
          toast.error(result.message || 'Failed to create category');
          return;
        }
        toast.success('Category created successfully');
      }
      onOpenChange(false);
      reset({ name: '', description: '' });
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset({ name: '', description: '' });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleCancel(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <DialogDescription>
            {editingCategory ? 'Update the category details below.' : 'Fill in the details to create a new category.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-5 py-4">
          <InputField
            label="Name"
            name="name"
            control={control}
            placeholder="e.g. Camping & Hiking"
            required
            error={errors.name}
          />
          <TextAreaField
            label="Description"
            name="description"
            control={control}
            placeholder="Brief description of this category"
            rows={4}
            error={errors.description}
          />

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
