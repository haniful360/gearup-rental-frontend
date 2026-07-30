"use server"

import { apiPatch } from "../fetchClient"

export const updateOrderStatus = async (id: string, status: string) => {
  const result = await apiPatch(`/api/provider-order/orders-status/${id}`, { status })
  return result
}
