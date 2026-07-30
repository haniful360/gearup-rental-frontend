"use server"

import { apiGet } from "../fetchClient"

export const getGearItemById = async (id: string) => {
  const result = await apiGet(`/api/gear-items/${id}`, {
    tags: [`gear-item-${id}`],
    revalidate: 60,
  })
  return result
}
