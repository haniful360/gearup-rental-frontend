import Link from "next/link";
import { getAllRentalOrders } from "@/service/rental-order/getAll";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import PayNowButton from "@/components/dashboard/PayNowButton/PayNowButton";
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

function formatOrderStatus(status?: string) {
  const s = (status || "").toUpperCase();
  if (s === "CANCELED") return "CANCELLED";
  return s || "PLACED";
}

function orderStatusColor(status?: string) {
  const s = formatOrderStatus(status);
  switch (s) {
    case "PLACED":
      return "#f59e0b";
    case "CONFIRMED":
      return "#3b82f6";
    case "PAID":
      return "#10b981";
    case "PICKED_UP":
      return "#6366f1";
    case "RETURNED":
      return "#06b6d4";
    case "CANCELLED":
      return "#ef4444";
    case "REJECTED":
      return "#f43f5e";
    default:
      return "#94a3b8";
  }
}

function formatPaymentStatus(paymentStatus?: string, orderStatus?: string) {
  const p = (paymentStatus || "").toUpperCase();
  const o = (orderStatus || "").toUpperCase();

  if (p === "PAID") return "PAID";
  if (p === "FAILED" || p === "CANCELLED" || p === "CANCELED" || o === "CANCELLED" || o === "REJECTED") {
    return "FAILED";
  }
  if (p === "REFUNDED") return "REFUNDED";
  return p || "PENDING";
}

function paymentStatusColor(paymentStatus?: string, orderStatus?: string) {
  const formatted = formatPaymentStatus(paymentStatus, orderStatus);
  switch (formatted) {
    case "PAID":
      return "#10b981";
    case "FAILED":
      return "#ef4444";
    case "PENDING":
      return "#f59e0b";
    case "REFUNDED":
      return "#6b7280";
    default:
      return "#94a3b8";
  }
}

function canPayNow(row: RentalOrder) {
  const pStatus = (row.paymentStatus || "").toUpperCase();
  const status = (row.status || "").toUpperCase();

  if (pStatus === "PAID" || status === "PAID" || pStatus === "REFUNDED") {
    return false;
  }

  return (
    ["PLACED", "CANCELLED", "CONFIRMED"].includes(status) ||
    ["PENDING", "FAILED", ""].includes(pStatus)
  );
}

export default async function CustomerOrdersPage() {
  const result = await getAllRentalOrders({ limit: 100 });

  const rawData = result?.data;
  const orders: RentalOrder[] = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
    ? rawData
    : Array.isArray(result)
    ? result
    : [];

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
        <DynamicBadge
          text={formatOrderStatus(row.status)}
          color={orderStatusColor(row.status)}
        />
      ),
    },
    {
      header: "Payment",
      cell: (row) => (
        <DynamicBadge
          text={formatPaymentStatus(row.paymentStatus, row.status)}
          color={paymentStatusColor(row.paymentStatus, row.status)}
        />
      ),
    },
    {
      header: "Action",
      cell: (row) =>
        canPayNow(row) && row.id ? (
          <PayNowButton orderId={row.id} size="sm" />
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
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
