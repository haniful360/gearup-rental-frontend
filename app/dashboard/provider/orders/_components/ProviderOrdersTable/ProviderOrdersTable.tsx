"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import type { TColumn } from "@/types/custom-table.types";
import { updateOrderStatus } from "@/service/provider-order/updateOrderStatus";
import type { ProviderOrder } from "../../page";

const STATUS_OPTIONS = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
  "REJECTED",
] as const;

const STATUS_COLORS: Record<string, string> = {
  PLACED: "#f59e0b",
  CONFIRMED: "#3b82f6",
  PAID: "#10b981",
  PICKED_UP: "#6366f1",
  RETURNED: "#06b6d4",
  CANCELLED: "#ef4444",
  REJECTED: "#f43f5e",
};

function formatStatus(status?: string) {
  return (status || "—").replace(/_/g, " ");
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

interface ProviderOrdersTableProps {
  initialOrders: ProviderOrder[];
}

export default function ProviderOrdersTable({
  initialOrders,
}: ProviderOrdersTableProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<ProviderOrder[]>(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateStatus = async (order: ProviderOrder, status: string) => {
    if (!order.id) return;
    setUpdatingId(order.id);
    try {
      const result = await updateOrderStatus(order.id, status);
      if (!result.success) {
        toast.error(result.message || "Failed to update order status");
        return;
      }
      const updated = (result?.data ?? {}) as ProviderOrder;
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, ...updated, status } : o)),
      );
      toast.success(`Order marked as ${formatStatus(status)}`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns: TColumn<ProviderOrder>[] = [
    {
      header: "Order",
      cell: (row) => (
        <span className="font-medium">#{row.id?.slice(0, 8) || "—"}</span>
      ),
    },
    {
      header: "Customer",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.customer?.name || "—"}</p>
          <p className="text-xs text-muted-foreground">
            {row.customer?.email || ""}
          </p>
        </div>
      ),
    },
    // {
    //   header: "Gear",
    //   cell: (row) => (
    //     <div>
    //       <p className="font-medium">{row.gearItem?.title || "—"}</p>
    //       <p className="text-xs text-muted-foreground">
    //         {row.gearItem?.location || ""}
    //       </p>
    //     </div>
    //   ),
    // },
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
      header: "Payment",
      cell: (row) => (
        <DynamicBadge
          text={formatStatus(row.paymentStatus)}
          color={
            (row.paymentStatus || "").toUpperCase() === "PENDING"
              ? "#f59e0b"
              : "#10b981"
          }
        />
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <DynamicBadge
          text={formatStatus(row.status)}
          color={STATUS_COLORS[(row.status || "").toUpperCase()] || "#94a3b8"}
        />
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5 cursor-pointer"
            )}
            disabled={updatingId === row.id}
          >
            {updatingId === row.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
            Update
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6}>
            {STATUS_OPTIONS.map((status) => (
              <DropdownMenuItem
                key={status}
                disabled={status === row.status}
                onClick={() => handleUpdateStatus(row, status)}
              >
                {status === row.status && <Check className="h-4 w-4" />}
                {formatStatus(status)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="Incoming Orders"
        description="View and manage incoming rental orders"
      />

      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={orders} />
        {orders.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No incoming rental orders yet. Once a customer books your gear, the
            order will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
