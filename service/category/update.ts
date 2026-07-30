"use server"

import { apiPut } from "../fetchClient"

interface UpdateCategoryPayload {
  name?: string
  description?: string
}

export const updateCategory = async (id: string, payload: UpdateCategoryPayload) => {
  const result = await apiPut(`/api/category/${id}`, payload)
  return result
}
