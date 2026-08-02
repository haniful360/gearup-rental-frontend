'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { Dumbbell, ShieldCheck, UserCheck, Store } from 'lucide-react';
import Link from 'next/link';
import { RoleTypes } from '../../sidebarRoutes';

const roleIcons: Record<RoleTypes, typeof ShieldCheck> = {
  CUSTOMER: UserCheck,
  PROVIDER: Store,
  ADMIN: ShieldCheck,
};

const roleBadgeColors: Record<RoleTypes, string> = {
  CUSTOMER: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
  PROVIDER: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  ADMIN: 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20',
};

function SidebarHeaderSection({ role }: { role: RoleTypes }) {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';
  const RoleIcon = roleIcons[role] || UserCheck;

  return (
    <SidebarHeader className="border-b border-sidebar-border/60 p-3">
      <Link
        href="/"
        className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-sidebar-accent/50 transition-colors"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-500/25 shrink-0 transition-transform duration-300 hover:scale-105">
          <Dumbbell className="h-5 w-5" />
        </div>
        {isExpanded && (
          <div className="flex flex-col min-w-0">
            <h4 className="text-lg font-bold text-sidebar-foreground tracking-tight leading-none">
              Gear<span className="text-emerald-500 dark:text-emerald-400">Up</span>
            </h4>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${roleBadgeColors[role]}`}
              >
                <RoleIcon className="h-3 w-3" />
                {role} Panel
              </span>
            </div>
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
