"use server"

import { apiPost } from "../fetchClient"

interface CreateRentalOrderPayload {
  gearItemId: string
  startDate: string
  endDate: string
  totalPrice: number
  quantity: number
}

export const createRentalOrder = async (payload: CreateRentalOrderPayload) => {
  const result = await apiPost("/api/rental-order/create", payload)
  return result
}
