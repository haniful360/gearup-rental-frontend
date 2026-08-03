"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/service/auth/logout";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  return handleLogout;
};
