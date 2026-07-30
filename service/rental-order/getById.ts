"use server"

import { apiGet } from "../fetchClient"

export const getRentalOrderById = async (id: string) => {
  const result = await apiGet(`/api/rental-order/${id}`, {
    tags: [`rental-order-${id}`],
    revalidate: 30,
  })
  return result
}
