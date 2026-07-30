'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { RoleTypes } from '../../sidebarRoutes';

const roleColors: Record<RoleTypes, string> = {
  CUSTOMER: 'text-blue-400',
  PROVIDER: 'text-emerald-400',
  ADMIN: 'text-purple-400',
};

const roleBadgeColors: Record<RoleTypes, string> = {
  CUSTOMER: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
  PROVIDER: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  ADMIN: 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20',
};

function SidebarHeaderSection({ role }: { role: RoleTypes }) {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarHeader className="border-b border-sidebar-border pb-4">
      <Link href="/" className="flex items-center gap-3 px-4 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/20 shrink-0">
          <Dumbbell className="h-5 w-5" />
        </div>
        {isExpanded && (
          <div className="flex flex-col">
            <h4 className="text-lg font-bold text-sidebar-foreground leading-tight tracking-tight">
              Gear<span className="text-emerald-400">Up</span>
            </h4>
            <span className={`mt-0.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${roleBadgeColors[role]}`}>
              {role.toLowerCase()} Panel
            </span>
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
