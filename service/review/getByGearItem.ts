"use server"

import { apiGet } from "../fetchClient"

export const getReviewsByGearItem = async (gearItemId: string) => {
  const result = await apiGet(`/api/reviews/${gearItemId}`, {
    tags: [`reviews-${gearItemId}`],
    revalidate: 30,
  })
  return result
}
