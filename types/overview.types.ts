export interface IMetricValue {
  value: number;
  growth: number;
}

export interface IOverviewMetricsData {
  mrr: IMetricValue;
  activePaidUsers: IMetricValue;
  conversionRate: IMetricValue;
  openTickets: IMetricValue;
}

export interface IOverviewMetricsResponse {
  statusCode: number;
  data: IOverviewMetricsData;
}

export interface IContentEngagementItem {
  id: string;
  title: string;
  contentType: string;
  count: number;
  actionLabel: string;
}

export interface IContentEngagementResponse {
  statusCode: number;
  data: IContentEngagementItem[];
}

export interface ISubscriptionRetentionItem {
  month: string;
  value: number;
  totalCohort: number;
  retainedCount: number;
}

export interface ISubscriptionRetentionResponse {
  statusCode: number;
  data: ISubscriptionRetentionItem[];
}

// Admin Overview Types
export interface IAdminOverviewData {
  totalUsers?: number;
  totalGear?: number;
  totalRentals?: number;
  totalRevenue?: number;
  activeRentals?: number;
  suspendedUsers?: number;
  pendingGear?: number;
  [key: string]: unknown;
}

export interface IAdminRecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isSuspended?: boolean;
  createdAt?: string;
  avatar?: string;
}

export interface IAdminRecentRental {
  id: string;
  status?: string;
  totalPrice?: number;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  customer?: { id?: string; name?: string; email?: string };
  user?: { id?: string; name?: string; email?: string };
  gearItem?: { id?: string; title?: string; name?: string; pricePerDay?: number };
  gear?: { id?: string; title?: string; name?: string; pricePerDay?: number };
}

export interface IAdminTopGear {
  id: string;
  title?: string;
  name?: string;
  totalRentals?: number;
  rentalCount?: number;
  revenue?: number;
  totalEarnings?: number;
  pricePerDay?: number;
  category?: { name?: string } | string;
  images?: string[];
  image?: string;
}

// Provider Overview Types
export interface IProviderOverviewData {
  totalGear?: number;
  activeOrders?: number;
  totalOrders?: number;
  totalEarnings?: number;
  revenue?: number;
  lowStockCount?: number;
  newListings?: number;
  [key: string]: unknown;
}

export interface IProviderRecentOrder {
  id: string;
  orderId?: string;
  status?: string;
  totalPrice?: number;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  customer?: { id?: string; name?: string; email?: string };
  user?: { id?: string; name?: string; email?: string };
  gearItem?: { id?: string; title?: string; name?: string; pricePerDay?: number };
  gear?: { id?: string; title?: string; name?: string; pricePerDay?: number };
}

export interface IProviderTopGear {
  id: string;
  title?: string;
  name?: string;
  totalRentals?: number;
  rentalCount?: number;
  revenue?: number;
  totalEarnings?: number;
  pricePerDay?: number;
  category?: { name?: string } | string;
  images?: string[];
  image?: string;
}

export interface IProviderLowStockGear {
  id: string;
  title?: string;
  name?: string;
  quantity?: number;
  stock?: number;
  pricePerDay?: number;
  category?: { name?: string } | string;
  images?: string[];
  image?: string;
}

// Customer Overview Types
export interface ICustomerOverviewData {
  totalOrders?: number;
  activeRentals?: number;
  totalSpent?: number;
  reviewsGiven?: number;
  completedRentals?: number;
  [key: string]: unknown;
}

export interface ICustomerRecentOrder {
  id: string;
  status?: string;
  paymentStatus?: string;
  totalPrice?: number;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  gearItem?: { id?: string; title?: string; name?: string; pricePerDay?: number; images?: string[] };
  gear?: { id?: string; title?: string; name?: string; pricePerDay?: number; images?: string[] };
}

export interface ICustomerRecentReview {
  id: string;
  rating: number;
  comment?: string;
  review?: string;
  createdAt?: string;
  gearItem?: { id?: string; title?: string; name?: string };
  gear?: { id?: string; title?: string; name?: string };
}

