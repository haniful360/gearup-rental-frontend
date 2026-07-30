'use client';

// import { Sidebar } from '@/components/ui/sidebar';
import * as React from 'react';
import SidebarContentSection from './_components/SidebarContentSection/SidebarContentSection';
import SidebarFooterSection from './_components/SidebarFooterSection/SidebarFooterSection';
import SidebarHeaderSection from './_components/SidebarHeader/SidebarHeader';
import { RoleTypes } from './sidebarRoutes';
import { Sidebar } from '@/components/ui/sidebar';

export function AppSidebar({
  role = 'ADMIN',
  ...props
}: { role: RoleTypes } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/50 shadow-2xl shadow-black/10" {...props}>
      <SidebarHeaderSection role={role} />
      <SidebarContentSection role={role} />
      <SidebarFooterSection />
    </Sidebar>
  );
}
