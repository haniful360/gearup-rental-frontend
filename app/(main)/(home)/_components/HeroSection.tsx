import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Zap className="h-3.5 w-3.5" /> Instant Equipment Rentals
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Rent Sports &{" "}
            <span className="bg-linear-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Outdoor Gear
            </span>{" "}
            Instantly
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Explore premium kayaks, camping tents, mountain bikes, and winter gear from verified local providers. No buying, just renting.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-base h-12 px-8" asChild>
              <Link href="/gear">
                Browse All Gear <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-base h-12 px-8" asChild>
              <Link href="/register">List Your Gear</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
