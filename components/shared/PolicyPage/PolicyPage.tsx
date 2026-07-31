import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PolicyPageProps {
  badge: string;
  icon: LucideIcon;
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
}

export function PolicyPage({
  badge,
  icon: Icon,
  title,
  description,
  updatedAt,
  children,
}: PolicyPageProps) {
  return (
    <div>
      <section className="relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mt-8 max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <Icon className="h-3.5 w-3.5" />
              {badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              {title}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
              {description}
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <FileText className="h-3.5 w-3.5" />
              Last updated: {updatedAt}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl space-y-6">{children}</div>
      </section>
    </div>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
      <h2 className="text-lg md:text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
