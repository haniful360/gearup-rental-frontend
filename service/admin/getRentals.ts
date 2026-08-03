"use server";

import { apiGet } from "../fetchClient";

export interface IAdminRentalQuery {
  page?: number | string;
  limit?: number | string;
  status?: string;
  search?: string;
  searchTerm?: string;
}

export const getAdminRentals = async (params?: IAdminRentalQuery) => {
  const queryParams: Record<string, unknown> = {};

  if (params?.page !== undefined) queryParams.page = params.page;
  if (params?.limit !== undefined) queryParams.limit = params.limit;
  if (params?.status) queryParams.status = params.status;

  const searchKeyword = params?.searchTerm || params?.search;
  if (searchKeyword && searchKeyword.trim() !== "") {
    queryParams.searchTerm = searchKeyword.trim();
  }

  const result = await apiGet("/api/admin/rentals", {
    params: queryParams,
    tags: ["admin-rentals"],
    revalidate: 0,
  });

  return result;
};
