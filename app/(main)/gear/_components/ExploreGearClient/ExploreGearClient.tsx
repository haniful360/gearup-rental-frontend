"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import GearCard from "../GearCard/GearCard";
import type { GearItem } from "../../page";

interface ExploreGearClientProps {
  gears: GearItem[];
  categories: { id: string; name: string }[];
  initialCategory?: string;
}

export default function ExploreGearClient({
  gears,
  categories,
  initialCategory,
}: ExploreGearClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = searchParams.get("category") ?? initialCategory ?? "all";

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.replace(query ? `/gear?${query}` : "/gear", { scroll: false });
  };

  const filteredGears = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return gears.filter((gear) => {
      const categoryName = (gear.categoryName ?? "").toLowerCase();
      const matchesCategory =
        activeCategory === "all" ||
        (gear.categoryId ?? "").toLowerCase() === activeCategory.toLowerCase() ||
        categoryName.includes(activeCategory.toLowerCase());
      const matchesSearch =
        !query ||
        [gear.title, gear.brand, gear.location, gear.categoryName].some((value) =>
          value?.toLowerCase().includes(query),
        );
      return matchesCategory && matchesSearch;
    });
  }, [gears, activeCategory, searchQuery]);

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

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, or location..."
            className="h-11 pl-10 rounded-full bg-muted border-border focus-visible:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            activeCategory === "all"
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-border bg-card text-muted-foreground hover:border-emerald-600 hover:text-emerald-600"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCategory(category.name)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeCategory.toLowerCase() === category.name.toLowerCase()
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-border bg-card text-muted-foreground hover:border-emerald-600 hover:text-emerald-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mb-6 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{filteredGears.length}</span>{" "}
        {filteredGears.length === 1 ? "item" : "items"}
      </div>

      {filteredGears.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGears.map((gear, index) => (
            <GearCard key={gear.id} gear={gear} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <PackageOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold">No gear found</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Try a different search term or category to discover more gear.
          </p>
        </div>
      )}
    </div>
  );
}
