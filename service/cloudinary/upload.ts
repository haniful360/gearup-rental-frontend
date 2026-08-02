/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import crypto from "crypto";

export async function uploadToCloudinary(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, message: "No file provided" };
    }

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "v5fwcz1u";
    const apiKey = process.env.CLOUDINARY_API_KEY || "848522933974241";
    const apiSecret =
      process.env.CLOUDINARY_API_SECRET || "MEyGRzj9PsLYGbPTnaKVWfgh47I";

    const timestamp = Math.floor(Date.now() / 1000);
    const signatureStr = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureStr)
      .digest("hex");

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("api_key", apiKey);
    uploadFormData.append("timestamp", timestamp.toString());
    uploadFormData.append("signature", signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      return { success: true, url: data.secure_url };
    } else if (data.url) {
      return { success: true, url: data.url };
    } else {
      return {
        success: false,
        message: data?.error?.message || "Failed to upload to Cloudinary",
      };
    }
  } catch (error: any) {
    console.error("Cloudinary upload server action error:", error);
    return {
      success: false,
      message: error?.message || "Cloudinary upload failed",
    };
  }
}
