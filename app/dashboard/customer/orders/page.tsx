import Link from "next/link";
import { getAllRentalOrders } from "@/service/rental-order/getAll";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import type { TColumn } from "@/types/custom-table.types";

interface RentalOrder {
  id?: string;
  gearItemId?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  quantity?: number;
  status?: string;
  paymentStatus?: string;
  transactionId?: string | null;
  createdAt?: string;
  gearItem?: {
    id?: string;
    title?: string;
    pricePerDay?: number;
    location?: string;
    brand?: string;
  };
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

function statusColor(status?: string) {
  const s = (status || "").toUpperCase();
  if (s === "PLACED" || s === "PENDING" || s === "REQUESTED") return "#f59e0b";
  if (s === "CONFIRMED" || s === "COMPLETED" || s === "APPROVED")
    return "#10b981";
  if (s === "ACTIVE" || s === "ONGOING") return "#3b82f6";
  if (s === "CANCELLED" || s === "CANCELED" || s === "REJECTED" || s === "FAILED")
    return "#ef4444";
  return "#94a3b8";
}

export default async function CustomerOrdersPage() {
  const result = await getAllRentalOrders({ limit: 100 });
  const orders: RentalOrder[] = result?.data || [];

  const columns: TColumn<RentalOrder>[] = [
    {
      header: "Order",
      cell: (row) => (
        <span className="font-medium">#{row.id?.slice(0, 8) || "—"}</span>
      ),
    },
    {
      header: "Gear",
      cell: (row) => (
        <span className="font-medium">{row.gearItem?.title || "—"}</span>
      ),
    },
    {
      header: "Rental Period",
      cell: (row) => (
        <span>
          {formatDate(row.startDate)} → {formatDate(row.endDate)}
        </span>
      ),
    },
    {
      header: "Qty",
      cell: (row) => <span>{row.quantity ?? 1}</span>,
    },
    {
      header: "Total",
      cell: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ${(row.totalPrice ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <DynamicBadge text={row.status || "—"} color={statusColor(row.status)} />
      ),
    },
    {
      header: "Payment",
      cell: (row) => (
        <DynamicBadge
          text={row.paymentStatus || "—"}
          color={statusColor(row.paymentStatus)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="My Orders"
        description="Track and manage your rental orders"
      />
      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={orders} />
        {orders.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No rental orders yet.{" "}
            <Link
              href="/gear"
              className="font-medium text-emerald-600 hover:underline"
            >
              Browse gear
            </Link>{" "}
            to book your first rental.
          </div>
        )}
      </div>
    </div>
  );
}
