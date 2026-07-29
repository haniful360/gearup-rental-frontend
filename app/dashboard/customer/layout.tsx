import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="CUSTOMER">{children}</DashboardLayout>;
}
