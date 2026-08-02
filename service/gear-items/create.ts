"use server";

import { apiPost } from "../fetchClient";

export interface IGearItemPayload {
  title: string;
  description: string;
  pricePerDay: number;
  location: string;
  brand: string;
  stock?: number;
  isFeature?: boolean;
  images?: string[];
  categoryId: string;
}

export const createGearItem = async (payload: IGearItemPayload) => {
  const result = await apiPost("/api/gear-items/create", payload);
  return result;
};
