"use server"

import { apiGet } from "../fetchClient"

export const getProviderOrders = async (params?: {
  page?: number
  limit?: number
  status?: string
}) => {
  const result = await apiGet("/api/provider-order/orders", {
    params,
    tags: ["provider-orders"],
    revalidate: 30,
  })
  return result
}
