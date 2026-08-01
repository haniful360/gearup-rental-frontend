import Link from "next/link";
import {
  Users,
  Package,
  ClipboardList,
  ShieldAlert,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { getAdminUsers } from "@/service/admin/getUsers";
import { getAdminGear } from "@/service/admin/getGear";
import { getAdminRentals } from "@/service/admin/getRentals";

const ACTIVE_STATUSES = ["PLACED", "CONFIRMED", "APPROVED", "ACTIVE", "ONGOING"];

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isSuspended: boolean;
  createdAt?: string;
}

interface AdminGearItem {
  id: string;
  title: string;
  isAvailable?: boolean;
  createdAt?: string;
}

interface AdminRental {
  id: string;
  status?: string;
  totalPrice?: number;
  createdAt?: string;
  customer?: { name?: string };
  gearItem?: { title?: string };
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

export default async function AdminOverviewPage() {
  const [usersResult, gearResult, rentalsResult] = await Promise.all([
    getAdminUsers(),
    getAdminGear(),
    getAdminRentals(),
  ]);

  const users: AdminUser[] = usersResult?.data || [];
  const gear: AdminGearItem[] = gearResult?.data || [];
  const rentals: AdminRental[] = rentalsResult?.data || [];

  const suspendedUsers = users.filter((u) => u.isSuspended);
  const activeRentals = rentals.filter((r) =>
    ACTIVE_STATUSES.includes((r.status || "").toUpperCase()),
  );
  const pendingGear = gear.filter((g) => !g.isAvailable);

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Gear Listed",
      value: gear.length,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Rentals",
      value: activeRentals.length,
      icon: ClipboardList,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Suspended Users",
      value: suspendedUsers.length,
      icon: ShieldAlert,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  const recentRentals = rentals.slice(0, 5);
  const recentUsers = users.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">
          Monitor platform activity and manage operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-emerald-600" />
              Recent Rentals
            </h2>
            <Link
              href="/dashboard/admin/rentals"
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentRentals.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No rental transactions yet.
              </p>
            )}
            {recentRentals.map((rental) => (
              <div
                key={rental.id}
                className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {rental.gearItem?.title || "Rental"} —{" "}
                    <span className="text-muted-foreground">
                      {rental.customer?.name || "Customer"}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    #{rental.id.slice(0, 8)} · {formatDate(rental.createdAt)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  ${(rental.totalPrice ?? 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Recent Users
            </h2>
            <Link
              href="/dashboard/admin/users"
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentUsers.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No users registered yet.
              </p>
            )}
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.email} · {user.role}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {pendingGear.length > 0 && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Unavailable Gear</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {pendingGear.length} gear item{pendingGear.length > 1 ? "s" : ""}{" "}
            currently marked unavailable.
          </p>
        </div>
      )}
    </div>
  );
}
