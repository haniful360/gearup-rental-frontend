import Link from "next/link";
import {
  Users,
  Package,
  ClipboardList,
  DollarSign,
  Clock,
  ShieldCheck,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import StatsGrid from "@/components/dashboard/DynamicStatCard/StatsGrid";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import {
  getAdminOverview,
  getAdminRecentUsers,
  getAdminRecentRentals,
  getAdminTopGears,
} from "@/service/admin/adminOverview";
import {
  IAdminRecentUser,
  IAdminRecentRental,
  IAdminTopGear,
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

function getStatusBadge(status?: string) {
  const s = (status || "UNKNOWN").toUpperCase();
  switch (s) {
    case "COMPLETED":
    case "APPROVED":
    case "CONFIRMED":
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

export default async function AdminOverviewPage() {
  const [overviewRes, recentUsersRes, recentRentalsRes, topGearsRes] =
    await Promise.allSettled([
      getAdminOverview(),
      getAdminRecentUsers(5),
      getAdminRecentRentals(5),
      getAdminTopGears(5),
    ]);

  const overviewData =
    overviewRes.status === "fulfilled" ? overviewRes.value?.data || {} : {};
  const recentUsers: IAdminRecentUser[] =
    recentUsersRes.status === "fulfilled"
      ? Array.isArray(recentUsersRes.value?.data)
        ? recentUsersRes.value.data
        : []
      : [];
  const recentRentals: IAdminRecentRental[] =
    recentRentalsRes.status === "fulfilled"
      ? Array.isArray(recentRentalsRes.value?.data)
        ? recentRentalsRes.value.data
        : []
      : [];
  const topGears: IAdminTopGear[] =
    topGearsRes.status === "fulfilled"
      ? Array.isArray(topGearsRes.value?.data)
        ? topGearsRes.value.data
        : []
      : [];

  const stats: IStatCard[] = [
    {
      title: "Total Users",
      value: overviewData.totalUsers ?? recentUsers.length,
      iconName: "Users",
      color: "emerald",
      subtext: "Registered on platform",
    },
    {
      title: "Gear Listed",
      value: overviewData.totalGear ?? topGears.length,
      iconName: "Package",
      color: "blue",
      subtext: "Total inventory items",
    },
    {
      title: "Active Rentals",
      value: overviewData.activeRentals ?? overviewData.totalRentals ?? recentRentals.length,
      iconName: "ClipboardList",
      color: "amber",
      subtext: "Ongoing transactions",
    },
    {
      title: "Total Revenue",
      value: overviewData.totalRevenue ?? 0,
      formatter: "currency",
      iconName: "DollarSign",
      color: "purple",
      subtext: "Gross rental revenue",
    },
  ];


  return (
    <div className="space-y-8">
      <DynamicPageHeader
        title="Admin Overview"
        description="Monitor overall platform activity, user growth, rentals, and top performance metrics."
      />

      {/* Shared Dynamic Stat Component */}
      <StatsGrid stats={stats} columns={4} />

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Rentals Section */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Recent Rentals
            </h2>
            <Link
              href="/dashboard/admin/rentals"
              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentRentals.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No recent rental transactions.
              </p>
            ) : (
              recentRentals.map((rental) => {
                const gearTitle =
                  rental.gearItem?.title ||
                  rental.gearItem?.name ||
                  rental.gear?.title ||
                  rental.gear?.name ||
                  "Rental Item";
                const customerName =
                  rental.customer?.name ||
                  rental.user?.name ||
                  "Customer";

                return (
                  <div
                    key={rental.id}
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
                        #{rental.id.slice(0, 8)} · {formatDate(rental.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(rental.status)}
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        ${(rental.totalPrice ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Users Section */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Recent Users
            </h2>
            <Link
              href="/dashboard/admin/users"
              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentUsers.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No users registered recently.
              </p>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3 transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {user.isSuspended ? (
                      <DynamicBadge
                        text="Suspended"
                        color="#ef4444"
                        icon={ShieldAlert}
                        size="xs"
                      />
                    ) : (
                      <DynamicBadge
                        text={user.role || "USER"}
                        color="#3b82f6"
                        size="xs"
                      />
                    )}
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Gears Section */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Top Performing Gear
          </h2>
          <Link
            href="/dashboard/admin/gear-moderation"
            className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Manage inventory
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topGears.length === 0 ? (
            <p className="col-span-full py-6 text-center text-sm text-muted-foreground">
              No top gear data recorded yet.
            </p>
          ) : (
            topGears.map((gear) => {
              const categoryName =
                typeof gear.category === "object"
                  ? gear.category?.name
                  : gear.category || "General";
              const rentalsCount = gear.totalRentals ?? gear.rentalCount ?? 0;
              const earnings = gear.revenue ?? gear.totalEarnings ?? gear.pricePerDay ?? 0;

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
                      {categoryName} · {rentalsCount} rental{rentalsCount !== 1 ? "s" : ""}
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
