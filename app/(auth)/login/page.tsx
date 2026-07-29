'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dumbbell, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Form Section */}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to manage your gear rentals or dashboard.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@example.com"
                required
                className="focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-xs text-emerald-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="focus-visible:ring-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-xs text-muted-foreground font-normal"
              >
                Remember this device for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Sign in to GearUp <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Trusted Access
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to GearUp&apos;s Terms of Service and Privacy
          Policy.
        </p>
      </div>

      {/* Right Hero Visual Banner */}
      <div className="hidden lg:flex relative bg-zinc-900 text-white p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-semibold tracking-wider text-emerald-300 uppercase">
            Verified Rental Platform
          </span>
        </div>
        <div className="relative z-10 max-w-md space-y-4">
          <blockquote className="text-2xl font-semibold leading-snug">
            &ldquo;GearUp made renting top-tier kayak equipment effortless for
            our mountain trip.&rdquo;
          </blockquote>
          <p className="text-sm text-zinc-300">
            — Sarah Jenkins, Outdoor Enthusiast
          </p>
        </div>
      </div>
    </div>
  );
}
