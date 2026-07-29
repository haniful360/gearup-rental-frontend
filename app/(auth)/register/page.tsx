'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, UserCheck, Store, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Hero Visual Banner */}
      <div className="hidden lg:flex relative bg-zinc-900 text-white p-12 flex-col justify-between overflow-hidden order-last lg:order-first">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1200')] bg-cover bg-center opacity-35" />
        <div className="relative z-10 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-semibold tracking-wider text-emerald-300 uppercase">
            Join The Community
          </span>
        </div>
        <div className="relative z-10 max-w-md space-y-4">
          <blockquote className="text-2xl font-semibold leading-snug">
            &ldquo;List your gear to start earning passive revenue, or rent
            equipment in seconds.&rdquo;
          </blockquote>
          <p className="text-sm text-zinc-300">
            Over 5,000+ rental items ready for adventure.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-between p-8 lg:p-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-emerald-600"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span>GearUp</span>
          </Link>
          <span className="text-xs text-muted-foreground">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose your platform role to get started.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Role Selection Selector */}
            <div className="space-y-2">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col items-center justify-between rounded-xl border-2 border-emerald-600 bg-emerald-50/30 p-4 hover:bg-emerald-50 cursor-pointer text-center">
                  <input
                    type="radio"
                    name="role"
                    value="CUSTOMER"
                    defaultChecked
                    className="sr-only"
                  />
                  <UserCheck className="h-6 w-6 text-emerald-600 mb-1" />
                  <span className="text-xs font-semibold text-zinc-900">
                    Rent Gear
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Customer Role
                  </span>
                </label>

                <label className="flex flex-col items-center justify-between rounded-xl border-2 border-zinc-200 p-4 hover:border-emerald-600 cursor-pointer text-center">
                  <input
                    type="radio"
                    name="role"
                    value="PROVIDER"
                    className="sr-only"
                  />
                  <Store className="h-6 w-6 text-zinc-600 mb-1" />
                  <span className="text-xs font-semibold text-zinc-900">
                    List My Gear
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Provider Role
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Alex Morgan"
                required
                className="focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email address</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="alex@example.com"
                required
                className="focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                required
                className="focus-visible:ring-emerald-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Protected by GearUp verification protocols.
        </p>
      </div>
    </div>
  );
}
