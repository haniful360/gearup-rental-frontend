"use server";

import { apiGet } from "../fetchClient";
import {
  IProviderOverviewData,
  IProviderRecentOrder,
  IProviderTopGear,
  IProviderLowStockGear,
} from "@/types/overview.types";
import { ApiResponse } from "../admin/adminOverview";

export const getProviderOverview = async (): Promise<ApiResponse<IProviderOverviewData>> => {
  return await apiGet<ApiResponse<IProviderOverviewData>>("/api/provider-order/overview", {
    tags: ["provider-overview"],
    revalidate: 30,
  });
};

export const getProviderRecentOrders = async (limit = 5): Promise<ApiResponse<IProviderRecentOrder[]>> => {
  return await apiGet<ApiResponse<IProviderRecentOrder[]>>("/api/provider-order/recent-orders", {
    params: { limit },
    tags: ["provider-recent-orders"],
    revalidate: 30,
  });
};

export const getProviderTopGears = async (limit = 5): Promise<ApiResponse<IProviderTopGear[]>> => {
  return await apiGet<ApiResponse<IProviderTopGear[]>>("/api/provider-order/top-gears", {
    params: { limit },
    tags: ["provider-top-gears"],
    revalidate: 30,
  });
};

export const getProviderLowStockGears = async (limit = 5): Promise<ApiResponse<IProviderLowStockGear[]>> => {
  return await apiGet<ApiResponse<IProviderLowStockGear[]>>("/api/provider-order/low-stock-gears", {
    params: { limit },
    tags: ["provider-low-stock-gears"],
    revalidate: 30,
  });
};
