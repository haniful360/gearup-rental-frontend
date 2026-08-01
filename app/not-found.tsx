import Link from "next/link";
import { Compass, SearchX } from "lucide-react";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.08),transparent_50%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-lg shadow-emerald-500/10">
          <SearchX className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h1 className="mt-8 text-7xl md:text-9xl font-extrabold leading-none tracking-tight">
          <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
          Looks like you got lost
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on the trail.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <DynamicActionButton
            label="Back to Home"
            href="/"
            variant="default"
          />
          <DynamicActionButton
            label="Explore Gear"
            href="/gear"
            variant="outline"
          />
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground">
          <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Need help?{" "}
          <Link
            href="/contact"
            className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
