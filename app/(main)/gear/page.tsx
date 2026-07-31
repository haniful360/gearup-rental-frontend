import { getAllGearItems } from "@/service/gear-items/getAll";
import { getAllCategories } from "@/service/category/getAll";
import ExploreGearClient from "./_components/ExploreGearClient/ExploreGearClient";

export type GearItem = {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  location: string;
  brand: string;
  stock: number;
  categoryId?: string;
  categoryName?: string;
};

interface RawGearItem {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  pricePerDay?: number;
  location?: string;
  brand?: string;
  stock?: number;
  categoryId?: string;
  categoryName?: string;
}

interface Category {
  id: string;
  name: string;
}

export default async function ExploreGearPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, gearsResult, categoriesResult] = await Promise.all([
    searchParams,
    getAllGearItems({ limit: 100 }),
    getAllCategories(),
  ]);

  const categories: Category[] = categoriesResult?.data || [];
  const gears: GearItem[] = (gearsResult?.data || []).map((raw: RawGearItem) => ({
    id: raw?.id ?? raw?._id ?? "",
    title: raw?.title ?? "Untitled Gear",
    description: raw?.description ?? "",
    pricePerDay: Number(raw?.pricePerDay ?? 0),
    location: raw?.location ?? "",
    brand: raw?.brand ?? "",
    stock: Number(raw?.stock ?? 0),
    categoryId: raw?.categoryId,
    categoryName: raw?.categoryName || categories.find((c) => c.id === raw?.categoryId)?.name,
  }));

  return (
    <ExploreGearClient
      gears={gears}
      categories={categories}
      initialCategory={category}
    />
  );
}
