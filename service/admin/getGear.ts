"use server"

import { apiGet } from "../fetchClient"

export const getAdminGear = async (params?: {
  page?: number
  limit?: number
  category?: string
}) => {
  const result = await apiGet("/api/admin/gear", {
    params,
    tags: ["admin-gear"],
    revalidate: 30,
  })
  return result
}
