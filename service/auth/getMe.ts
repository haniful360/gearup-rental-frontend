"use server"

import { apiGet } from "../fetchClient"

export const getMe = async () => {
  const result = await apiGet("/api/user/me", {
    tags: ["my-profile"],
    revalidate: 60 * 60 * 24,
  })
  return result
}
