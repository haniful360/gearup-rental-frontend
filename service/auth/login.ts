"use server"

import { cookies } from "next/headers"

export const login = async (payload: { email: string; password: string }) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Login failed" }
  }

  const cookieStore = await cookies()

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
