"use server";

import { apiGet } from "../fetchClient";
import {
  IAdminOverviewData,
  IAdminRecentUser,
  IAdminRecentRental,
  IAdminTopGear,
} from "@/types/overview.types";

export interface ApiResponse<T> {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
}

export const getAdminOverview = async (): Promise<ApiResponse<IAdminOverviewData>> => {
  return await apiGet<ApiResponse<IAdminOverviewData>>("/api/admin/overview", {
    tags: ["admin-overview"],
    revalidate: 30,
  });
};

export const getAdminRecentUsers = async (limit = 5): Promise<ApiResponse<IAdminRecentUser[]>> => {
  return await apiGet<ApiResponse<IAdminRecentUser[]>>("/api/admin/recent-users", {
    params: { limit },
    tags: ["admin-recent-users"],
    revalidate: 30,
  });
};

export const getAdminRecentRentals = async (limit = 5): Promise<ApiResponse<IAdminRecentRental[]>> => {
  return await apiGet<ApiResponse<IAdminRecentRental[]>>("/api/admin/recent-rentals", {
    params: { limit },
    tags: ["admin-recent-rentals"],
    revalidate: 30,
  });
};

export const getAdminTopGears = async (limit = 5): Promise<ApiResponse<IAdminTopGear[]>> => {
  return await apiGet<ApiResponse<IAdminTopGear[]>>("/api/admin/top-gears", {
    params: { limit },
    tags: ["admin-top-gears"],
    revalidate: 30,
  });
};
