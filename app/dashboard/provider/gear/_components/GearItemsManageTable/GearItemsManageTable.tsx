'use client';

import { useState, useCallback } from 'react';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicPageHeader from '@/components/dashboard/DynamicPageHeader/DynamicPageHeader';
import type { TColumn } from '@/types/custom-table.types';
import CreateGearItem from '../CreateGearItem/CreateGearItem';
import EditGearItem from '../EditGearItem/EditGearItem';
import DeleteGearItem from '../DeleteGearItem/DeleteGearItem';
import ViewGearItem from '../ViewGearItem/ViewGearItem';
import type { GearItem } from '../../page';

interface GearItemsManageTableProps {
  initialItems: GearItem[];
  categories: { id: string; name: string }[];
}

export default function GearItemsManageTable({
  initialItems,
  categories,
}: GearItemsManageTableProps) {
  const [items, setItems] = useState<GearItem[]>(initialItems);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<GearItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GearItem | null>(null);
  const [viewTarget, setViewTarget] = useState<GearItem | null>(null);

  const openCreate = useCallback(() => {
    setCreateOpen(true);
  }, []);

  const openEdit = useCallback((item: GearItem) => {
    setEditTarget(item);
  }, []);

  const handleSaved = useCallback((saved: GearItem) => {
    setItems((prev) => {
      const index = prev.findIndex((g) => g.id === saved.id);
      if (index === -1) return [...prev, saved];
      const next = [...prev];
      next[index] = saved;
      return next;
    });
  }, []);

  const handleDeleted = useCallback((id: string) => {
    setItems((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const categoryName = (id?: string) =>
    categories.find((c) => c.id === id)?.name || '—';

  const columns: TColumn<GearItem>[] = [
    { header: 'Sl.No', cell: (_, index) => <span>{(index ?? 0) + 1}</span> },
    {
      header: 'Title',
      cell: (row) => <span className="font-medium">{row.title.slice(0, 20)}</span>,
    },
    {
      header: 'Category',
      cell: (row) => <span>{categoryName(row.categoryId)}</span>,
    },
    // { header: 'Brand', accessor: 'brand' },
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
        <div className="flex items-center gap-2">
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
        <CustomTable columns={columns} data={items} />
        {items.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground border-t">
            No gear items yet. Click &quot;Add Gear&quot; to list your first item.
          </div>
        )}
      </div>

      <CreateGearItem
        open={createOpen}
        onOpenChange={setCreateOpen}
        categories={categories}
        onSaved={handleSaved}
      />

      <EditGearItem
        open={!!editTarget}
        onOpenChange={(open) => { if (!open) setEditTarget(null); }}
        item={editTarget}
        categories={categories}
        onSaved={handleSaved}
      />

      <DeleteGearItem
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        item={deleteTarget}
        onDeleted={handleDeleted}
      />

      <ViewGearItem
        open={!!viewTarget}
        onOpenChange={(open) => { if (!open) setViewTarget(null); }}
        item={viewTarget}
        categories={categories}
      />
    </div>
  );
}
