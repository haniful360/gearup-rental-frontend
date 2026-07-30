"use server"

export const register = async (payload: {
  name: string
  email: string
  password: string
  role: "CUSTOMER" | "PROVIDER"
}) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Registration failed" }
  }

  return result
}
