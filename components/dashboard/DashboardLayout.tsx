'use client';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar/AppSidebar';
import { RoleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import { Separator } from '@/components/ui/separator';
import { Dumbbell } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: RoleTypes;
}) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Dumbbell className="h-4 w-4 text-emerald-500" />
              <span className="font-medium">GearUp</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="capitalize text-foreground">{role.toLowerCase()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background p-6 text-foreground">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
