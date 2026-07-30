"use server"

import { cookies } from "next/headers"
import { apiPost } from "../fetchClient"

export const refreshToken = async () => {
  const cookieStore = await cookies()
  const refreshTokenValue = cookieStore.get("refreshToken")?.value || null

  if (!refreshTokenValue) {
    return { success: false, message: "No refresh token found" }
  }

  const result = await apiPost("/api/auth/refresh-token", { refreshToken: refreshTokenValue })

  if (result.success) {
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true, secure: true, sameSite: "strict",
      maxAge: 60 * 60 * 24, path: "/",
    })
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true, secure: true, sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, path: "/",
    })
  }

  return result
}
