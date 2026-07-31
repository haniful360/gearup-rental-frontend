import Link from "next/link";
import {
  Search,
  CalendarCheck,
  Handshake,
  Zap,
  Store,
  ShieldCheck,
  CreditCard,
  MapPin,
  BadgeCheck,
  MessageSquare,
  Heart,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    desc: "Explore a curated collection of kayaks, tents, bikes and more from verified local providers. Filter by category, price and location.",
  },
  {
    icon: CalendarCheck,
    title: "Book in Seconds",
    desc: "Pick your rental dates, choose your gear and secure your booking instantly with safe, flexible payment options.",
  },
  {
    icon: Handshake,
    title: "Pick Up & Enjoy",
    desc: "Meet your provider, grab your gear and hit the trail. Return it when you're done — it's that simple.",
  },
  {
    icon: Zap,
    title: "Review & Repeat",
    desc: "Rate your experience, earn trust on the platform and book your next adventure with one click.",
  },
];

const renterBenefits = [
  { icon: CreditCard, title: "Pay Only When You Rent", desc: "No buying expensive equipment. Rent exactly what you need, when you need it." },
  { icon: MapPin, title: "Local Providers", desc: "Pickup locations near you, so gear is always within reach." },
  { icon: ShieldCheck, title: "Protected Booking", desc: "Every rental is covered with secure payments and verified providers." },
  { icon: Heart, title: "Try Before You Buy", desc: "Test premium gear on your adventures before committing to a purchase." },
];

const providerBenefits = [
  { icon: Store, title: "Earn From Idle Gear", desc: "Turn the equipment sitting in your garage into a steady income stream." },
  { icon: BadgeCheck, title: "Set Your Own Price", desc: "You decide rental rates, availability windows and pickup terms." },
  { icon: MessageSquare, title: "Manage Everything", desc: "Track bookings, messages and earnings from a simple dashboard." },
  { icon: UserPlus, title: "Build Your Brand", desc: "Grow your rating and get more bookings as a trusted local provider." },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-20 md:py-28 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <Zap className="h-3.5 w-3.5" /> Simple Process
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              How{" "}
              <span className="bg-linear-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                GearUp
              </span>{" "}
              Works
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Renting and listing gear has never been easier. Follow a few
              simple steps and get back to what matters — your next adventure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-base h-12 px-8" asChild>
                <Link href="/gear">
                  Explore Gear <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-base h-12 px-8" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center space-y-3 mb-16">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
            The Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Four Steps to Adventure</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From finding the perfect gear to leaving a review, here&apos;s everything.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-7 left-[12%] right-[12%] hidden lg:block h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="group relative flex flex-col items-center text-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-colors">
                  <Icon className="h-7 w-7 text-emerald-500 group-hover:text-white transition-colors" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border bg-card p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <Search className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">For Renters</h2>
                  <p className="text-sm text-muted-foreground">Get gear without the price tag</p>
                </div>
              </div>
              <div className="mt-8 space-y-6">
                {renterBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                        <Icon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{benefit.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                <Link href="/gear">Start Exploring <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="rounded-3xl border bg-card p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Store className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">For Providers</h2>
                  <p className="text-sm text-muted-foreground">Turn idle gear into income</p>
                </div>
              </div>
              <div className="mt-8 space-y-6">
                {providerBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{benefit.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                <Link href="/register">List Your Gear <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
