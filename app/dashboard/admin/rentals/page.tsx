import { getAdminRentals } from "@/service/admin/getRentals";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import AdminRentalsTable from "./_components/AdminRentalsTable/AdminRentalsTable";

export interface AdminRental {
  id?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  quantity?: number;
  status?: string;
  paymentStatus?: string;
  createdAt?: string;
  customer?: { id?: string; name?: string; email?: string };
  gearItem?: { id?: string; title?: string };
}

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default async function AllRentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ? Number(resolvedParams.page) : 1;
  const limit = resolvedParams?.limit ? Number(resolvedParams.limit) : 10;
  const searchTerm = resolvedParams?.searchTerm || resolvedParams?.search || "";
  const status = resolvedParams?.status || "";

  const result = await getAdminRentals({
    page,
    limit,
    searchTerm,
    status,
  });

  const rawData = result?.data;
  const rentals: AdminRental[] = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
    ? rawData
    : Array.isArray(result)
    ? result
    : [];

  const rawMeta = result?.meta || rawData?.meta;
  const totalItems = typeof rawMeta?.total === "number" ? rawMeta.total : rentals.length;
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
        title="All Rentals"
        description="View all rental transactions across the platform"
      />

      <AdminRentalsTable initialRentals={rentals} meta={meta} />
    </div>
  );
}
