import { redirect } from "next/navigation"
import { getMe } from "@/service/auth/getMe"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

export default async function ProviderDashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getMe()

  if (!result.success) {
    redirect("/login")
  }

  if (result.data.role !== "PROVIDER") {
    redirect(`/dashboard/${result.data.role.toLowerCase()}`)
  }

  return <DashboardLayout role="PROVIDER" user={result.data}>{children}</DashboardLayout>
}
