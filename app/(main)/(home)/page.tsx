// app/(main)/(home)/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-10 container mx-auto px-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-zinc-900 text-white p-8 md:p-16 overflow-hidden">
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Zap className="h-3.5 w-3.5" /> Instant Equipment Rentals
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Rent Sports & Outdoor Gear Instantly
          </h1>
          <p className="text-zinc-400 text-lg">
            Explore premium kayaks, camping tents, mountain bikes, and winter
            gear from verified local providers.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              asChild
            >
              <Link href="/gear">
                Browse All Gear <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              asChild
            >
              <Link href="/auth/register">List Your Gear</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Preview Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Popular Categories
            </h2>
            <p className="text-sm text-muted-foreground">
              Find gear tailored for your next adventure
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/gear" className="gap-1 text-emerald-600">
              View all <Compass className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Camping & Hiking",
            "Water Sports",
            "Bikes & Cycling",
            "Winter Sports",
          ].map((cat, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border bg-card p-6 hover:border-emerald-500 transition-all cursor-pointer shadow-sm"
            >
              <h3 className="font-semibold text-lg">{cat}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                120+ Items available
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
