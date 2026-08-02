"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";

interface GearDetailsGallerySliderProps {
  images: string[];
  title: string;
  categoryName?: string;
}

export default function GearDetailsGallerySlider({
  images,
  title,
  categoryName,
}: GearDetailsGallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Slider Container */}
      <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === activeIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Category Badge */}
          {categoryName && (
            <Badge className="absolute left-4 top-4 z-20 bg-black/60 text-white backdrop-blur-md border-white/20 px-3 py-1 text-xs">
              {categoryName}
            </Badge>
          )}

          {/* Fullscreen Zoom Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            type="button"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/80 hover:scale-110 cursor-pointer"
            aria-label="Expand image"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Next / Prev Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 opacity-90 transition-all hover:opacity-100 hover:scale-110 hover:bg-black/80 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextImage}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 opacity-90 transition-all hover:opacity-100 hover:scale-110 hover:bg-black/80 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Counter Badge */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 z-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              type="button"
              className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                idx === activeIndex
                  ? "border-emerald-600 ring-2 ring-emerald-600/30 scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Zoom Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-4xl border-none bg-black/95 p-0 text-white backdrop-blur-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{title} Full Image</DialogTitle>
            <DialogDescription>Full view gallery of {title}</DialogDescription>
          </DialogHeader>
          <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden">
            <Image
              src={images[activeIndex]}
              alt={title}
              fill
              className="object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
