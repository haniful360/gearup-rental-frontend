"use server"

import { cookies } from "next/headers"

export const deleteGear = async (id: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return { success: false, message: "User not logged in!" }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/service/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  })

  const result = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to delete gear",
    }
  }

  return result
}
