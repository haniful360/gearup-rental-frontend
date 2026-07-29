"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export function Navbar() {
  const isLoggedIn = true;
  const userRole: "CUSTOMER" | "PROVIDER" | "ADMIN" = "CUSTOMER";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-600"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span>
            Gear<span className="text-zinc-900 dark:text-white">Up</span>
          </span>
        </Link>

        {/* Search Bar - Center Desktop */}
        <div className="hidden md:flex relative max-w-md w-full mx-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search kayaks, tents, bikes, climbing gear..."
            className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 focus-visible:ring-emerald-500 rounded-full"
          />
        </div>

        {/* Navigation Links - Desktop */}
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

        {/* Right Actions / Auth Area */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Notification Trigger */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-600" />
              </Button>

              {/* Quick Dashboard Action */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:inline-flex border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
              >
                <Link href={`/dashboard/${userRole.toLowerCase()}`}>
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full ring-2 ring-emerald-500/20"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                        alt="User Avatar"
                      />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800">
                        GU
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Alex Morgan
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        alex@gearup.com
                      </p>
                      <div className="mt-1.5">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 text-[10px]"
                        >
                          {userRole}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      href={`/dashboard/${userRole.toLowerCase()}`}
                      className="flex w-full items-center px-2 py-1.5"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {userRole === "CUSTOMER" && (
                    <DropdownMenuItem className="cursor-pointer p-0">
                      <Link
                        href="/dashboard/customer"
                        className="flex w-full items-center px-2 py-1.5"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        My Rentals
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link
                      href="/profile"
                      className="flex w-full items-center px-2 py-1.5"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                asChild
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Drawer Navigation */}
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
                    className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Explore Gear
                  </Link>
                  <Link
                    href="/categories"
                    className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    How it Works
                  </Link>
                  {isLoggedIn && (
                    <Link
                      href={`/dashboard/${userRole.toLowerCase()}`}
                      className="p-2 rounded-md bg-emerald-50 text-emerald-700 font-semibold"
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
