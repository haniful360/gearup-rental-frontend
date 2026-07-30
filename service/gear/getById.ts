"use server"

import { cookies } from "next/headers"

export const getGearById = async (id: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  const headers: Record<string, string> = {}
  if (accessToken) {
    headers["Cookie"] = `accessToken=${accessToken}`
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/service/${id}`,
    {
      headers,
      next: {
        revalidate: 60,
        tags: [`gear-${id}`],
      },
    }
  )

  const result = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to fetch gear",
    }
  }

  return result
}
