"use client";

import { useState, useCallback, useEffect } from "react";
import { ShieldBan, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import DynamicTableFilterBar from "@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar";
import CustomPagination from "@/components/dashboard/CustomPagination/CustomPagination";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import type { ITableFilter } from "@/types/table-filter.types";
import type { TColumn } from "@/types/custom-table.types";
import type { AdminUser, PaginationMeta } from "../../page";
import SuspendUserDialog from "../SuspendUserDialog/SuspendUserDialog";

interface UsersManageTableProps {
  initialUsers: AdminUser[];
  meta: PaginationMeta;
}

function roleColor(role?: string) {
  switch ((role || "").toUpperCase()) {
    case "ADMIN":
      return "#a855f7";
    case "PROVIDER":
      return "#3b82f6";
    case "CUSTOMER":
      return "#10b981";
    default:
      return "#94a3b8";
  }
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

export default function UsersManageTable({
  initialUsers,
  meta,
}: UsersManageTableProps) {
  const { setMultipleQueries, searchParams } = useSetSearchQueryInURL();
  const currentSearchTerm =
    searchParams.get("searchTerm") || searchParams.get("search") || "";
  const currentRole = searchParams.get("role") || "all";
  const currentStatus = searchParams.get("status") || "all";

  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [suspendTarget, setSuspendTarget] = useState<AdminUser | null>(null);
  const [searchValue, setSearchValue] = useState(currentSearchTerm);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  useEffect(() => {
    setSearchValue(currentSearchTerm);
  }, [currentSearchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== currentSearchTerm) {
        setMultipleQueries({ searchTerm: searchValue || null, page: 1 });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchValue, currentSearchTerm, setMultipleQueries]);

  const handleUpdated = useCallback((updated: AdminUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    );
  }, []);

  const filterFields: ITableFilter[] = [
    {
      type: "search",
      name: "searchTerm",
      placeholder: "Search users by name or email...",
      value: searchValue,
      onChange: (val: string) => setSearchValue(val),
    },
    {
      type: "select",
      name: "role",
      placeholder: "Filter by Role",
      value: currentRole,
      options: [
        { label: "All Roles", value: "all" },
        { label: "Customer", value: "CUSTOMER" },
        { label: "Provider", value: "PROVIDER" },
        { label: "Admin", value: "ADMIN" },
      ],
      onChange: (val: string) => {
        setMultipleQueries({ role: val === "all" ? null : val, page: 1 });
      },
    },
    {
      type: "select",
      name: "status",
      placeholder: "Filter by Status",
      value: currentStatus,
      options: [
        { label: "All Status", value: "all" },
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
      ],
      onChange: (val: string) => {
        setMultipleQueries({ status: val === "all" ? null : val, page: 1 });
      },
    },
  ];

  // Client-side fallback filtering if API returned un-filtered dataset
  const filteredUsers = users.filter((user) => {
    if (
      currentRole !== "all" &&
      user.role?.toUpperCase() !== currentRole.toUpperCase()
    ) {
      return false;
    }
    if (currentStatus === "suspended" && !user.isSuspended) {
      return false;
    }
    if (currentStatus === "active" && user.isSuspended) {
      return false;
    }
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      const matchName = user.name?.toLowerCase().includes(q);
      const matchEmail = user.email?.toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    return true;
  });

  const isServerPaginated = meta && meta.total > users.length;
  const computedLimit = meta.limit || 10;
  const computedPage = meta.page || 1;

  const displayUsers = isServerPaginated
    ? filteredUsers
    : filteredUsers.slice(
        (computedPage - 1) * computedLimit,
        computedPage * computedLimit
      );

  const totalItems = isServerPaginated ? meta.total : filteredUsers.length;
  const totalPages = isServerPaginated
    ? meta.totalPages
    : Math.max(1, Math.ceil(totalItems / computedLimit));

  const paginationMeta: PaginationMeta = {
    total: totalItems,
    page: computedPage,
    limit: computedLimit,
    totalPages: totalPages,
  };

  const columns: TColumn<AdminUser>[] = [
    {
      header: "User",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Role",
      cell: (row) => <DynamicBadge text={row.role} color={roleColor(row.role)} />,
    },
    {
      header: "Status",
      cell: (row) => (
        <DynamicBadge
          text={row.isSuspended ? "Suspended" : "Active"}
          color={row.isSuspended ? "#ef4444" : "#10b981"}
        />
      ),
    },
    {
      header: "Joined",
      cell: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      header: "Actions",
      cell: (row) => (
        <Button
          variant={row.isSuspended ? "outline" : "destructive"}
          size="sm"
          onClick={() => setSuspendTarget(row)}
        >
          {row.isSuspended ? (
            <ShieldCheck className="h-3.5 w-3.5" />
          ) : (
            <ShieldBan className="h-3.5 w-3.5" />
          )}
          {row.isSuspended ? "Reactivate" : "Suspend"}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="User Management"
        description="Manage platform users and control account access"
      />

      <div className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
        <DynamicTableFilterBar fields={filterFields} />

        <div className="overflow-hidden rounded-lg border">
          <CustomTable columns={columns} data={displayUsers} />
          {displayUsers.length === 0 && (
            <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
              No users found matching your filters.
            </div>
          )}
        </div>

        <CustomPagination meta={paginationMeta} />
      </div>

      <SuspendUserDialog
        key={
          suspendTarget
            ? `${suspendTarget.id}-${suspendTarget.isSuspended}`
            : "closed"
        }
        open={!!suspendTarget}
        onOpenChange={(open) => {
          if (!open) setSuspendTarget(null);
        }}
        user={suspendTarget}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
