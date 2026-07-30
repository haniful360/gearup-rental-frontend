"use server"

import { apiPost } from "../fetchClient"

export const register = async (payload: {
  name: string
  email: string
  password: string
  role: "CUSTOMER" | "PROVIDER"
}) => {
  const result = await apiPost("/api/user/register", payload)
  return result
}
