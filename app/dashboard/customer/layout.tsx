import { redirect } from "next/navigation"
import { getMe } from "@/service/auth/getMe"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getMe()

  if (!result.success) {
    redirect("/login")
  }

  if (result.data.role !== "CUSTOMER") {
    redirect(`/dashboard/${result.data.role.toLowerCase()}`)
  }

  return <DashboardLayout role="CUSTOMER" user={result.data}>{children}</DashboardLayout>
}
