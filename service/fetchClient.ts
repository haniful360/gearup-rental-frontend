/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"

interface FetchOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number
  body?: unknown
}

async function getAuthHeaders() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : ({} as Record<string, string>)
}

function buildUrl(path: string, params?: Record<string, unknown>): string {
  const url = new URL(`${process.env.BACKEND_API_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    })
  }
  return url.toString()
}

async function request<T>(method: string, path: string, options: FetchOptions = {}): Promise<T> {
  const authHeaders = await getAuthHeaders()
  const { params, tags, revalidate, body, ...rest } = options

  const headers: Record<string, string> = { ...authHeaders }

  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }

  const nextOptions: Record<string, unknown> = {}
  if (tags) nextOptions.tags = tags
  if (revalidate !== undefined) nextOptions.revalidate = revalidate

  const res = await fetch(buildUrl(path, params), {
    method,
    headers,
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    ...(Object.keys(nextOptions).length ? { next: nextOptions } : {}),
    ...rest,
  } as RequestInit)

  const result = await res.json()

  if (!res.ok) {
    return { success: false, message: result.message || "Request failed" } as unknown as T
  }

  return result as T
}

export async function apiGet<T = any>(path: string, options?: FetchOptions) {
  return request<T>("GET", path, options)
}

export async function apiPost<T = any>(path: string, body?: unknown, options?: FetchOptions) {
  return request<T>("POST", path, { ...options, body })
}

export async function apiPatch<T = any>(path: string, body?: unknown, options?: FetchOptions) {
  return request<T>("PATCH", path, { ...options, body })
}

export async function apiPut<T = any>(path: string, body?: unknown, options?: FetchOptions) {
  return request<T>("PUT", path, { ...options, body })
}

export async function apiDelete<T = any>(path: string, options?: FetchOptions) {
  return request<T>("DELETE", path, options)
}
