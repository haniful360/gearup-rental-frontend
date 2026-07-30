'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar/AppSidebar';
import { RoleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import { Separator } from '@/components/ui/separator';
import { Dumbbell, LogOut, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useClickAway } from '@/hooks/use-click-away';
import { logout } from '@/service/auth/logout';

interface DashboardUser {
  id: string
  name: string
  email: string
  role: string
}

export default function DashboardLayout({
  children,
  role,
  user,
}: {
  children: React.ReactNode;
  role: RoleTypes;
  user: DashboardUser;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickAway(menuRef, () => setMenuOpen(false));

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border dark:border-white/5 bg-background dark:bg-[#0F1A2C] px-4">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Dumbbell className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-foreground">GearUp</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="capitalize text-foreground font-medium">{role.toLowerCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-muted cursor-pointer"
              >
                <Avatar className="h-8 w-8 ring-2 ring-emerald-500/20">
                  <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs font-semibold dark:bg-emerald-900 dark:text-emerald-200">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium leading-tight text-foreground">{user.name}</p>
                  <p className="text-xs leading-tight text-muted-foreground">{user.email}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-popover p-1 shadow-lg z-50">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="my-1 h-px bg-border" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-muted/30 dark:bg-[#0F1A2C] p-6 text-foreground">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
