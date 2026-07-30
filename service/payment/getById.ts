"use server"

import { apiGet } from "../fetchClient"

export const getPaymentById = async (id: string) => {
  const result = await apiGet(`/api/payment/${id}`, {
    tags: [`payment-${id}`],
    revalidate: 30,
  })
  return result
}
