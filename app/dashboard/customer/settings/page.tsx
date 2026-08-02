import { getMe } from "@/service/auth/getMe";
import ProfileSettings from "@/components/dashboard/ProfileSettings/ProfileSettings";

export default async function CustomerSettingsPage() {
  const result = await getMe();
  const user = result?.data as
    | {
        id?: string;
        name?: string;
        email?: string;
        role?: string;
        profiles?: {
          bio?: string | null;
          photo?: string | null;
          avatarUrl?: string | null;
          image?: string | null;
          phone?: string | null;
          city?: string | null;
          address?: string | null;
        } | null;
      }
    | null
    | undefined;

  if (!user?.id) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and profile information.
        </p>
      </div>
      <ProfileSettings
        user={{
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          role: user.role || "CUSTOMER",
          profiles: user.profiles,
        }}
      />
    </div>
  );
}
