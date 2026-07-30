"use server"

interface LoginPayload {
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Login failed" }
  }

  return result
}
