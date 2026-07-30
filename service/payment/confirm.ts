"use server"

import { apiPost } from "../fetchClient"

interface ConfirmPaymentPayload {
  sessionId: string
}

export const confirmPayment = async (payload: ConfirmPaymentPayload) => {
  const result = await apiPost("/api/payment/confirm", payload)
  return result
}
