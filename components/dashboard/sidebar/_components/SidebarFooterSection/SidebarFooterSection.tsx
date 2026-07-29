'use client';

import { SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { RoleTypes } from '../../sidebarRoutes';

export default function SidebarFooterSection({ role }: { role: RoleTypes }) {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  const allowedClients: RoleTypes[] = ['CUSTOMER', 'PROVIDER'];
  const shouldShowUpgrade = allowedClients.includes(role);

  return (
    <SidebarFooter className={cn('transition-all duration-300', isExpanded ? 'p-4' : 'p-2')}>
      <SidebarMenu>
        <SidebarMenuItem>
          {shouldShowUpgrade && (
            <div>
              {isExpanded ? (
                <div className="flex flex-col items-center rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 py-5 text-center">
                  <div className="relative mb-3.5 animate-bounce">
                    <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md" />
                    <Crown
                      className="relative h-10 w-10 text-[#FBBF24]"
                      fill="#FBBF24"
                      fillOpacity={0.2}
                    />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-sidebar-foreground">Upgrade to Pro</h2>
                    <p className="text-sm leading-tight text-sidebar-foreground/70">
                      Unlock all premium features and components.
                    </p>
                  </div>

                  <Link
                    href={'/plan'}
                    className="group mt-5 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-linear-to-r from-[#3B82F6] to-[#8B5CF6] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
                  >
                    Upgrade Now
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <button className="group relative flex h-10 w-10 animate-bounce cursor-pointer items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 transition-all">
                    <Crown className="h-5 w-5 text-[#FBBF24]" fill="#FBBF24" fillOpacity={0.2} />
                    <div className="invisible absolute left-12 z-50 rounded-md border border-border bg-background px-2 py-1 text-[10px] whitespace-nowrap text-foreground group-hover:visible">
                      Upgrade to Premium
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
