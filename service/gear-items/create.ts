"use server";

import { apiPost } from "../fetchClient"

interface CreateGearItemPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  availability?: { startDate: string; endDate: string };
}

export const createGearItem = async (payload: CreateGearItemPayload) => {
  const result = await apiPost("/api/gear-items/create", payload);
  return result;
};
