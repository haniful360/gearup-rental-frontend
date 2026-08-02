import Image from "next/image";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import Link from "next/link";
import {
  Tag,
  Tent,
  Mountain,
  Bike,
  Waves,
  Snowflake,
  Fish,
  Trees,
  Camera,
  Sun,
  Flame,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const gradients = [
  "from-emerald-500/20 to-emerald-600/10",
  "from-blue-500/20 to-blue-600/10",
  "from-amber-500/20 to-amber-600/10",
  "from-cyan-500/20 to-cyan-600/10",
  "from-rose-500/20 to-rose-600/10",
  "from-orange-500/20 to-orange-600/10",
  "from-purple-500/20 to-purple-600/10",
  "from-pink-500/20 to-pink-600/10",
];

const categoryColors = [
  { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  { bg: "bg-blue-500/10", text: "text-blue-400" },
  { bg: "bg-amber-500/10", text: "text-amber-400" },
  { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  { bg: "bg-rose-500/10", text: "text-rose-400" },
  { bg: "bg-orange-500/10", text: "text-orange-400" },
  { bg: "bg-purple-500/10", text: "text-purple-400" },
  { bg: "bg-pink-500/10", text: "text-pink-400" },
];

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

const iconMap: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["camp", "tent"], icon: Tent },
  { keywords: ["hik", "trek", "backpack", "mountain"], icon: Mountain },
  { keywords: ["cycl", "bike", "mtb"], icon: Bike },
  { keywords: ["water", "kayak", "canoe", "surf", "boat", "raft"], icon: Waves },
  { keywords: ["winter", "snow", "ski", "ice"], icon: Snowflake },
  { keywords: ["climb", "rock"], icon: Mountain },
  { keywords: ["fish"], icon: Fish },
  { keywords: ["forest", "tree", "jungle"], icon: Trees },
  { keywords: ["photo", "camera"], icon: Camera },
  { keywords: ["beach", "sun", "summer"], icon: Sun },
  { keywords: ["campfire", "fire"], icon: Flame },
];

function getCategoryIcon(name: string): LucideIcon {
  const key = name.toLowerCase();
  const match = iconMap.find((entry) =>
    entry.keywords.some((keyword) => key.includes(keyword)),
  );
  return match?.icon ?? Tag;
}

export function PopularCategories({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="scroll-mt-20 bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-3">
            <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Popular Categories</h2>
            <p className="text-muted-foreground">Find gear tailored for your next adventure</p>
          </div>
          <DynamicActionButton
            label="View all"
            href="/gear"
            variant="outline"
            showIcon
            className="hidden text-emerald-600 dark:text-emerald-400 sm:flex"
          />
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.name);
              return (
                <Link
                  key={cat.id}
                  href={`/gear?category=${encodeURIComponent(cat.name)}`}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-5 hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className={`absolute inset-0 bg-linear-to-b ${gradients[idx % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden ${categoryColors[idx % categoryColors.length].bg}`}>
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <Icon className={`h-5 w-5 ${categoryColors[idx % categoryColors.length].text}`} />
                      )}
                    </div>
                    <h3 className="font-semibold mt-3 text-sm">{cat.name}</h3>
                    {cat.description && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{cat.description}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
            No categories available yet. Check back soon.
          </div>
        )}
      </div>
    </section>
  );
}
