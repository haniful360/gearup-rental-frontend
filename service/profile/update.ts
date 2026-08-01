"use server"

import { updateTag } from "next/cache"
import { apiPatch } from "../fetchClient"

interface UpdateProfilePayload {
  name?: string
  bio?: string
  photo?: string
  phone?: string
  city?: string
  address?: string
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const result = await apiPatch("/api/profile/update", payload)

  if (result.success) {
    updateTag("my-profile")
  }

  return result
}
