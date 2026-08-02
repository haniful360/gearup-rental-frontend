/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Plus, Cloud } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/service/cloudinary/upload";

interface CloudinarySingleImageUploadFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T, any>;
  error?: any;
  required?: boolean;
}

export default function CloudinarySingleImageUploadField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  required = false,
}: CloudinarySingleImageUploadFieldProps<T>) {
  const {
    field: { value = "", onChange },
  } = useController({ name, control });

  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const imageUrl: string = typeof value === "string" ? value : "";

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      toast.error("Please enter a valid image URL starting with http:// or https://");
      return;
    }

    onChange(trimmed);
    setUrlInput("");
    toast.success("Image URL set");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadToCloudinary(formData);

      if (result.success && result.url) {
        onChange(result.url);
        toast.success("Image uploaded to Cloudinary!");
      } else {
        toast.error(result.message || "Failed to upload image to Cloudinary");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Upload failed. You can paste Cloudinary image URL directly.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      <Label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>

      {imageUrl ? (
        <div className="group relative h-40 w-full sm:w-64 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-xs">
          <Image
            src={imageUrl}
            alt="Category image"
            fill
            sizes="256px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-90 sm:opacity-100 transition-opacity shadow-md hover:bg-rose-700"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 p-4 transition-all hover:border-emerald-500/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                {isUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Cloud className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  Upload Image to Cloudinary
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Upload image directly or paste Cloudinary link below
                </p>
              </div>
            </div>

            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm shrink-0">
              <Upload className="h-3.5 w-3.5" />
              {isUploading ? "Uploading..." : "Choose File"}
              <input
                type="file"
                accept="image/*"
                disabled={isUploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <Input
              type="url"
              placeholder="Or paste image URL (https://res.cloudinary.com/...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
              className="h-9 text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddUrl}
              className="h-9 px-3 text-xs shrink-0"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-rose-500 text-xs font-medium tracking-tight">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </div>
  );
}
