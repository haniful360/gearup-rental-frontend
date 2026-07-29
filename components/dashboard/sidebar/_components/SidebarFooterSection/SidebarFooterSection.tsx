'use client';

import { SidebarFooter, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function SidebarFooterSection() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <SidebarFooter className={cn(
      'border-t border-sidebar-border/50 transition-all duration-300',
      isExpanded ? 'p-4' : 'p-3'
    )}>
      {isExpanded ? (
        <p className="text-center text-[10px] text-sidebar-foreground/30">
          &copy; 2026 GearUp. All rights reserved.
        </p>
      ) : (
        <p className="text-center text-[8px] text-sidebar-foreground/30">&copy;</p>
      )}
    </SidebarFooter>
  );
}
