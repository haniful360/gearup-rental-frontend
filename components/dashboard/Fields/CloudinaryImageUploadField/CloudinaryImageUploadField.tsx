/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Plus, Image as ImageIcon, Cloud } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { uploadToCloudinary } from "@/service/cloudinary/upload";

interface CloudinaryImageUploadFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T, any>;
  error?: any;
  required?: boolean;
}

export default function CloudinaryImageUploadField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  required = false,
}: CloudinaryImageUploadFieldProps<T>) {
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const imagesList: string[] = Array.isArray(value) ? value : [];

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      toast.error("Please enter a valid image URL starting with http:// or https://");
      return;
    }

    if (imagesList.includes(trimmed)) {
      toast.error("This image URL is already added");
      return;
    }

    onChange([...imagesList, trimmed]);
    setUrlInput("");
    toast.success("Image URL added");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadToCloudinary(formData);

        if (result.success && result.url) {
          uploadedUrls.push(result.url);
        } else {
          toast.error(
            result.message || `Failed to upload ${file.name} to Cloudinary`
          );
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...imagesList, ...uploadedUrls]);
        toast.success(
          `${uploadedUrls.length} image${uploadedUrls.length > 1 ? "s" : ""} uploaded to Cloudinary!`
        );
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Upload failed. You can paste Cloudinary image URL directly below.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = imagesList.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <Label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>

      {/* Cloudinary File Upload Dropzone / Button */}
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
                Upload to Cloudinary or add Image URL
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Upload images directly or paste Cloudinary image link below
              </p>
            </div>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm shrink-0">
            <Upload className="h-3.5 w-3.5" />
            {isUploading ? "Uploading..." : "Choose Files"}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={isUploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* URL Input Row */}
        <div className="mt-3 flex items-center gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <Input
            type="url"
            placeholder="Or paste Cloudinary image URL (https://res.cloudinary.com/...)"
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

      {/* Image Thumbnails List */}
      {imagesList.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
          {imagesList.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 overflow-hidden shadow-xs"
            >
              <Image
                src={imgUrl}
                alt={`Gear image ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-700"
                title="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {idx === 0 && (
                <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs text-[10px] text-white px-1.5 py-0.5 rounded-sm">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 text-xs text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800">
          <ImageIcon className="h-4 w-4 text-zinc-400" />
          <span>No images uploaded yet</span>
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
