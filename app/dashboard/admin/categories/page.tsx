import { getAllCategories } from "@/service/category/getAll";
import CategoriesClient from "./_components/CategoryManageTable/CategoryManageTable";


export type Category = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

export default async function AdminCategoriesPage() {
  const result = await getAllCategories();
  const categories: Category[] = result?.data || [];

  return <CategoriesClient initialCategories={categories} />;
}
