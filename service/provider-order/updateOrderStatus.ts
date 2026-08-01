"use server"

import { updateTag } from "next/cache"
import { apiPatch } from "../fetchClient"

export const updateOrderStatus = async (id: string, status: string) => {
  const result = await apiPatch(`/api/provider-order/orders-status/${id}`, { status })

  if (result.success) {
    updateTag("provider-orders")
  }

  return result
}
