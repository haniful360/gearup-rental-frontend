import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, ShieldCheck, Truck, Clock, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-zinc-800/80">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                Verified Gear & Safety
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                All equipment inspected by verified providers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                Flexible Rental Dates
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Rent by the day or week with instant booking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                Easy Pickup & Return
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Simple handoff process with local shops
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-500"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Dumbbell className="h-4 w-4" />
              </div>
              <span className="text-white">
                Gear<span className="text-emerald-500">Up</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Rent premium sports and outdoor gear instantly from trusted local
              providers. Skip buying expensive equipment—just gear up and go.
            </p>
            {/* Newsletter Subscription */}
            <div className="space-y-2 pt-2 max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                Get Gear Recommendations
              </span>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Column 1: Categories */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider">
              Gear Categories
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/gear?category=camping"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Camping & Hiking
                </Link>
              </li>
              <li>
                <Link
                  href="/gear?category=water"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Water Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/gear?category=cycling"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Bikes & Cycling
                </Link>
              </li>
              <li>
                <Link
                  href="/gear?category=winter"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Winter Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/gear?category=climbing"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Climbing Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Roles & Portals */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider">
              Portals
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/dashboard/customer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/provider"
                  className="hover:text-emerald-400 transition-colors"
                >
                  List Your Gear (Provider)
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin Console
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider">
              Support & Legal
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/help"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/rental-policy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Rental Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} GearUp Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for outdoor enthusiasts with{" "}
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
