"use server"

import { apiGet } from "../fetchClient"

export const getAllRentalOrders = async (params?: {
  page?: number
  limit?: number
  status?: string
}) => {
  const result = await apiGet("/api/rental-order/all-orders", {
    params,
    tags: ["rental-orders"],
    revalidate: 30,
  })
  return result
}
