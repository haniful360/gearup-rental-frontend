"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getGearImagesList } from "@/lib/gear-images";
import { Badge } from "@/components/ui/badge";
import type { GearItem } from "../../page";

interface GearCardProps {
  gear: GearItem;
  index: number;
}

export default function GearCard({ gear, index }: GearCardProps) {
  const images =
    gear.images && gear.images.length > 0
      ? gear.images
      : getGearImagesList(gear.categoryName, undefined, index);

  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx(idx);
  };

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === activeIdx
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={img}
              alt={`${gear.title} image ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
          {gear.categoryName && (
            <Badge className="bg-black/60 text-white backdrop-blur-md border-white/20 text-xs">
              {gear.categoryName}
            </Badge>
          )}
          {gear.isFeature && (
            <Badge className="bg-amber-500 text-white font-medium shadow-sm border-none text-xs flex items-center gap-1">
              <Star className="h-3 w-3 fill-white text-white" />
              Featured
            </Badge>
          )}
        </div>

        {/* Multi-image Navigation Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Dots & Counter */}
        {images.length > 1 ? (
          <div className="absolute bottom-3 left-3 right-12 z-20 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => handleDotClick(e, i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIdx
                      ? "w-5 bg-white shadow-sm"
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
              {activeIdx + 1}/{images.length}
            </span>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 text-xs text-white/90">
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            {gear.location || "Location TBD"}
          </div>
        )}

        {/* Arrow Action */}
        <div className="absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-semibold leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {gear.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {gear.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-3">
          <div>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ${gear.pricePerDay.toFixed(2)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                /day
              </span>
            </p>
          </div>
          <div className="text-right flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3 w-3 text-emerald-600" />
            {gear.location || gear.brand || "Verified"}
          </div>
        </div>
      </div>
    </Link>
  );
}
