"use server"

import { apiDelete } from "../fetchClient"

export const deleteGearItem = async (id: string) => {
  const result = await apiDelete(`/api/gear-items/${id}`)
  return result
}
