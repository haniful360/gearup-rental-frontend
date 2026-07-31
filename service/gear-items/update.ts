"use server";

import { apiPatch } from "../fetchClient"

export interface UpdateGearItemPayload {
  title?: string;
  description?: string;
  pricePerDay?: number;
  location?: string;
  brand?: string;
  stock?: number;
  categoryId?: string;
}

export const updateGearItem = async (
  id: string,
  payload: UpdateGearItemPayload,
) => {
  const result = await apiPatch(`/api/gear-items/${id}`, payload);
  return result;
};
