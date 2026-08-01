import { getAllGearItems } from "@/service/gear-items/getAll";

export const dynamic = "force-dynamic";

interface RawGearItem {
  id?: string;
  title?: string;
  categoryName?: string;
  category?: { name?: string };
  categoryId?: string;
  location?: string;
  brand?: string;
  pricePerDay?: number;
}

interface SearchSuggestion {
  id: string;
  title: string;
  categoryName?: string;
  location?: string;
  brand?: string;
  pricePerDay: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  if (!q) {
    return Response.json({ suggestions: [] });
  }

  const result = await getAllGearItems({ limit: 100 });
  const rawItems: RawGearItem[] = result?.data ?? [];

  const suggestions: SearchSuggestion[] = rawItems
    .map((raw) => ({
      id: raw?.id ?? "",
      title: raw?.title ?? "",
      categoryName: raw?.category?.name ?? raw?.categoryName,
      location: raw?.location,
      brand: raw?.brand,
      pricePerDay: Number(raw?.pricePerDay ?? 0),
    }))
    .filter(
      (gear) =>
        gear.id &&
        (gear.title.toLowerCase().includes(q) ||
          gear.brand?.toLowerCase().includes(q) ||
          gear.location?.toLowerCase().includes(q) ||
          gear.categoryName?.toLowerCase().includes(q)),
    )
    .slice(0, 6);

  return Response.json({ suggestions });
}
