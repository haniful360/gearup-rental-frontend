"use client";

import { useState, useCallback } from "react";
import { ShieldBan, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/components/dashboard/CustomTable/CustomTable";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import DynamicBadge from "@/components/dashboard/DynamicBadge/DynamicBadge";
import type { TColumn } from "@/types/custom-table.types";
import type { AdminUser } from "../../page";
import SuspendUserDialog from "../SuspendUserDialog/SuspendUserDialog";

interface UsersManageTableProps {
  initialUsers: AdminUser[];
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

export default function UsersManageTable({ initialUsers }: UsersManageTableProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [suspendTarget, setSuspendTarget] = useState<AdminUser | null>(null);

  const handleUpdated = useCallback((updated: AdminUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u)),
    );
  }, []);

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

      <div className="rounded-xl border bg-card shadow-sm">
        <CustomTable columns={columns} data={users} />
        {users.length === 0 && (
          <div className="border-t px-6 py-12 text-center text-sm text-muted-foreground">
            No users registered yet.
          </div>
        )}
      </div>

      <SuspendUserDialog
        key={suspendTarget ? `${suspendTarget.id}-${suspendTarget.isSuspended}` : "closed"}
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
