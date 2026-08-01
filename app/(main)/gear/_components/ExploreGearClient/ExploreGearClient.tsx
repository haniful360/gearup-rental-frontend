"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, PackageOpen, ChevronLeft, ChevronRight } from "lucide-react";
import GearCard from "../GearCard/GearCard";
import GearFilters, { EMPTY_FILTERS, type GearFiltersState } from "../GearFilters/GearFilters";
import type { GearItem } from "../../page";

const PAGE_SIZE = 8;

interface ExploreGearClientProps {
  gears: GearItem[];
  categories: { id: string; name: string }[];
  initialCategory?: string;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, "...", total];
  }
  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function resolveCategorySeed(
  value: string | undefined,
  categories: { id: string; name: string }[],
): string {
  if (!value) return "";
  const found = categories.find(
    (category) =>
      category.id === value ||
      category.name.toLowerCase() === value.toLowerCase(),
  );
  return found ? found.name : value;
}

export default function ExploreGearClient({
  gears,
  categories,
  initialCategory,
}: ExploreGearClientProps) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<GearFiltersState>(() => ({
    ...EMPTY_FILTERS,
    search: searchParams.get("search") ?? "",
    category: resolveCategorySeed(
      searchParams.get("category") ?? initialCategory,
      categories,
    ),
  }));

  const brands = useMemo(
    () =>
      [...new Set(gears.map((gear) => gear.brand).filter((brand) => !!brand))].sort(),
    [gears],
  );
  const locations = useMemo(
    () =>
      [...new Set(gears.map((gear) => gear.location).filter((location) => !!location))].sort(),
    [gears],
  );

  const handleFiltersChange = (next: GearFiltersState) => {
    setFilters(next);
    setPage(1);
  };

  const filteredGears = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    const minPrice =
      filters.minPrice === "" ? -Infinity : Number(filters.minPrice);
    const maxPrice =
      filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);

    let result = gears.filter((gear) => {
      const categoryName = (gear.categoryName ?? "").toLowerCase();
      const matchesSearch =
        !query ||
        [gear.title, gear.brand, gear.location, gear.categoryName].some((value) =>
          value?.toLowerCase().includes(query),
        );
      const matchesCategory =
        !filters.category ||
        (gear.categoryId ?? "") === filters.category ||
        categoryName.includes(filters.category.toLowerCase());
      const matchesBrand =
        !filters.brand || (gear.brand ?? "").toLowerCase() === filters.brand.toLowerCase();
      const matchesLocation =
        !filters.location ||
        (gear.location ?? "").toLowerCase().includes(filters.location.toLowerCase());
      const matchesPrice =
        gear.pricePerDay >= minPrice && gear.pricePerDay <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesLocation &&
        matchesPrice
      );
    });

    if (filters.sort === "price-asc") {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sort === "price-desc") {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  }, [gears, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredGears.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start =
    filteredGears.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, filteredGears.length);
  const pagedGears = filteredGears.slice(start - 1, end);

  const goToPage = (target: number) => {
    if (target < 1 || target > totalPages) return;
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 flex flex-col items-start gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Browse the collection
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Explore Gear
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Handpicked sports and outdoor equipment ready to rent from verified
            local providers.
          </p>
        </div>
      </div>

      <GearFilters
        categories={categories}
        brands={brands}
        locations={locations}
        filters={filters}
        onChange={handleFiltersChange}
      />

      <div className="mb-6 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {filteredGears.length}
        </span>{" "}
        {filteredGears.length === 1 ? "item" : "items"} found
      </div>

      {filteredGears.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pagedGears.map((gear, index) => (
              <GearCard key={gear.id} gear={gear} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-4 border-t pt-8">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">{start}</span>–{end}{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {filteredGears.length}
                </span>{" "}
                {filteredGears.length === 1 ? "item" : "items"}
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="flex h-9 items-center gap-1 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-emerald-600 hover:text-emerald-600 disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                {getPageNumbers(currentPage, totalPages).map((item, idx) =>
                  item === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-1.5 text-sm text-muted-foreground"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => goToPage(item)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                        item === currentPage
                          ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                          : "border border-border bg-card text-muted-foreground hover:border-emerald-600 hover:text-emerald-600"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="flex h-9 items-center gap-1 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-emerald-600 hover:text-emerald-600 disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <PackageOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold">No gear found</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Try adjusting your search or filters to discover more gear.
          </p>
        </div>
      )}
    </div>
  );
}
