import { getMe } from "@/service/auth/getMe"
import { Navbar } from "./Navbar"

export async function NavbarWrapper() {
  const result = await getMe()

  const user = result?.success
    ? {
        name: result.data?.name || "",
        email: result.data?.email || "",
        role: result.data?.role || null,
      }
    : null

  return <Navbar user={user} />
}
