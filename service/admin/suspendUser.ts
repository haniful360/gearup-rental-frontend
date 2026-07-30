"use server"

import { apiPatch } from "../fetchClient"

interface SuspendUserPayload {
  isSuspended: boolean
  reason: string
}

export const suspendUser = async (id: string, payload: SuspendUserPayload) => {
  const result = await apiPatch(`/api/admin/users/${id}`, payload)
  return result
}
