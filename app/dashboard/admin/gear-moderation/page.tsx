import Link from "next/link";
import { getAdminGear } from "@/service/admin/getGear";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import type { TColumn } from "@/types/custom-table.types";

interface AdminGearItem {
  id?: string;
  title?: string;
  description?: string;
  pricePerDay?: number;
  location?: string;
  brand?: string;
  stock?: number;
  isAvailable?: boolean;
  providerId?: string;
  categoryId?: string;
  createdAt?: string;
  category?: { id?: string; name?: string };
}

function formatDate(value?: string) {
  if (!value) return "—";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function GearModerationPage() {
  const result = await getAdminGear();
  const gear: AdminGearItem[] = result?.data || [];

  const columns: TColumn<AdminGearItem>[] = [
    {
      header: "Gear",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title?.slice(0, 40) || "—"}</p>
          <p className="text-xs text-muted-foreground">
            {row.description?.slice(0, 40) || "—"}
          </p>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (row) => <span>{row.category?.name || "—"}</span>,
    },
    {
      header: "Provider",
      cell: (row) => (
        <span className="text-xs">#{row.providerId?.slice(0, 8) || "—"}</span>
      ),
    },
    {
      header: "Price/Day",
      cell: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ${(row.pricePerDay ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Stock",
      cell: (row) => <span>{row.stock ?? 0}</span>,
    },
    {
      header: "Availability",
      cell: (row) => (
        <DynamicBadge
          text={row.isAvailable ? "Available" : "Unavailable"}
          color={row.isAvailable ? "#10b981" : "#ef4444"}
        />
      ),
    },
    {
      header: "Listed",
      cell: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="Gear Moderation"
        description="Review and moderate all gear listings on the platform"
      />

      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={gear} />
        {gear.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No gear items listed yet.{" "}
            <Link
              href="/dashboard/admin"
              className="font-medium text-emerald-600 hover:underline"
            >
              Back to overview
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
