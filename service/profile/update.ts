"use server"

import { apiPut } from "../fetchClient"

interface UpdateProfilePayload {
  name?: string
  bio?: string
  photo?: string
  phone?: string
  city?: string
  address?: string
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const result = await apiPut("/api/profile/update", payload)
  return result
}
