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

function SidebarHeaderSection({ role }: { role: RoleTypes }) {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarHeader className="border-b border-sidebar-border/50 pb-4">
      <Link href="/" className="flex items-center gap-3 px-4 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shrink-0">
          <Dumbbell className="h-5 w-5" />
        </div>
        {isExpanded && (
          <div className="flex flex-col">
            <h4 className="text-lg font-bold text-sidebar-foreground leading-tight">
              Gear<span className="text-emerald-400">Up</span>
            </h4>
            <span className={`text-[10px] font-medium tracking-wider uppercase ${roleColors[role]}`}>
              {role.toLowerCase()} Panel
            </span>
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
