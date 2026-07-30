"use server"

import { cookies } from "next/headers"

interface CreateGearPayload {
  name: string
  description: string
  price: number
  category: string
  location: string
  images: string[]
  availability?: {
    startDate: string
    endDate: string
  }
}

export const createGear = async (payload: CreateGearPayload) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return { success: false, message: "User not logged in!" }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/service`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Failed to create gear" }
  }

  return result
}
