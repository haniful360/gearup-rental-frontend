import Link from "next/link";
import {
  Package,
  ClipboardList,
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingUp,
  Boxes,
} from "lucide-react";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import StatsGrid from "@/components/dashboard/DynamicStatCard/StatsGrid";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import {
  getProviderOverview,
  getProviderRecentOrders,
  getProviderTopGears,
  getProviderLowStockGears,
} from "@/service/provider-order/providerOverview";
import {
  IProviderRecentOrder,
  IProviderTopGear,
  IProviderLowStockGear,
} from "@/types/overview.types";
import { IStatCard } from "@/types/stat-card.types";

function formatDate(value?: string) {
  if (!value) return "—";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getOrderStatusBadge(status?: string) {
  const s = (status || "PENDING").toUpperCase();
  switch (s) {
    case "APPROVED":
    case "CONFIRMED":
    case "COMPLETED":
      return <DynamicBadge text={s} color="#10b981" size="xs" />;
    case "ACTIVE":
    case "ONGOING":
    case "IN_PROGRESS":
      return <DynamicBadge text={s} color="#3b82f6" size="xs" />;
    case "PENDING":
    case "PLACED":
      return <DynamicBadge text={s} color="#f59e0b" size="xs" />;
    case "CANCELLED":
    case "REJECTED":
      return <DynamicBadge text={s} color="#ef4444" size="xs" />;
    default:
      return <DynamicBadge text={s} color="#6b7280" size="xs" />;
  }
}

export default async function ProviderOverviewPage() {
  const [overviewRes, recentOrdersRes, topGearsRes, lowStockRes] =
    await Promise.allSettled([
      getProviderOverview(),
      getProviderRecentOrders(5),
      getProviderTopGears(5),
      getProviderLowStockGears(5),
    ]);

  const overviewData =
    overviewRes.status === "fulfilled" ? overviewRes.value?.data || {} : {};
  const recentOrders: IProviderRecentOrder[] =
    recentOrdersRes.status === "fulfilled"
      ? Array.isArray(recentOrdersRes.value?.data)
        ? recentOrdersRes.value.data
        : []
      : [];
  const topGears: IProviderTopGear[] =
    topGearsRes.status === "fulfilled"
      ? Array.isArray(topGearsRes.value?.data)
        ? topGearsRes.value.data
        : []
      : [];
  const lowStockGears: IProviderLowStockGear[] =
    lowStockRes.status === "fulfilled"
      ? Array.isArray(lowStockRes.value?.data)
        ? lowStockRes.value.data
        : []
      : [];

  const stats: IStatCard[] = [
    {
      title: "Total Gear Items",
      value: overviewData.totalGear ?? topGears.length,
      iconName: "Package",
      color: "emerald",
      subtext: "Items in your catalog",
    },
    {
      title: "Active Orders",
      value: overviewData.activeOrders ?? overviewData.totalOrders ?? recentOrders.length,
      iconName: "ClipboardList",
      color: "blue",
      subtext: "Current rental bookings",
    },
    {
      title: "Total Earnings",
      value: overviewData.totalEarnings ?? overviewData.revenue ?? 0,
      formatter: "currency",
      iconName: "DollarSign",
      color: "purple",
      subtext: "Net revenue from gear rentals",
    },
    {
      title: "Low Stock Items",
      value: overviewData.lowStockCount ?? lowStockGears.length,
      iconName: "AlertTriangle",
      color: lowStockGears.length > 0 ? "rose" : "amber",
      subtext: "Gear needing inventory update",
    },
  ];


  return (
    <div className="space-y-8">
      <DynamicPageHeader
        title="Provider Overview"
        description="Track incoming rental requests, top performing equipment, and inventory levels."
      />

      {/* Shared Dynamic Stat Component */}
      <StatsGrid stats={stats} columns={4} />

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders Section */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Recent Orders
            </h2>
            <Link
              href="/dashboard/provider/orders"
              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentOrders.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No recent rental orders received.
              </p>
            ) : (
              recentOrders.map((order) => {
                const gearTitle =
                  order.gearItem?.title ||
                  order.gearItem?.name ||
                  order.gear?.title ||
                  order.gear?.name ||
                  "Rental Gear";
                const customerName =
                  order.customer?.name ||
                  order.user?.name ||
                  "Renter";

                return (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 px-4 py-3 transition-colors hover:bg-muted/60"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {gearTitle}{" "}
                        <span className="text-xs text-muted-foreground">
                          · {customerName}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Order #{order.orderId || order.id.slice(0, 8)} · {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {getOrderStatusBadge(order.status)}
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        ${(order.totalPrice ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Low Stock Alerts Section */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Boxes className="h-4 w-4 text-amber-500" />
              Low Stock Alerts
            </h2>
            <Link
              href="/dashboard/provider/gear"
              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Manage inventory
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {lowStockGears.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <DynamicBadge text="Inventory Healthy" color="#10b981" size="sm" />
                <p className="mt-2 text-xs">All gear items have sufficient stock level.</p>
              </div>
            ) : (
              lowStockGears.map((item) => {
                const stockQty = item.quantity ?? item.stock ?? 0;
                const categoryName =
                  typeof item.category === "object"
                    ? item.category?.name
                    : item.category || "Equipment";

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-rose-500/5 border border-rose-500/20 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {item.title || item.name || "Gear Item"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Category: {categoryName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <DynamicBadge
                        text={`${stockQty} left`}
                        color={stockQty === 0 ? "#ef4444" : "#f59e0b"}
                        icon={AlertTriangle}
                        size="xs"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Top Gears Section */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Top Rented Equipment
          </h2>
          <Link
            href="/dashboard/provider/gear"
            className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            View gear list
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topGears.length === 0 ? (
            <p className="col-span-full py-6 text-center text-sm text-muted-foreground">
              No top rented gear reported yet.
            </p>
          ) : (
            topGears.map((gear) => {
              const categoryName =
                typeof gear.category === "object"
                  ? gear.category?.name
                  : gear.category || "General";
              const rentalsCount = gear.totalRentals ?? gear.rentalCount ?? 0;
              const earnings = gear.revenue ?? gear.totalEarnings ?? 0;

              return (
                <div
                  key={gear.id}
                  className="flex items-center justify-between rounded-lg border bg-muted/20 p-4 transition-all hover:border-emerald-500/30 hover:bg-muted/40"
                >
                  <div>
                    <p className="text-sm font-semibold truncate max-w-[180px]">
                      {gear.title || gear.name || "Gear Item"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {categoryName} · {rentalsCount} order{rentalsCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    ${earnings.toFixed(2)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
