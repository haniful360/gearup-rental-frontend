import { Control, Controller, FieldErrors } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import TextAreaField from "@/components/dashboard/Fields/TextAreaField/TextAreaField";
import SelectField from "@/components/dashboard/Fields/SelectField/SelectField";
import CloudinaryImageUploadField from "@/components/dashboard/Fields/CloudinaryImageUploadField/CloudinaryImageUploadField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const gearItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  pricePerDay: z.coerce
    .number()
    .min(0.01, "Price per day must be greater than 0"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  brand: z.string().min(1, "Brand is required"),
  stock: z.coerce
    .number()
    .min(1, "Stock must be at least 1"),
  isFeature: z.boolean().optional(),
  images: z.array(z.string()).optional(),
  categoryId: z.string().min(1, "Please select a category"),
});

export type GearFormData = z.infer<typeof gearItemSchema>;

interface GearItemFormProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  errors: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  categories: { id: string; name: string }[];
}

export function GearItemForm({ control, errors, categories }: GearItemFormProps) {
  return (
    <div className="flex flex-col gap-5 py-4">
      <InputField
        label="Title"
        name="title"
        control={control}
        placeholder="e.g. Osprey Talon 33 Hiking Backpack"
        required
        error={errors.title}
      />

      <TextAreaField
        label="Description"
        name="description"
        control={control}
        placeholder="Describe the gear, condition, what's included..."
        required
        error={errors.description}
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Price Per Day ($)"
          name="pricePerDay"
          control={control}
          type="number"
          placeholder="18.00"
          required
          error={errors.pricePerDay}
        />

        <InputField
          label="Stock"
          name="stock"
          control={control}
          type="number"
          placeholder="6"
          required
          error={errors.stock}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Brand"
          name="brand"
          control={control}
          placeholder="e.g. Osprey, North Face"
          required
          error={errors.brand}
        />

        <SelectField
          label="Category"
          name="categoryId"
          control={control}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          placeholder="Select a category"
          required
          error={typeof errors.categoryId?.message === 'string' ? errors.categoryId.message : undefined}
        />
      </div>

      <InputField
        label="Location"
        name="location"
        control={control}
        placeholder="e.g. Chattogram, Bangladesh"
        required
        error={errors.location}
      />

      <CloudinaryImageUploadField
        label="Gear Images (Cloudinary)"
        name="images"
        control={control}
        error={errors.images}
      />

      <div className="flex items-center space-x-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0F172A] p-3.5">
        <Controller
          name="isFeature"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isFeature"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <div className="grid gap-1 leading-none">
          <Label
            htmlFor="isFeature"
            className="text-xs font-bold text-slate-900 dark:text-slate-100 cursor-pointer"
          >
            Feature this Gear Item
          </Label>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Featured items are highlighted on the home page and top of search results.
          </p>
        </div>
      </div>
    </div>
  );
}
