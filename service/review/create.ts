"use server"

import { apiPost } from "../fetchClient"

interface CreateReviewPayload {
  gearItemId: string
  rating: number
  comment: string
}

export const createReview = async (payload: CreateReviewPayload) => {
  const result = await apiPost("/api/reviews/create", payload)
  return result
}
