"use server"

import { apiPost } from "../fetchClient"

interface CreateCategoryPayload {
  name: string
  description?: string
  image?: string
}

export const createCategory = async (payload: CreateCategoryPayload) => {
  const result = await apiPost("/api/category/create", payload)
  return result
}
