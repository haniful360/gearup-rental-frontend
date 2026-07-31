import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { getGearImage } from "@/lib/gear-images";
import { Badge } from "@/components/ui/badge";
import type { GearItem } from "../../page";

interface GearCardProps {
  gear: GearItem;
  index: number;
}

export default function GearCard({ gear, index }: GearCardProps) {
  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={getGearImage(gear.categoryName, index)}
          alt={gear.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {gear.categoryName && (
          <Badge className="absolute left-3 top-3 bg-black/50 text-white backdrop-blur-sm border-white/20">
            {gear.categoryName}
          </Badge>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/90">
          <MapPin className="h-3.5 w-3.5" />
          {gear.location || "Location TBD"}
        </div>

        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-semibold leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {gear.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {gear.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            ${gear.pricePerDay.toFixed(2)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              /day
            </span>
          </p>
          <span className="text-xs font-medium text-muted-foreground">
            {gear.brand}
          </span>
        </div>
      </div>
    </Link>
  );
}
