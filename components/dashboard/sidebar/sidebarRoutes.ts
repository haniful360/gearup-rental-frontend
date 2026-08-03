import {
  LayoutGrid,
  ShoppingBag,
  Star,
  Package,
  ClipboardList,
  Users,
  ShieldCheck,
  CreditCard,
  Settings,
  FolderTree,
} from "lucide-react";

export type RoleTypes = "CUSTOMER" | "PROVIDER" | "ADMIN";

// Customer Dashboard Routes
export const customerRoutes = [
  {
    title: "Overview",
    url: "/dashboard/customer",
    icon: LayoutGrid,
  },
  {
    title: "My Orders",
    url: "/dashboard/customer/orders",
    icon: ShoppingBag,
  },
  {
    title: "Payments",
    url: "/dashboard/customer/payments",
    icon: CreditCard,
  },
  // {
  //   title: "Explore Gear",
  //   url: "/dashboard/customer/gears",
  //   icon: Compass,
  // },
  {
    title: "Reviews",
    url: "/dashboard/customer/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    url: "/dashboard/customer/settings",
    icon: Settings,
  },
];

// Provider Dashboard Routes
export const providerRoutes = [
  {
    title: "Overview",
    url: "/dashboard/provider",
    icon: LayoutGrid,
  },
  {
    title: "My Inventory",
    url: "/dashboard/provider/gear",
    icon: Package,
  },
  // {
  //   title: "Add New Gear",
  //   url: "/dashboard/provider/gear/new",
  //   icon: PlusCircle,
  // },
  {
    title: "Incoming Orders",
    url: "/dashboard/provider/orders",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    url: "/dashboard/provider/settings",
    icon: Settings,
  },
];

// Admin Dashboard Routes
export const adminRoutes = [
  {
    title: "Overview",
    url: "/dashboard/admin",
    icon: LayoutGrid,
  },
  {
    title: "User Management",
    url: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Categories",
    url: "/dashboard/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Gear Moderation",
    url: "/dashboard/admin/gear-moderation",
    icon: ShieldCheck,
  },
  {
    title: "All Rentals",
    url: "/dashboard/admin/rentals",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];

// Helper Function to Dynamically Get Navigation by Role
export const getSidebarRoutesByRole = (role: RoleTypes) => {
  switch (role) {
    case "ADMIN":
      return adminRoutes;
    case "PROVIDER":
      return providerRoutes;
    case "CUSTOMER":
    default:
      return customerRoutes;
  }
};
