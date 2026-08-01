"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

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

const selectClassName =
  "h-10 w-full cursor-pointer rounded-lg border bg-zinc-50 px-3 text-sm text-zinc-900 transition-all focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:outline-none dark:bg-zinc-900/60 dark:text-zinc-100 dark:border-zinc-800";

export default function GearFilters({
  categories,
  brands,
  locations,
  filters,
  onChange,
}: GearFiltersProps) {
  const set = (patch: Partial<GearFiltersState>) =>
    onChange({ ...filters, ...patch });

  const hasFilters = Object.values(filters).some((value) => value !== "");

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
            onClick={() => onChange(EMPTY_FILTERS)}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-rose-600 transition-colors hover:text-rose-700 dark:text-rose-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="Search gear..."
            className="h-10 rounded-lg bg-zinc-50 pl-9 text-sm focus-visible:ring-emerald-500 dark:bg-zinc-900/60"
          />
        </div>

        <select
          value={filters.sort}
          onChange={(e) => set({ sort: e.target.value as GearFiltersState["sort"] })}
          className={selectClassName}
          aria-label="Sort by price"
        >
          <option value="">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => set({ category: e.target.value })}
          className={selectClassName}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={filters.brand}
          onChange={(e) => set({ brand: e.target.value })}
          className={selectClassName}
          aria-label="Filter by brand"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={filters.location}
          onChange={(e) => set({ location: e.target.value })}
          className={selectClassName}
          aria-label="Filter by location"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })}
            placeholder="Min $"
            aria-label="Minimum price"
            className="h-10 rounded-lg bg-zinc-50 text-sm focus-visible:ring-emerald-500 dark:bg-zinc-900/60"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })}
            placeholder="Max $"
            aria-label="Maximum price"
            className="h-10 rounded-lg bg-zinc-50 text-sm focus-visible:ring-emerald-500 dark:bg-zinc-900/60"
          />
        </div>
      </div>
    </div>
  );
}
