import { getAdminUsers } from "@/service/admin/getUsers";
import UsersManageTable from "./_components/UsersManageTable/UsersManageTable";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  isSuspended: boolean;
  suspensionReason?: string | null;
  createdAt?: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ? Number(resolvedParams.page) : 1;
  const limit = resolvedParams?.limit ? Number(resolvedParams.limit) : 10;
  const searchTerm = resolvedParams?.searchTerm || resolvedParams?.search || "";
  const role = resolvedParams?.role || "";
  const status = resolvedParams?.status || "";

  const result = await getAdminUsers({
    page,
    limit,
    searchTerm,
    role,
    status,
  });

  // Extract array of users safely whether response is paginated ({ meta, data: [...] }) or flat array
  const rawData = result?.data;
  const users: AdminUser[] = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
    ? rawData
    : Array.isArray(result)
    ? result
    : [];

  const rawMeta = result?.meta || rawData?.meta;
  const totalItems = typeof rawMeta?.total === "number" ? rawMeta.total : users.length;
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

  return <UsersManageTable initialUsers={users} meta={meta} />;
}
