"use server";

import { apiPatch } from "../fetchClient"

interface UpdateGearItemPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  location?: string;
  images?: string[];
  availability?: { startDate: string; endDate: string };
}

export const updateGearItem = async (
  id: string,
  payload: UpdateGearItemPayload,
) => {
  const result = await apiPatch(`/api/gear-items/${id}`, payload);
  return result;
};
