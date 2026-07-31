import { getAllGearItems } from "@/service/gear-items/getAll";
import { getAllCategories } from "@/service/category/getAll";
import InventoryClient from "./_components/InventoryClient";

export default async function ProviderInventoryPage() {
  const [gearResult, catResult] = await Promise.all([
    getAllGearItems(),
    getAllCategories(),
  ]);

  const items = gearResult?.data || [];
  const categories = catResult?.data || [];

  return <InventoryClient initialItems={items} categories={categories} />;
}
