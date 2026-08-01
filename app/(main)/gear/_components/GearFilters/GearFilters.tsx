"use client";

import { useEffect, useRef } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import SelectField from "@/components/dashboard/Fields/SelectField/SelectField";

export interface GearFiltersState {
  search: string;
  brand: string;
  location: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: "" | "price-asc" | "price-desc";
}

export const EMPTY_FILTERS: GearFiltersState = {
  search: "",
  brand: "",
  location: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
};

interface GearFiltersProps {
  categories: { id: string; name: string }[];
  brands: string[];
  locations: string[];
  filters: GearFiltersState;
  onChange: (filters: GearFiltersState) => void;
}

export default function GearFilters({
  categories,
  brands,
  locations,
  filters,
  onChange,
}: GearFiltersProps) {
  const { control, reset } = useForm<GearFiltersState>({
    defaultValues: filters,
  });

  const formValues = useWatch({ control }) as GearFiltersState;

  const previous = useRef<GearFiltersState>(filters);
  useEffect(() => {
    if (JSON.stringify(formValues) !== JSON.stringify(previous.current)) {
      previous.current = formValues;
      onChange(formValues);
    }
  }, [formValues, onChange]);

  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const hasFilters = Object.values(formValues).some((value) => value !== "");

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));
  const brandOptions = brands.map((brand) => ({ value: brand, label: brand }));
  const locationOptions = locations.map((location) => ({
    value: location,
    label: location,
  }));
  const sortOptions: { value: GearFiltersState["sort"]; label: string }[] = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div className="mb-8 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
          <h2 className="text-sm font-semibold">Filters &amp; Sort</h2>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => reset(EMPTY_FILTERS)}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-rose-600 transition-colors hover:text-rose-700 dark:text-rose-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <InputField
          label="Search"
          name="search"
          control={control}
          type="search"
          placeholder="Search gear..."
          className="pl-9"
          leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
        />

        <SelectField
          label="Sort by"
          name="sort"
          control={control}
          options={sortOptions}
          placeholder="Default"
        />

        <SelectField
          label="Category"
          name="category"
          control={control}
          options={categoryOptions}
          placeholder="All Categories"
        />

        <SelectField
          label="Brand"
          name="brand"
          control={control}
          options={brandOptions}
          placeholder="All Brands"
        />

        <SelectField
          label="Location"
          name="location"
          control={control}
          options={locationOptions}
          placeholder="All Locations"
        />

        <div className="flex items-end gap-2">
          <InputField
            label="Min $"
            name="minPrice"
            control={control}
            type="number"
            placeholder="Min $"
          />
          <span className="pb-3 text-muted-foreground">-</span>
          <InputField
            label="Max $"
            name="maxPrice"
            control={control}
            type="number"
            placeholder="Max $"
          />
        </div>
      </div>
    </div>
  );
}
