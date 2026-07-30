"use server"

import { apiGet } from "../fetchClient"

export const getAdminUsers = async (params?: {
  page?: number
  limit?: number
  search?: string
}) => {
  const result = await apiGet("/api/admin/users", {
    params,
    tags: ["admin-users"],
    revalidate: 30,
  })
  return result
}
