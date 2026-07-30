"use server"

import { cookies } from "next/headers"

interface UpdateGearPayload {
  name?: string
  description?: string
  price?: number
  category?: string
  location?: string
  images?: string[]
  availability?: {
    startDate: string
    endDate: string
  }
}

export const updateGear = async (id: string, payload: UpdateGearPayload) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return { success: false, message: "User not logged in!" }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/service/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update gear",
    }
  }

  return result
}
