"use server"

import { apiGet } from "../fetchClient"

export const getCategoryById = async (id: string) => {
  const result = await apiGet(`/api/category/${id}`, {
    tags: [`category-${id}`],
    revalidate: 60,
  })
  return result
}
