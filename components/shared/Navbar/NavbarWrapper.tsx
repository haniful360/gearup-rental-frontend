import { getMe } from "@/service/auth/getMe"
import { Navbar } from "./Navbar"

export async function NavbarWrapper() {
  const result = await getMe()

  const user = result?.success && result.data
    ? {
        name: result.data.name || "",
        email: result.data.email || "",
        role: result.data.role || null,
        photo:
          result.data.photo ||
          result.data.avatarUrl ||
          result.data.image ||
          result.data.profiles?.photo ||
          result.data.profiles?.avatarUrl ||
          result.data.profiles?.image ||
          null,
      }
    : null

  return <Navbar user={user} />
}
