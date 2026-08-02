import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  Star,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import StatsGrid from "@/components/dashboard/DynamicStatCard/StatsGrid";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import {
  getCustomerOverview,
  getCustomerRecentOrders,
  getCustomerRecentReviews,
} from "@/service/rental-order/customerOverview";
import {
  ICustomerRecentOrder,
  ICustomerRecentReview,
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

function renderStarRating(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i <= rating
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted-foreground/40"
        }`}
      />
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default async function CustomerOverviewPage() {
  const [overviewRes, recentOrdersRes, recentReviewsRes] = await Promise.allSettled([
    getCustomerOverview(),
    getCustomerRecentOrders(5),
    getCustomerRecentReviews(5),
  ]);

  const overviewData =
    overviewRes.status === "fulfilled" ? overviewRes.value?.data || {} : {};
  const recentOrders: ICustomerRecentOrder[] =
    recentOrdersRes.status === "fulfilled"
      ? Array.isArray(recentOrdersRes.value?.data)
        ? recentOrdersRes.value.data
        : []
      : [];
  const recentReviews: ICustomerRecentReview[] =
    recentReviewsRes.status === "fulfilled"
      ? Array.isArray(recentReviewsRes.value?.data)
        ? recentReviewsRes.value.data
        : []
      : [];

  const stats: IStatCard[] = [
    {
      title: "Total Orders",
      value: overviewData.totalOrders ?? recentOrders.length,
      iconName: "ShoppingBag",
      color: "emerald",
      subtext: "Gear rental reservations",
    },
    {
      title: "Active Rentals",
      value: overviewData.activeRentals ?? 0,
      iconName: "Clock",
      color: "blue",
      subtext: "Currently rented items",
    },
    {
      title: "Total Spent",
      value: overviewData.totalSpent ?? 0,
      formatter: "currency",
      iconName: "DollarSign",
      color: "purple",
      subtext: "Total investment in rentals",
    },
    {
      title: "Reviews Given",
      value: overviewData.reviewsGiven ?? recentReviews.length,
      iconName: "Star",
      color: "amber",
      subtext: "Ratings submitted",
    },
  ];


  return (
    <div className="space-y-8">
      <DynamicPageHeader
        title="Customer Overview"
        description="Welcome back! Track your gear rentals, active reservations, and recent feedback."
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
              href="/dashboard/customer/orders"
              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentOrders.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                You haven&apos;t placed any rental orders yet.
              </p>
            ) : (
              recentOrders.map((order) => {
                const gearTitle =
                  order.gearItem?.title ||
                  order.gearItem?.name ||
                  order.gear?.title ||
                  order.gear?.name ||
                  "Gear Order";

                return (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 px-4 py-3 transition-colors hover:bg-muted/60"
                  >
                    <div>
                      <p className="text-sm font-medium">{gearTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        Order #{order.id.slice(0, 8)} · {formatDate(order.createdAt)}
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

        {/* Recent Reviews Section */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Recent Reviews
            </h2>
            <Link
              href="/dashboard/customer/reviews"
              className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentReviews.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                You haven&apos;t left any gear reviews yet.
              </p>
            ) : (
              recentReviews.map((rev) => {
                const gearTitle =
                  rev.gearItem?.title ||
                  rev.gearItem?.name ||
                  rev.gear?.title ||
                  rev.gear?.name ||
                  "Gear Item";
                const text = rev.comment || rev.review || "No written review";

                return (
                  <div
                    key={rev.id}
                    className="rounded-lg bg-muted/40 p-4 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{gearTitle}</p>
                      {renderStarRating(rev.rating)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      &quot;{text}&quot;
                    </p>
                    <p className="mt-2 text-[10px] text-muted-foreground/80">
                      {formatDate(rev.createdAt)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
