import { redirect } from "next/navigation";
import { getMe } from "@/service/auth/getMe";

export default async function DashboardRootPage() {
  const result = await getMe();

  if (!result.success || !result.data?.role) {
    redirect("/login");
  }

  const role = result.data.role.toLowerCase();
  redirect(`/dashboard/${role}`);
}
