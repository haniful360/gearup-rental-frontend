'use client';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <SidebarContent className={`${state === 'expanded' ? 'px-4' : 'ps-4'} no-scrollbar pt-5`}>
      <SidebarMenu className="gap-2.5">
        {menuItems.map((item) => {
          const isActive = pathname === item?.url;
          const Icon = item?.icon;

          return (
            <SidebarMenuItem key={item?.title}>
              <SidebarMenuButton
                isActive={isActive}
                tooltip={state === 'collapsed' ? item?.title : undefined}
                className="gap-3.5 px-5 py-6 font-medium transition-all duration-200"
                render={<Link href={item?.url} />}
              >
                <span
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={`flex items-center gap-3.5 font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-sidebar-primary! bg-sidebar-accent!'
                      : 'text-sidebar-foreground! hover:text-sidebar-primary! hover:bg-sidebar-accent/40!'
                  }`}
                >
                  {Icon && <Icon />}
                  <span className={`${state === 'collapsed' ? 'hidden' : 'block'}`}>
                    {item?.title}
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarContent>
  );
}

export default SidebarContentSection;
