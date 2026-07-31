"use server";

import { apiPost } from "../fetchClient"

export interface CreateGearItemPayload {
  title: string;
  description: string;
  pricePerDay: number;
  location: string;
  brand: string;
  stock: number;
  categoryId: string;
}

export const createGearItem = async (payload: CreateGearItemPayload) => {
  const result = await apiPost("/api/gear-items/create", payload);
  return result;
};
