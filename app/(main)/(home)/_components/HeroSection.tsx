import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { Zap } from "lucide-react";

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
            <DynamicActionButton
              label="Browse All Gear"
              href="/gear"
              showIcon
              className="h-12 px-8 text-base"
            />
            <DynamicActionButton
              label="List Your Gear"
              href="/register"
              variant="outline"
              className="h-12 border-zinc-700 px-8 text-base text-zinc-300 hover:bg-zinc-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
