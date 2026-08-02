"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Tag,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GearItem } from "../../page";

interface ExploreGearHeroSliderProps {
  gears: GearItem[];
}

export default function ExploreGearHeroSlider({
  gears,
}: ExploreGearHeroSliderProps) {
  const slides = gears.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered || slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide, slides.length]);

  if (slides.length === 0) return null;

  const currentGear = slides[currentIndex];
  const activeImage =
    currentGear.images && currentGear.images.length > 0
      ? currentGear.images[0]
      : "/placeholder.jpg";

  return (
    <div
      className="relative mb-12 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0 opacity-20 transition-all duration-1000 scale-105">
        <Image
          src={activeImage}
          alt={currentGear.title}
          fill
          priority
          className="object-cover blur-2xl"
        />
      </div>

      {/* Decorative Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 grid gap-8 p-6 sm:p-8 md:p-12 lg:grid-cols-12 lg:items-center">
        {/* Text Info (Left) */}
        <div className="flex flex-col justify-center space-y-5 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
              Spotlight Gear
            </Badge>

            {currentGear.categoryName && (
              <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 backdrop-blur-md">
                {currentGear.categoryName}
              </Badge>
            )}

            {currentGear.isFeature && (
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
                Featured
              </Badge>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {currentGear.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 line-clamp-2 max-w-xl leading-relaxed">
            {currentGear.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-zinc-400">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <MapPin className="h-4 w-4 text-emerald-400" />
              {currentGear.location || "Location TBD"}
            </span>

            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Tag className="h-4 w-4 text-emerald-400" />
              {currentGear.brand || "Verified Brand"}
            </span>

            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Inspected & Safe
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div>
              <span className="text-xs text-zinc-400 block">Daily Rate</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                ${currentGear.pricePerDay.toFixed(2)}
                <span className="text-xs font-normal text-zinc-400 ml-1">/day</span>
              </span>
            </div>

            <Link
              href={`/gear/${currentGear.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
            >
              Rent Gear Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Image Showcase (Right) */}
        <div className="relative lg:col-span-5 flex items-center justify-center">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/80 shadow-2xl backdrop-blur-sm">
            <Image
              src={activeImage}
              alt={currentGear.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Thumbnail Counter */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                Item {currentIndex + 1} of {slides.length}
              </span>

              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 bg-emerald-400 shadow-md shadow-emerald-400/50"
                        : "w-2 bg-white/40 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-black/80 hover:scale-110 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-black/80 hover:scale-110 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
