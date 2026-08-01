"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { suspendUser } from "@/service/admin/suspendUser";
import type { AdminUser } from "../../page";

interface SuspendUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUser | null;
  onUpdated: (user: AdminUser) => void;
}

export default function SuspendUserDialog({
  open,
  onOpenChange,
  user,
  onUpdated,
}: SuspendUserDialogProps) {
  const [reason, setReason] = useState(user?.suspensionReason || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSuspension = async () => {
    if (!user) return;
    const nextSuspended = !user.isSuspended;
    if (nextSuspended && !reason.trim()) {
      toast.error("Please provide a suspension reason");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await suspendUser(user.id, {
        isSuspended: nextSuspended,
        reason: reason.trim(),
      });
      if (!result.success) {
        toast.error(result.message || "Failed to update user status");
        return;
      }
      const updated = (result?.data ?? {}) as AdminUser;
      toast.success(
        nextSuspended ? "User suspended" : "User reactivated",
      );
      onUpdated(updated);
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user?.isSuspended ? "Reactivate" : "Suspend"} {user?.name}
          </DialogTitle>
          <DialogDescription>
            {user?.isSuspended
              ? "Reactivate this account so the user can sign in and use GearUp again."
              : "Suspend this account to prevent the user from signing in and renting gear."}
          </DialogDescription>
        </DialogHeader>

        {!user?.isSuspended && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Reason for suspension
            </label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Multiple policy violations"
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className={
              user?.isSuspended
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-rose-600 hover:bg-rose-700 text-white"
            }
            onClick={toggleSuspension}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : user?.isSuspended
                ? "Reactivate"
                : "Suspend"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
