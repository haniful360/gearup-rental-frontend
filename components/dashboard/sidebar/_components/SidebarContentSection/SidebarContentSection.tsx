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

const groupLabels: Record<RoleTypes, string> = {
  CUSTOMER: 'Main Menu',
  PROVIDER: 'Management',
  ADMIN: 'Administration',
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
    <SidebarContent className="px-3 pt-4 no-scrollbar">
      <SidebarGroup>
        {state === 'expanded' && (
          <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
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
                  tooltip={state === 'collapsed' ? item?.title : undefined}
                  className="gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
                  render={<Link href={item?.url} />}
                >
                  <span
                    onClick={() => isMobile && setOpenMobile(false)}
                    className={`flex items-center gap-3 w-full transition-all duration-200 ${
                      isActive
                        ? 'text-sidebar-primary!'
                        : 'text-sidebar-foreground/70! hover:text-sidebar-foreground!'
                    }`}
                  >
                    <span className={`flex items-center justify-center ${isActive ? 'scale-110' : ''}`}>
                      {Icon && <Icon className={`h-4 w-4 ${isActive ? 'text-sidebar-primary' : ''}`} />}
                    </span>
                    <span className={`${state === 'collapsed' ? 'hidden' : 'block'}`}>
                      {item?.title}
                    </span>
                    {isActive && state === 'expanded' && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
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
