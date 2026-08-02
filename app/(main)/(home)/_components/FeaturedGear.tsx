import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import GearCard from "@/app/(main)/gear/_components/GearCard/GearCard";
import type { GearItem } from "@/app/(main)/gear/page";

interface FeaturedGearProps {
  gears?: GearItem[];
}

export function FeaturedGear({ gears = [] }: FeaturedGearProps) {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
            <TrendingUp className="inline h-3.5 w-3.5 mr-1.5" /> Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Gear
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Top-rated & featured outdoor equipment ready for instant rental from verified local providers.
          </p>
        </div>

        <Link
          href="/gear"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors group self-start md:self-auto"
        >
          View all equipment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {gears.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gears.map((item, index) => (
            <GearCard key={item.id} gear={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          <p>No featured gear currently available.</p>
        </div>
      )}
    </section>
  );
}
