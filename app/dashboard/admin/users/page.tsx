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

export default async function UserManagementPage() {
  const result = await getAdminUsers();

  // Extract array of users safely whether response is paginated ({ meta, data: [...] }) or flat array
  const rawData = result?.data;
  const users: AdminUser[] = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
    ? rawData
    : Array.isArray(result)
    ? result
    : [];

  return <UsersManageTable initialUsers={users} />;
}
