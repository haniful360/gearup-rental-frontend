import { Users, ShieldCheck, ClipboardList, Activity } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '1,482', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Gear Listed', value: '356', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Active Rentals', value: '89', icon: ClipboardList, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Platform Health', value: '98%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">Monitor platform activity and manage operations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Recent Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">Latest platform events and user actions.</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Pending Reviews</h2>
          <p className="mt-1 text-sm text-muted-foreground">Gear listings and user reports awaiting moderation.</p>
        </div>
      </div>
    </div>
  );
}
