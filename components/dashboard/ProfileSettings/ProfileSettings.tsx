"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, FileText } from "lucide-react";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/service/profile/update";

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  role: string;
  profiles?: {
    bio?: string | null;
    phone?: string | null;
    city?: string | null;
    address?: string | null;
  } | null;
}

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .refine(
      (value) => !value || value.replace(/\D/g, "").length >= 11,
      "Phone number must be at least 11 digits",
    ),
  city: z.string(),
  address: z.string(),
  bio: z.string().max(300, "Bio must be under 300 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  user: ProfileUser;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user.name || "",
      phone: user.profiles?.phone || "",
      city: user.profiles?.city || "",
      address: user.profiles?.address || "",
      bio: user.profiles?.bio || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      const payload: Record<string, string> = { name: data.name };
      if (data.phone) payload.phone = data.phone;
      if (data.city) payload.city = data.city;
      if (data.address) payload.address = data.address;
      if (data.bio) payload.bio = data.bio;

      const result = await updateProfile(payload);
      if (!result.success) {
        toast.error(result.message || "Failed to update profile");
        return;
      }
      toast.success("Profile updated successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/10">
            <User className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="mb-5 font-semibold">Account Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Full Name"
              name="name"
              control={control}
              placeholder="Your full name"
              
              required
              error={errors.name?.message}
            />
            <div className="space-y-1.5">
              <Label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Email
              </Label>
              <div className="flex h-11 w-full items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100">
                {user.email}
              </div>
            </div>
            <InputField
              label="Phone"
              name="phone"
              control={control}
              placeholder="+880 1XXX-XXXXXX"
              
              error={errors.phone?.message}
            />
            <InputField
              label="City"
              name="city"
              control={control}
              placeholder="Your city"
              
              error={errors.city?.message}
            />
            <InputField
              label="Address"
              name="address"
              control={control}
              placeholder="Street, area, zip code"
              
              error={errors.address?.message}
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="mb-5 flex items-center gap-2 font-semibold">
            <FileText className="h-4 w-4 text-emerald-600" />
            About You
          </h3>
          <div className="space-y-2">
            <Label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Bio
            </Label>
            <Textarea
              {...register("bio")}
              placeholder="Tell other users a bit about yourself..."
              rows={4}
              className="resize-none"
            />
            {errors.bio?.message && (
              <p className="text-xs font-medium text-rose-500">
                {errors.bio.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <DynamicActionButton
            type="submit"
            label={isSaving ? "Saving..." : "Save Changes"}
            isLoading={isSaving}
            disabled={isSaving}
          />
        </div>
      </form>
    </div>
  );
}
