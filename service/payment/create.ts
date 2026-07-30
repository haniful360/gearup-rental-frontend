"use server"

import { apiPost } from "../fetchClient"

interface CreatePaymentPayload {
  rentalOrderId: string
}

export const createPayment = async (payload: CreatePaymentPayload) => {
  const result = await apiPost("/api/payment/create", payload)
  return result
}
