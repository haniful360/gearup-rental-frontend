import { getAllGearItems } from "@/service/gear-items/getAll";
import { getAllCategories } from "@/service/category/getAll";
import GearItemsManageTable from "./_components/GearItemsManageTable/GearItemsManageTable";

export type GearItem = {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  location: string;
  brand: string;
  stock: number;
  isFeature?: boolean;
  images?: string[];
  categoryId?: string;
};

export default async function ProviderInventoryPage() {
  const [gearResult, catResult] = await Promise.all([
    getAllGearItems(),
    getAllCategories(),
  ]);

  const items = gearResult?.data || [];
  const categories = catResult?.data || [];

  return <GearItemsManageTable initialItems={items} categories={categories} />;
}
