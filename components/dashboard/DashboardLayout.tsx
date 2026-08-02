'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar/AppSidebar';
import { RoleTypes } from '@/components/dashboard/sidebar/sidebarRoutes';
import { Separator } from '@/components/ui/separator';
import {
  Dumbbell,
  LogOut,
  ChevronDown,
  Settings,
  User,
  ShieldAlert,
  Store,
  LayoutDashboard,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useClickAway } from '@/hooks/use-click-away';
import { logout } from '@/service/auth/logout';
import { Badge } from '@/components/ui/badge';

interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const roleBadges: Record<string, { label: string; className: string }> = {
  CUSTOMER: {
    label: 'Customer',
    className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  PROVIDER: {
    label: 'Provider',
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  ADMIN: {
    label: 'Administrator',
    className: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
};

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
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/');
    router.refresh();
  };

  const roleConfig = roleBadges[role] || {
    label: role,
    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  };

  const settingsUrl = `/dashboard/${role.toLowerCase()}/settings`;

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background/85 backdrop-blur-md dark:bg-[#0B1320]/90 px-4 md:px-6 shadow-xs">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-muted cursor-pointer" />
            <Separator orientation="vertical" className="h-5 bg-border/60" />

            <div className="flex items-center gap-2.5 text-sm font-medium">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <Dumbbell className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight text-foreground hidden sm:inline">
                GearUp
              </span>
              <span className="text-muted-foreground/40 hidden sm:inline">/</span>
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span className="capitalize">{role.toLowerCase()}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* User Dropdown */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-border/60 bg-card/60 p-1.5 pr-3 shadow-xs hover:border-emerald-500/40 hover:bg-card transition-all cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8 ring-2 ring-emerald-500/20">
                    <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                </div>

                <div className="hidden text-left md:block min-w-0">
                  <p className="text-xs font-bold leading-tight truncate text-foreground">
                    {user.name}
                  </p>
                  <p className="text-[10px] leading-tight truncate text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border/80 bg-popover/95 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="flex items-center gap-3 p-2.5">
                    <Avatar className="h-10 w-10 ring-2 ring-emerald-500/30">
                      <AvatarFallback className="bg-emerald-600 text-white text-sm font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <Badge
                        variant="outline"
                        className={`mt-1 text-[10px] font-semibold px-2 py-0 ${roleConfig.className}`}
                      >
                        {roleConfig.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="my-1.5 h-px bg-border/60" />

                  <div className="space-y-0.5">
                    <Link
                      href={settingsUrl}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
                    >
                      <Settings className="h-4 w-4 text-emerald-500" />
                      Account Settings
                    </Link>
                  </div>

                  <div className="my-1.5 h-px bg-border/60" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex flex-1 flex-col bg-slate-50/50 dark:bg-[#0B1320] p-6 md:p-8 text-foreground min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
