"use server"

import { apiGet } from "../fetchClient"

export const getAdminRentals = async (params?: {
  page?: number
  limit?: number
  status?: string
}) => {
  const result = await apiGet("/api/admin/rentals", {
    params,
    tags: ["admin-rentals"],
    revalidate: 30,
  })
  return result
}
