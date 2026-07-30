"use server"

import { apiGet } from "../fetchClient"

export const getPaymentHistory = async (params?: {
  page?: number
  limit?: number
}) => {
  const result = await apiGet("/api/payment/history", {
    params,
    tags: ["payment-history"],
    revalidate: 30,
  })
  return result
}
