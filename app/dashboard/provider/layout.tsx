import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function ProviderDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="PROVIDER">{children}</DashboardLayout>;
}
