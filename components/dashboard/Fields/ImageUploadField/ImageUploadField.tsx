/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client';
import { Label } from '@/components/ui/label';
// import { useUploadFilesMutation } from '@/redux/features/fileUpload/fileUpload.api';
import { ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import React, { useId, useMemo } from 'react';
// import { toast } from 'sonner';

interface ImageUploadFieldProps {
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  value?: any;
  onChange: (fileUrl: string | null) => void;
  error?: string;
  required?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  subLabel = 'PNG, JPG up to 10MB',
  icon,
  value,
  onChange,
  error,
  required = false,
}) => {
  const uniqueInputId = useId();
  const [uploadFiles, { isLoading: isUploading }] = [(async () => {}) as any, { isLoading: false }];

  const previewUrl = useMemo(() => {
    if (!value) return null;
    return value;
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    // এপিআই ডকুমেন্টেশন অনুযায়ী 'files' কি (Key) ব্যবহার করা হয়েছে
    formData.append('files', file);

    try {
      const res = await uploadFiles(formData).unwrap();

      // সার্ভার রেসপন্স যেহেতু অ্যারে [ { url: "..." } ], তাই প্রথম ইনডেক্স থেকে ইউআরএল নেওয়া হয়েছে
      const uploadedUrl = res?.[0]?.url || res?.data?.[0]?.url;

      if (uploadedUrl) {
        onChange(uploadedUrl);
        console.log(`${label} uploaded successfully!`);
      } else {
        console.error('Failed to get uploaded file URL from server response.');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
    } finally {
      e.target.value = '';
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label className="block text-xs font-medium text-[#9CA3AF]">
        {label} {required && <span className="text-error">*</span>}
      </Label>

      <div className="relative">
        {!previewUrl ? (
          <div
            className={`hover:border-primary/30 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-[#0E182B] p-10 transition-all duration-500 ${
              error ? 'border-error' : 'border-primary/10'
            }`}
            onClick={() => !isUploading && document.getElementById(uniqueInputId)?.click()}
          >
            <div className="bg-primary/10 rounded-full p-3 shadow-sm">
              {isUploading ? (
                <Loader2 className="text-primary h-5 w-5 animate-spin" />
              ) : (
                icon || <ImageIcon className="text-primary h-5 w-5" />
              )}
            </div>

            <p className="mt-4 text-sm font-medium text-[#B4B4B8]">
              {isUploading ? 'Uploading file, please wait...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-secondary mt-1 text-xs">{subLabel}</p>

            <input
              id={uniqueInputId}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              disabled={isUploading}
            />
          </div>
        ) : (
          <div className="group border-primary/10 relative h-52 w-full overflow-hidden rounded-xl border bg-[#0E182B]">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />

            <button
              type="button"
              onClick={handleRemove}
              className="bg-error absolute top-3 right-3 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white shadow-xl transition-all hover:bg-red-600 active:scale-90"
              title="Remove image"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="bg-primary/20 absolute right-0 bottom-0 left-0 overflow-hidden p-2 text-center text-xs text-ellipsis whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
              Current Image
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-error text-xs font-medium italic">{error}</p>}
    </div>
  );
};

export default ImageUploadField;
