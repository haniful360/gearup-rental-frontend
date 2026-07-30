"use server"

import { apiGet } from "../fetchClient"

export const getAllGearItems = async (params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
}) => {
  const result = await apiGet("/api/gear-items/get-gears", {
    params,
    tags: ["gear-items-list"],
    revalidate: 60,
  })
  return result
}
