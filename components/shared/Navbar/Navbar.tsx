"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import InputField from "@/components/dashboard/Fields/InputField/InputField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getGearImage } from "@/lib/gear-images";
import { toast } from "sonner";
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
import { logout } from "@/service/auth/logout";

interface NavbarUser {
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN" | null;
}

interface NavbarProps {
  user: NavbarUser | null;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface SearchSuggestion {
  id: string;
  title: string;
  categoryName?: string;
  location?: string;
  brand?: string;
  pricePerDay: number;
}

export function Navbar({ user }: NavbarProps) {
  const isLoggedIn = !!user;
  const userRole = user?.role || "CUSTOMER";
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    control: searchControl,
    handleSubmit: handleSearchSubmit,
  } = useForm<{ search: string }>({ defaultValues: { search: "" } });
  const searchValue = useWatch({ control: searchControl, name: "search" }) ?? "";
  const query = searchValue.trim();

  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useClickAway(menuRef, () => setMenuOpen(false));
  useClickAway(searchRef, () => {
    setSuggestionsOpen(false);
    setActiveIndex(-1);
  });

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(
      () => {
        if (!query) {
          setSuggestions([]);
          setSuggestionsOpen(false);
          setSearching(false);
          setActiveIndex(-1);
          return;
        }
        setSuggestionsOpen(true);
        setSearching(true);
        fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
          .then((res) => res.json())
          .then((data) => {
            if (!controller.signal.aborted) {
              setSuggestions(data.suggestions ?? []);
            }
          })
          .catch(() => {
            if (!controller.signal.aborted) setSuggestions([]);
          })
          .finally(() => {
            if (!controller.signal.aborted) setSearching(false);
          });
      },
      query ? 200 : 0,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const goToSuggestion = (suggestion: SearchSuggestion) => {
    setSuggestionsOpen(false);
    setActiveIndex(-1);
    setSheetOpen(false);
    router.push(`/gear/${suggestion.id}`);
  };

  const handleSearch = ({ search }: { search: string }) => {
    const active = suggestions[activeIndex];
    if (suggestionsOpen && activeIndex >= 0 && active) {
      goToSuggestion(active);
      return;
    }
    const trimmed = search.trim();
    setSheetOpen(false);
    router.push(trimmed ? `/gear?search=${encodeURIComponent(trimmed)}` : "/gear");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestionsOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1,
      );
    } else if (e.key === "Escape") {
      setSuggestionsOpen(false);
      setActiveIndex(-1);
    }
  };

  const renderSuggestionList = () =>
    searching ? (
      <p className="px-4 py-3 text-sm text-muted-foreground">Searching...</p>
    ) : suggestions.length > 0 ? (
      <ul className="max-h-80 overflow-y-auto p-1">
        {suggestions.map((gear, i) => (
          <li key={gear.id}>
            <button
              type="button"
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => goToSuggestion(gear)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors cursor-pointer",
                i === activeIndex ? "bg-muted" : "hover:bg-muted",
              )}
            >
              <Image
                src={getGearImage(gear.categoryName, i)}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{gear.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {[gear.brand, gear.location].filter(Boolean).join(" • ")}
                </p>
              </div>
              <span className="shrink-0 text-sm font-bold text-emerald-600">
                ${gear.pricePerDay.toFixed(2)}
                <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                  /day
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="px-4 py-3 text-sm text-muted-foreground">
        No gear matches &quot;{query}&quot;
      </p>
    );

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

        <div
          ref={searchRef}
          className="relative hidden md:flex max-w-xl w-full mx-4"
        >
          <form
            onSubmit={handleSearchSubmit(handleSearch)}
            onKeyDown={handleSearchKeyDown}
            className="relative w-full"
          >
            <InputField
              label="Search gear"
              hideLabel
              name="search"
              control={searchControl}
              type="search"
              placeholder="Search kayaks, tents, bikes, climbing gear..."
              className="pl-9 h-10 bg-muted border-border focus-visible:ring-emerald-500 rounded-full"
              leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            {suggestionsOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
                {renderSuggestionList()}
              </div>
            )}
          </form>
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
             href="/#categories"
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
           <Link
             href="/contact"
             className="text-muted-foreground hover:text-emerald-600 transition-colors"
           >
             Contact
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


              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative h-9 w-9 rounded-full ring-2 ring-emerald-500/20 hover:ring-emerald-500/40 transition-all cursor-pointer"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "")}&background=059669&color=fff`}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      {user?.name ? getInitials(user.name) : "GU"}
                    </AvatarFallback>
                  </Avatar>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-popover p-1 shadow-lg z-50">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        {user?.email}
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
                      onClick={handleLogout}
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
              <DynamicActionButton
                label="Log in"
                href="/login"
                variant="outline"
                className="sm:h-10 px-4 text-sm"
              />
              <DynamicActionButton
                label="Get Started"
                href="/register"
                className="sm:h-10 py-2 px-4 text-sm"
              />
            </div>
          )}

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger className="lg:hidden size-8 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2 font-bold text-emerald-600">
                  <Dumbbell className="h-5 w-5" /> GearUp
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <div className="space-y-2">
                  <form
                    onSubmit={handleSearchSubmit(handleSearch)}
                    onKeyDown={handleSearchKeyDown}
                    className="relative"
                  >
                    <InputField
                      label="Search gear"
                      hideLabel
                      name="search"
                      control={searchControl}
                      type="search"
                      placeholder="Search gear..."
                      className="pl-9 h-12 bg-muted border-border focus-visible:ring-emerald-500 rounded-full"
                      leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                  </form>
                  {suggestionsOpen && (
                    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                      {renderSuggestionList()}
                    </div>
                  )}
                </div>
<nav className="flex flex-col gap-2 font-medium">
                   <Link
                     href="/gear"
                     className="p-2 rounded-md hover:bg-muted transition-colors"
                   >
                     Explore Gear
                   </Link>
                   <Link
                     href="/#categories"
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
                   <Link
                     href="/contact"
                     className="p-2 rounded-md hover:bg-muted transition-colors"
                   >
                     Contact
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
