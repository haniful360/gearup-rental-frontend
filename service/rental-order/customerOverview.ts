"use server";

import { apiGet } from "../fetchClient";
import {
  ICustomerOverviewData,
  ICustomerRecentOrder,
  ICustomerRecentReview,
} from "@/types/overview.types";
import { ApiResponse } from "../admin/adminOverview";

export const getCustomerOverview = async (): Promise<ApiResponse<ICustomerOverviewData>> => {
  return await apiGet<ApiResponse<ICustomerOverviewData>>("/api/rental-order/overview", {
    tags: ["customer-overview"],
    revalidate: 30,
  });
};

export const getCustomerRecentOrders = async (limit = 5): Promise<ApiResponse<ICustomerRecentOrder[]>> => {
  return await apiGet<ApiResponse<ICustomerRecentOrder[]>>("/api/rental-order/recent-orders", {
    params: { limit },
    tags: ["customer-recent-orders"],
    revalidate: 30,
  });
};

export const getCustomerRecentReviews = async (limit = 5): Promise<ApiResponse<ICustomerRecentReview[]>> => {
  return await apiGet<ApiResponse<ICustomerRecentReview[]>>("/api/rental-order/recent-reviews", {
    params: { limit },
    tags: ["customer-recent-reviews"],
    revalidate: 30,
  });
};
