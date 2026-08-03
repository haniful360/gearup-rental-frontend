"use server";

import { apiGet } from "../fetchClient";

export interface IAdminGearQuery {
  page?: number | string;
  limit?: number | string;
  category?: string;
  search?: string;
  searchTerm?: string;
}

export const getAdminGear = async (params?: IAdminGearQuery) => {
  const queryParams: Record<string, unknown> = {};

  if (params?.page !== undefined) queryParams.page = params.page;
  if (params?.limit !== undefined) queryParams.limit = params.limit;
  if (params?.category) queryParams.category = params.category;

  const searchKeyword = params?.searchTerm || params?.search;
  if (searchKeyword && searchKeyword.trim() !== "") {
    queryParams.searchTerm = searchKeyword.trim();
  }

  const result = await apiGet("/api/admin/gear", {
    params: queryParams,
    tags: ["admin-gear"],
    revalidate: 0,
  });

  return result;
};
