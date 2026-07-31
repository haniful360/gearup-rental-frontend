import { Control, FieldErrors } from "react-hook-form";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import TextAreaField from "@/components/dashboard/Fields/TextAreaField/TextAreaField";
import SelectField from "@/components/dashboard/Fields/SelectField/SelectField";

export interface GearFormData {
  title: string;
  description: string;
  pricePerDay: number;
  location: string;
  brand: string;
  stock: number;
  categoryId: string;
}

interface GearItemFormProps {
  control: Control<GearFormData>;
  errors: FieldErrors<GearFormData>;
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
          error={errors.categoryId?.message}
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
    </div>
  );
}
