import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="ADMIN">{children}</DashboardLayout>;
}
