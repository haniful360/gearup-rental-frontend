import Link from "next/link";
import { getPaymentHistory } from "@/service/payment/history";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import type { TColumn } from "@/types/custom-table.types";

interface PaymentRecord {
  id?: string;
  rentalOrderId?: string;
  sessionId?: string;
  transactionId?: string | null;
  amount?: number;
  currency?: string;
  status?: string;
  paymentMethod?: string;
  createdAt?: string;
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
  if (s === "COMPLETED" || s === "SUCCESS" || s === "SUCCEEDED" || s === "PAID")
    return "#10b981";
  if (s === "PENDING" || s === "PROCESSING") return "#f59e0b";
  if (s === "FAILED" || s === "CANCELLED" || s === "CANCELED")
    return "#ef4444";
  return "#94a3b8";
}

export default async function PaymentHistoryPage() {
  const result = await getPaymentHistory({ limit: 100 });
  const payments: PaymentRecord[] = result?.data || [];

  const columns: TColumn<PaymentRecord>[] = [
    {
      header: "Payment",
      cell: (row) => (
        <span className="font-medium">
          #{row.id?.slice(0, 8) || row.transactionId?.slice(0, 8) || "—"}
        </span>
      ),
    },
    {
      header: "Order",
      cell: (row) => (
        <span>{row.rentalOrderId ? `#${row.rentalOrderId.slice(0, 8)}` : "—"}</span>
      ),
    },
    {
      header: "Amount",
      cell: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {row.currency ? `${row.currency.toUpperCase()} ` : "$"}
          {(row.amount ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Method",
      cell: (row) => <span>{row.paymentMethod || "Stripe"}</span>,
    },
    {
      header: "Status",
      cell: (row) => (
        <DynamicBadge text={row.status || "—"} color={statusColor(row.status)} />
      ),
    },
    {
      header: "Date",
      cell: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="Payment History"
        description="View all your rental payments and their status"
      />
      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={payments} />
        {payments.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No payments yet. Complete a checkout to see your payment history
            here.{" "}
            <Link
              href="/gear"
              className="font-medium text-emerald-600 hover:underline"
            >
              Browse gear
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
