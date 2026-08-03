import { getAdminGear } from "@/service/admin/getGear";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import GearModerationTable from "./_components/GearModerationTable/GearModerationTable";

export interface AdminGearItem {
  id?: string;
  title?: string;
  description?: string;
  pricePerDay?: number;
  location?: string;
  brand?: string;
  stock?: number;
  isAvailable?: boolean;
  isFeature?: boolean;
  images?: string[];
  image?: string;
  imageUrl?: string;
  providerId?: string;
  categoryId?: string;
  createdAt?: string;
  category?: { id?: string; name?: string };
}

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default async function GearModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ? Number(resolvedParams.page) : 1;
  const limit = resolvedParams?.limit ? Number(resolvedParams.limit) : 10;
  const searchTerm = resolvedParams?.searchTerm || resolvedParams?.search || "";
  const category = resolvedParams?.category || "";

  const result = await getAdminGear({
    page,
    limit,
    searchTerm,
    category,
  });

  const rawData = result?.data;
  const gear: AdminGearItem[] = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
    ? rawData
    : Array.isArray(result)
    ? result
    : [];

  const rawMeta = result?.meta || rawData?.meta;
  const totalItems = typeof rawMeta?.total === "number" ? rawMeta.total : gear.length;
  const currentLimit = typeof rawMeta?.limit === "number" ? rawMeta.limit : limit;
  const currentPage = typeof rawMeta?.page === "number" ? rawMeta.page : page;
  const computedTotalPages =
    typeof rawMeta?.totalPages === "number"
      ? rawMeta.totalPages
      : Math.max(1, Math.ceil(totalItems / Math.max(1, currentLimit)));

  const meta: PaginationMeta = {
    total: totalItems,
    page: currentPage,
    limit: currentLimit,
    totalPages: computedTotalPages,
  };

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="Gear Moderation"
        description="Review and moderate all gear listings on the platform"
      />

      <GearModerationTable initialGear={gear} meta={meta} />
    </div>
  );
}
