import { redirect } from "next/navigation"
import { getMe } from "@/service/auth/getMe"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getMe()

  if (!result.success) {
    redirect("/login")
  }

  if (result.data.role !== "ADMIN") {
    redirect(`/dashboard/${result.data.role.toLowerCase()}`)
  }

  return <DashboardLayout role="ADMIN" user={result.data}>{children}</DashboardLayout>
}
