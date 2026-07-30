"use server"

import { apiGet } from "../fetchClient"

export const getAllCategories = async () => {
  const result = await apiGet("/api/category/get-categories", {
    tags: ["categories"],
    revalidate: 60,
  })
  return result
}
