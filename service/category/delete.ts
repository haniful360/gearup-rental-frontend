"use server"

import { apiDelete } from "../fetchClient"

export const deleteCategory = async (id: string) => {
  const result = await apiDelete(`/api/category/${id}`)
  return result
}
