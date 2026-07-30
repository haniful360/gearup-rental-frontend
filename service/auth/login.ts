"use server"

import { cookies } from "next/headers"
import { apiPost } from "../fetchClient"

export const login = async (payload: { email: string; password: string }) => {
  const result = await apiPost("/api/auth/login", payload)

  if (result.success) {
    const cookieStore = await cookies()
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
