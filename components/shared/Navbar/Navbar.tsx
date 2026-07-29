"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Dumbbell,
  Compass,
  ShoppingBag,
  Bell,
  User,
  LayoutDashboard,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useClickAway } from "@/hooks/use-click-away";

export function Navbar() {
  const isLoggedIn = true;
  const userRole: "CUSTOMER" | "PROVIDER" | "ADMIN" = "CUSTOMER";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickAway(menuRef, () => setMenuOpen(false));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-600"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span>
            Gear<span className="text-foreground">Up</span>
          </span>
        </Link>

        <div className="hidden md:flex relative max-w-md w-full mx-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search kayaks, tents, bikes, climbing gear..."
            className="pl-9 bg-muted border-border focus-visible:ring-emerald-500 rounded-full"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/gear"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-emerald-600 transition-colors"
          >
            <Compass className="h-4 w-4" />
            Explore Gear
          </Link>
          <Link
            href="/categories"
            className="text-muted-foreground hover:text-emerald-600 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/how-it-works"
            className="text-muted-foreground hover:text-emerald-600 transition-colors"
          >
            How it Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-600" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:inline-flex border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
              >
                <Link href={`/dashboard/${userRole.toLowerCase()}`}>
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative h-9 w-9 rounded-full ring-2 ring-emerald-500/20 hover:ring-emerald-500/40 transition-all cursor-pointer"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      alt="User Avatar"
                    />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      GU
                    </AvatarFallback>
                  </Avatar>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-popover p-1 shadow-lg z-50">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium leading-none">Alex Morgan</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        alex@gearup.com
                      </p>
                      <div className="mt-1.5">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 text-[10px] dark:bg-emerald-900 dark:text-emerald-200"
                        >
                          {userRole}
                        </Badge>
                      </div>
                    </div>
                    <div className="my-1 h-px bg-border" />
                    <Link
                      href={`/dashboard/${userRole.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    {userRole === "CUSTOMER" && (
                      <Link
                        href="/dashboard/customer"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        My Rentals
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    <div className="my-1 h-px bg-border" />
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2 font-bold text-emerald-600">
                  <Dumbbell className="h-5 w-5" /> GearUp
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search gear..." className="pl-9" />
                </div>
                <nav className="flex flex-col gap-2 font-medium">
                  <Link
                    href="/gear"
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    Explore Gear
                  </Link>
                  <Link
                    href="/categories"
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    How it Works
                  </Link>
                  {isLoggedIn && (
                    <Link
                      href={`/dashboard/${userRole.toLowerCase()}`}
                      className="p-2 rounded-md bg-emerald-50 text-emerald-700 font-semibold dark:bg-emerald-950 dark:text-emerald-400"
                    >
                      My Dashboard
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
