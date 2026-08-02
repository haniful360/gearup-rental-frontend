import { getAllCategories } from "@/service/category/getAll";
import { getAllGearItems } from "@/service/gear-items/getAll";
import { getGearImagesList } from "@/lib/gear-images";
import { HeroSection } from "./_components/HeroSection";
import { StatsBanner } from "./_components/StatsBanner";
import { HowItWorks } from "./_components/HowItWorks";
import { PopularCategories } from "./_components/PopularCategories";
import { FeaturedGear } from "./_components/FeaturedGear";
import { Testimonials } from "./_components/Testimonials";
import { CallToAction } from "./_components/CallToAction";
import type { GearItem } from "@/app/(main)/gear/page";

interface RawGearItem {
  id?: string;
  title?: string;
  description?: string;
  pricePerDay?: number;
  location?: string;
  brand?: string;
  stock?: number;
  categoryId?: string;
  categoryName?: string;
  images?: string[];
  image?: string;
  imageUrl?: string;
  isFeature?: boolean;
}

export default async function HomePage() {
  const [categoriesResult, gearsResult] = await Promise.all([
    getAllCategories(),
    getAllGearItems({ limit: 100 }),
  ]);

  const categories = categoriesResult?.data || [];
  const rawGears: RawGearItem[] = gearsResult?.data || [];

  const allGears: GearItem[] = rawGears.map((raw, index) => {
    const categoryName =
      raw?.categoryName ||
      categories.find((c: { id: string; name: string }) => c.id === raw?.categoryId)?.name;

    const rawImages = Array.isArray(raw?.images) && raw.images.length > 0
      ? raw.images
      : typeof raw?.image === "string" && raw.image
      ? [raw.image]
      : typeof raw?.imageUrl === "string" && raw.imageUrl
      ? [raw.imageUrl]
      : [];

    return {
      id: raw?.id ?? "",
      title: raw?.title ?? "Untitled Gear",
      description: raw?.description ?? "",
      pricePerDay: Number(raw?.pricePerDay ?? 0),
      location: raw?.location ?? "",
      brand: raw?.brand ?? "",
      stock: Number(raw?.stock ?? 0),
      categoryId: raw?.categoryId,
      categoryName,
      images: getGearImagesList(categoryName, rawImages, index),
      isFeature: !!raw?.isFeature,
    };
  });

  const featuredGears = allGears.filter((g) => g.isFeature);
  const displayFeatured =
    featuredGears.length > 0 ? featuredGears.slice(0, 4) : allGears.slice(0, 4);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBanner />
      <HowItWorks />
      <PopularCategories categories={categories} />
      <FeaturedGear gears={displayFeatured} />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
