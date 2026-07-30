import { getAllCategories } from "@/service/category/getAll";
import CategoriesClient from "./CategoriesClient";

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export default async function AdminCategoriesPage() {
  const result = await getAllCategories();
  const categories: Category[] = result?.data || [];

  return <CategoriesClient initialCategories={categories} />;
}
