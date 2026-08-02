"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, FileText, Camera, Upload, Loader2, X, Cloud } from "lucide-react";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { updateProfile } from "@/service/profile/update";
import { uploadToCloudinary } from "@/service/cloudinary/upload";
import CloudinarySingleImageUploadField from "@/components/dashboard/Fields/CloudinarySingleImageUploadField/CloudinarySingleImageUploadField";

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  role: string;
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

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  photo: z.string().optional(),
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
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const initialPhoto =
    user.profiles?.photo ||
    user.profiles?.avatarUrl ||
    user.profiles?.image ||
    "";

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user.name || "",
      photo: initialPhoto,
      phone: user.profiles?.phone || "",
      city: user.profiles?.city || "",
      address: user.profiles?.address || "",
      bio: user.profiles?.bio || "",
    },
  });

  const photoValue = useWatch({ control, name: "photo" });

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleAvatarFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadToCloudinary(formData);
      if (result.success && result.url) {
        setValue("photo", result.url, { shouldDirty: true });
        toast.success("Profile photo uploaded!");
      } else {
        toast.error(result.message || "Failed to upload profile photo");
      }
    } catch {
      toast.error("Photo upload failed");
    } finally {
      setIsUploadingPhoto(false);
      e.target.value = "";
    }
  };

  const handleRemovePhoto = () => {
    setValue("photo", "", { shouldDirty: true });
    toast.info("Profile photo removed");
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      const payload: Record<string, string> = { name: data.name };
      if (data.photo !== undefined) payload.photo = data.photo;
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
      {/* Profile Header & Avatar Spotlight */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Preview */}
          <div className="relative group shrink-0">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl ring-2 ring-emerald-500/30">
              {photoValue ? (
                <AvatarImage
                  src={photoValue}
                  alt={user.name}
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="bg-emerald-600 text-white text-3xl font-extrabold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Quick Upload Hover Overlay */}
            <label className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-xs">
              {isUploadingPhoto ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Camera className="h-6 w-6" />
                  <span className="text-[10px] font-medium mt-1">Change</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={isUploadingPhoto}
                onChange={handleAvatarFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* User Details & Action */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{user.name}</h3>
              <Badge
                variant="outline"
                className="text-xs font-semibold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              >
                {user.role}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm">
                <Upload className="h-4 w-4" />
                {isUploadingPhoto ? "Uploading..." : "Upload New Photo"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingPhoto}
                  onChange={handleAvatarFileUpload}
                  className="hidden"
                />
              </label>

              {photoValue && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-rose-500/30 text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Photo Cloudinary Field Option */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Camera className="h-4 w-4 text-emerald-600" />
            Profile Picture Link / Upload
          </h3>
          <CloudinarySingleImageUploadField
            label="Avatar Image"
            name="photo"
            control={control}
            error={errors.photo?.message}
          />
        </div>

        {/* Account Information */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="mb-5 font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-emerald-600" />
            Account Information
          </h3>
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

        {/* Bio Section */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
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
