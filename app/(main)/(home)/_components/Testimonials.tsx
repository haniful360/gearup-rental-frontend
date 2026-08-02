"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Sparkles,
  ThumbsUp,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rented: string;
  rating: number;
  text: string;
  verified: boolean;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Outdoor & Kayak Adventurer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rented: "Premium Kayak & Camping Gear",
    rating: 5,
    text: "GearUp transformed how we plan our weekend trips! Renting top-tier kayak equipment was smooth, fast, and cost a fraction of buying new. The gear condition was 10/10!",
    verified: true,
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    role: "Adventure Photographer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rented: "Camera Stabilization Rig & Lenses",
    rating: 5,
    text: "As a freelance outdoor photographer, buying specialized gear is too expensive. GearUp matched me with local pros. Punctual pickup, immaculate gear, and total peace of mind!",
    verified: true,
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Trekking Expedition Lead",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rented: "4-Season High Altitude Tents",
    rating: 5,
    text: "Finding reliable winter camping gear used to take days. Through GearUp, I verified equipment safety checks and picked it up nearby. Phenomenal community and platform!",
    verified: true,
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Gear Owner & Verified Provider",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rented: "Earned $1,800+ Renting Bikes",
    rating: 5,
    text: "I turned my idle sports gear into passive income. The insurance protection and verified renter profiles give me complete confidence every time I hand over my bikes.",
    verified: true,
    date: "1 month ago",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count
              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
              : "text-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, nextTestimonial]);

  const activeItem = TESTIMONIALS[activeIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/40 to-background py-20 md:py-28">
      {/* Background Lights & Glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Verified Adventurer Feedback
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Real stories from outdoor enthusiasts, photographers, and gear owners who rent and list equipment on GearUp.
          </p>
        </div>

        {/* Featured Spotlight Card */}
        <div
          className="mx-auto max-w-4xl mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/30">
            {/* Quote Icon */}
            <div className="absolute right-8 top-8 opacity-10 text-emerald-500 pointer-events-none">
              <Quote className="h-24 w-24" />
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              {/* Rating & Rented Tag */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <StarRating count={activeItem.rating} />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    5.0 Rated
                  </span>
                </div>

                <Badge variant="outline" className="border-border/60 bg-muted/50 text-xs font-medium">
                  {activeItem.rented}
                </Badge>
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-foreground/90 italic">
                &ldquo;{activeItem.text}&rdquo;
              </blockquote>

              {/* User Profile Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-border/60">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-emerald-500/40 shadow-md">
                    <Image
                      src={activeItem.avatar}
                      alt={activeItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-base">{activeItem.name}</h4>
                      {activeItem.verified && (
                        <BadgeCheck className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{activeItem.role}</p>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators / Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? "border-emerald-500 bg-emerald-500/5 shadow-md ring-1 ring-emerald-500/20 scale-102"
                  : "border-border/50 bg-card/50 hover:bg-card hover:border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-xs truncate">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-16 border-t border-border/60 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Average Renter Rating</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
              <Users className="h-5 w-5 text-emerald-500" />
              <span>10,000+</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Active Adventurers</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
              <ThumbsUp className="h-5 w-5 text-emerald-500" />
              <span>99%</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Recommendation Rate</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>100%</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Verified Gear Providers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
