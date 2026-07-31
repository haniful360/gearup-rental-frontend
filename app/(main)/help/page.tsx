import Link from "next/link";
import {
  LifeBuoy,
  Search,
  Compass,
  UserCircle2,
  CalendarDays,
  Store,
  ShieldCheck,
  Mail,
  MessageSquare,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import { HelpCenter } from "./_components/HelpCenter/HelpCenter";

const categories = [
  {
    title: "Getting Started",
    description: "Create an account, verify your profile, and explore how GearUp works.",
    icon: Compass,
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Account & Billing",
    description: "Manage your profile, payment methods, invoices, and subscription settings.",
    icon: UserCircle2,
    accent: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Bookings & Rentals",
    description: "Understand the booking flow, cancellations, refunds, and extensions.",
    icon: CalendarDays,
    accent: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "For Providers",
    description: "List your gear, manage inventory, and get paid on time.",
    icon: Store,
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Safety & Insurance",
    description: "How we protect renters, providers, and the gear you rent.",
    icon: ShieldCheck,
    accent: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
];

const contactOptions = [
  {
    title: "Email Support",
    description: "support@gearup.com — replies within 24 hours",
    icon: Mail,
    href: "mailto:support@gearup.com",
  },
  {
    title: "Live Chat",
    description: "Chat with our team 9 AM – 9 PM, 7 days a week",
    icon: MessageSquare,
    href: "#",
  },
  {
    title: "Call Us",
    description: "+1 (800) 123-4567 — toll-free",
    icon: Phone,
    href: "tel:+18001234567",
  },
];

export default function HelpPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <LifeBuoy className="h-3.5 w-3.5" />
            Help Center
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            How can we <span className="text-emerald-400">help</span> you today?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Search our knowledge base, browse popular topics, or reach out to a
            friendly human.
          </p>
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Try 'How do I cancel a booking?'"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border ${category.accent}`}
              >
                <category.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold tracking-tight">{category.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>
              <Link
                href="#faq"
                className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
              >
                Explore articles
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div id="faq" className="mt-20 scroll-mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              FAQ
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Quick answers to the questions we hear the most.
            </p>
          </div>
          <div className="mt-10">
            <HelpCenter />
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 border border-violet-500/20">
              Contact
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
              Still need help?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our support team is here for you every step of the way.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 md:grid-cols-3 gap-5">
            {contactOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <option.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">{option.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
