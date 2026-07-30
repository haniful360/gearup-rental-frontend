"use server"

import { cookies } from "next/headers"

export const getAllGear = async (params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
}) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  const url = new URL(`${process.env.BACKEND_API_URL}/api/service`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Cookie"] = `accessToken=${accessToken}`
  }

  const res = await fetch(url.toString(), {
    headers,
    next: {
      revalidate: 60,
      tags: ["gear-list"],
    },
  })

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Failed to fetch gear" }
  }

  return result
}
