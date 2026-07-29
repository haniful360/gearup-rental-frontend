'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { RoleTypes } from '../../sidebarRoutes';

function SidebarHeaderSection({ role: _role }: { role: RoleTypes }) {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarHeader className="mt-6 flex flex-col items-center gap-6 px-4">
      <Link href="/" className="flex items-center justify-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
          <Dumbbell className="h-5 w-5" />
        </div>
        {isExpanded && (
          <h4 className="text-2xl font-bold text-nowrap text-sidebar-foreground">
            Gear<span className="text-emerald-400">Up</span>
          </h4>
        )}
      </Link>
    </SidebarHeader>
  );
}

export default SidebarHeaderSection;
