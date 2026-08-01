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
  const users: AdminUser[] = result?.data || [];

  return <UsersManageTable initialUsers={users} />;
}
