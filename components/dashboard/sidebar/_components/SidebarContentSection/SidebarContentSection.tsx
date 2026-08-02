'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RoleTypes,
  customerRoutes,
  providerRoutes,
  adminRoutes,
} from '../../sidebarRoutes';
import { ChevronRight } from 'lucide-react';

const groupLabels: Record<RoleTypes, string> = {
  CUSTOMER: 'Customer Workspace',
  PROVIDER: 'Provider Portal',
  ADMIN: 'System Administration',
};

function SidebarContentSection({ role }: { role: RoleTypes }) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile, state } = useSidebar();

  const roleBaseRoutes: Record<RoleTypes, typeof customerRoutes> = {
    CUSTOMER: customerRoutes,
    PROVIDER: providerRoutes,
    ADMIN: adminRoutes,
  };

  const menuItems = roleBaseRoutes[role] || [];

  return (
    <SidebarContent className="px-3 pt-3 no-scrollbar">
      <SidebarGroup className="p-0">
        {state === 'expanded' && (
          <SidebarGroupLabel className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-sidebar-foreground/50">
            {groupLabels[role]}
          </SidebarGroupLabel>
        )}
        <SidebarMenu className="mt-1 gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item?.url;
            const Icon = item?.icon;

            return (
              <SidebarMenuItem key={item?.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  size="lg"
                  tooltip={state === 'collapsed' ? item?.title : undefined}
                  className={`group/btn relative flex h-11 w-full items-center justify-start gap-3 rounded-xl px-3 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15! text-emerald-500! dark:text-emerald-400! border border-emerald-500/30 shadow-xs'
                      : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground border border-transparent'
                  }`}
                  render={<Link href={item?.url} />}
                >
                  <span
                    onClick={() => isMobile && setOpenMobile(false)}
                    className="flex items-center gap-3 w-full"
                  >
                    <span
                      className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                          : 'bg-sidebar-accent/70 text-sidebar-foreground/60 group-hover/btn:bg-sidebar-accent group-hover/btn:text-sidebar-foreground'
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>

                    <span
                      className={`truncate text-sm font-semibold tracking-tight ${
                        state === 'collapsed' ? 'hidden' : 'block'
                      }`}
                    >
                      {item?.title}
                    </span>

                    {isActive && state === 'expanded' && (
                      <ChevronRight className="ml-auto h-4 w-4 text-emerald-500 dark:text-emerald-400 opacity-90" />
                    )}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

export default SidebarContentSection;
