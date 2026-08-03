"use server";

import { apiGet } from "../fetchClient";

export interface IAdminUserQuery {
  page?: number | string;
  limit?: number | string;
  role?: "CUSTOMER" | "PROVIDER" | "ADMIN" | string;
  status?: "active" | "suspended" | string;
  search?: string;
  searchTerm?: string;
}

export const getAdminUsers = async (params?: IAdminUserQuery) => {
  const queryParams: Record<string, unknown> = {};

  if (params?.page !== undefined) queryParams.page = params.page;
  if (params?.limit !== undefined) queryParams.limit = params.limit;
  if (params?.role) queryParams.role = params.role;
  if (params?.status) queryParams.status = params.status;

  const searchKeyword = params?.searchTerm || params?.search;
  if (searchKeyword && searchKeyword.trim() !== "") {
    queryParams.searchTerm = searchKeyword.trim();
  }

  const result = await apiGet("/api/admin/users", {
    params: queryParams,
    tags: ["admin-users"],
    revalidate: 0,
  });

  return result;
};
