import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Compass, Zap, ShieldCheck, Star, Users, Package, Search, Handshake, TrendingUp, Tag } from "lucide-react";
import { getAllCategories } from "@/service/category/getAll";

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

const steps = [
  { icon: Search, title: "Browse Gear", desc: "Explore thousands of premium outdoor equipment from trusted providers near you." },
  { icon: Handshake, title: "Book & Pay", desc: "Securely reserve your gear with instant confirmation and flexible rental periods." },
  { icon: Zap, title: "Pick Up & Enjoy", desc: "Collect your gear, enjoy your adventure, and return with ease." },
];

const stats = [
  { icon: Package, value: "5,000+", label: "Gear Items" },
  { icon: Users, value: "2,500+", label: "Happy Users" },
  { icon: Star, value: "4.8/5", label: "Avg. Rating" },
  { icon: ShieldCheck, value: "100%", label: "Secure Payments" },
];

const testimonials = [
  { name: "Sarah Jenkins", role: "Outdoor Enthusiast", text: "GearUp made renting top-tier kayak equipment effortless for our mountain trip. The pickup was seamless!", rating: 5 },
  { name: "Marcus Rivera", role: "Adventure Photographer", text: "I've been using GearUp for all my camping needs. The gear quality is exceptional and prices are fair.", rating: 5 },
  { name: "Emily Chen", role: "Weekend Cyclist", text: "Found a premium mountain bike at half the retail price. The provider was super helpful with fitting adjustments.", rating: 4 },
];

const gearItems = [
  { name: "Premium Kayak Pro", price: 45, period: "day", image: "🚣" },
  { name: "4-Season Camping Tent", price: 30, period: "day", image: "⛺" },
  { name: "Mountain Bike XTR", price: 55, period: "day", image: "🚵" },
  { name: "Snowboard Set Elite", price: 40, period: "day", image: "🏂" },
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

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const categoriesResult = await getAllCategories();
  const categories = categoriesResult?.data || [];

  return (
    <div className="flex flex-col">
      {/* ──────── HERO ──────── */}
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

      {/* ──────── STATS BANNER ──────── */}
      <section className="relative -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border bg-card overflow-hidden shadow-lg">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center justify-center bg-background p-6 md:p-8">
                  <Icon className="h-6 w-6 text-emerald-500 mb-2" />
                  <p className="text-2xl md:text-3xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center space-y-3 mb-14">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Three easy steps to get your gear and start your adventure.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
                <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">{i + 1}</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 mb-5">
                  <Icon className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────── POPULAR CATEGORIES ──────── */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
                Categories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Popular Categories</h2>
              <p className="text-muted-foreground">Find gear tailored for your next adventure</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex gap-1 text-emerald-600" asChild>
              <Link href="/gear">
                View all <Compass className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat: { _id: string; name: string; description?: string }, idx: number) => (
              <Link
                key={cat._id}
                href={`/gear?category=${cat._id}`}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-md"
              >
                <div className={`absolute inset-0 bg-linear-to-b ${gradients[idx % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${categoryColors[idx % categoryColors.length].bg}`}>
                    <Tag className={`h-5 w-5 ${categoryColors[idx % categoryColors.length].text}`} />
                  </div>
                  <h3 className="font-semibold mt-3 text-sm">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{cat.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FEATURED GEAR ──────── */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center space-y-3 mb-14">
          <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
            <TrendingUp className="inline h-3 w-3 mr-1" /> Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Gear</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Top-rated equipment available for rent right now.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gearItems.map((item) => (
            <div key={item.name} className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-6xl group-hover:scale-110 transition-transform duration-500">
                {item.image}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ${item.price}<span className="text-xs font-normal text-muted-foreground">/{item.period}</span>
                  </p>
                  <Button size="sm" variant="outline" className="h-8 text-xs">Rent Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── TESTIMONIALS ──────── */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 mb-14">
            <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-500 border border-purple-500/20">
              <Star className="inline h-3 w-3 mr-1" /> Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Trusted by thousands of adventurers and gear providers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <StarRating count={t.rating} />
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ──────── */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.1),transparent_70%)]" />
          <div className="relative max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Renting?
            </h2>
            <p className="text-zinc-400">
              Join thousands of users who are already renting and listing gear on GearUp.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-base h-12 px-8" asChild>
                <Link href="/register">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-base h-12 px-8" asChild>
                <Link href="/gear">Explore Gear</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
