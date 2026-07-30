"use server"

import { cookies } from "next/headers"

export const refreshToken = async () => {
  const cookieStore = await cookies()
  const refreshTokenValue = cookieStore.get("refreshToken")?.value || null

  if (!refreshTokenValue) {
    return {
      success: false,
      message: "No refresh token found",
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    }
  )

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Token refresh failed" }
  }

  return result
}
