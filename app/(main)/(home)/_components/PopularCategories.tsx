import Image from "next/image";
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
  ArrowUpRight,
  Sparkles,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

const CATEGORY_COVER_IMAGES: Record<string, string> = {
  camping: "photo-1504280390367-361c6d9f38f4",
  camp: "photo-1478131143081-80f7f84ca84d",
  tent: "photo-1510312305653-8ed496efae75",
  hiking: "photo-1551632811-561732d1e306",
  trekking: "photo-1464822759023-fed622ff2c3b",
  backpack: "photo-1544816155-12df9643f363",
  cycling: "photo-1505705694340-019e1e3359a0",
  bike: "photo-1485965120184-e220f721d03e",
  water: "photo-1551504734-5ee1c4a1479b",
  kayak: "photo-1544551763-46a013bb70d5",
  surf: "photo-1502680390469-be75c86b636f",
  winter: "photo-1521747116042-5a810fda9664",
  snow: "photo-1486915309851-b0cc1f8a0084",
  ski: "photo-1517048676732-d65bc937f952",
  climbing: "photo-1522163182402-834f871fd851",
  rock: "photo-1564769625905-50e93615e769",
  photo: "photo-1516035069371-29a1b244cc32",
  camera: "photo-1516035069371-29a1b244cc32",
  fish: "photo-1544551763-46a013bb70d5",
};

const FALLBACK_COVERS = [
  "photo-1504280390367-361c6d9f38f4",
  "photo-1551632811-561732d1e306",
  "photo-1505705694340-019e1e3359a0",
  "photo-1551504734-5ee1c4a1479b",
  "photo-1521747116042-5a810fda9664",
  "photo-1522163182402-834f871fd851",
];

function getCategoryCover(name: string, catImage?: string, index: number = 0): string {
  if (catImage) return catImage;
  const key = name.toLowerCase();
  const match = Object.keys(CATEGORY_COVER_IMAGES).find((k) => key.includes(k));
  const id = match
    ? CATEGORY_COVER_IMAGES[match]
    : FALLBACK_COVERS[index % FALLBACK_COVERS.length];
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
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
    <section id="categories" className="scroll-mt-20 relative bg-background py-20 md:py-28 overflow-hidden">
      {/* Background Lighting Accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Explore Collections
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Popular Categories
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Discover top equipment tailored for camping, trekking, cycling, water sports, and winter expeditions.
            </p>
          </div>

          <DynamicActionButton
            label="View All Equipment"
            href="/gear"
            variant="outline"
            showIcon
            className="hidden text-emerald-600 dark:text-emerald-400 sm:flex self-start md:self-auto"
          />
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.name);
              const coverImage = getCategoryCover(cat.name, cat.image, idx);

              return (
                <Link
                  key={cat.id}
                  href={`/gear?category=${encodeURIComponent(cat.name)}`}
                  className="group relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-zinc-900 p-6 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40"
                >
                  {/* Background Image with Zoom effect */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={coverImage}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                  </div>

                  {/* Top Bar: Icon Badge & Arrow */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:border-emerald-500">
                      <Icon className="h-5.5 w-5.5" />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:scale-110">
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10 space-y-1 text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md backdrop-blur-md border border-emerald-500/30">
                        Collection
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-300 line-clamp-1">
                      {cat.description || "Top rated equipment ready for instant rental."}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">
            <Layers className="mx-auto h-8 w-8 text-muted-foreground/60 mb-3" />
            <p className="font-semibold text-foreground">No categories available</p>
            <p className="text-xs mt-1">Check back soon as providers add new gear categories.</p>
          </div>
        )}
      </div>
    </section>
  );
}
