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

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  })

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return result
}
