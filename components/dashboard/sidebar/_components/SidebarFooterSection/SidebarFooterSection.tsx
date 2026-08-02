'use client';

import { SidebarFooter, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Home, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SidebarFooterSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarFooter
      className={cn(
        'border-t border-sidebar-border/60 transition-all duration-300',
        isExpanded ? 'p-4' : 'p-3'
      )}
    >
      {isExpanded ? (
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 px-3.5 py-2 text-xs font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all group"
          >
            <div className="flex items-center gap-2">
              <Home className="h-3.5 w-3.5 text-emerald-500" />
              <span>Back to Storefront</span>
            </div>
            <ExternalLink className="h-3 w-3 text-sidebar-foreground/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <p className="text-center text-[10px] text-sidebar-foreground/30 tracking-wider">
            &copy; 2026 GearUp Rental System
          </p>
        </div>
      ) : (
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-emerald-600 hover:text-white transition-colors mx-auto"
          title="Back to Storefront"
        >
          <Home className="h-4 w-4" />
        </Link>
      )}
    </SidebarFooter>
  );
}
