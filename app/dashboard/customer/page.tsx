import { ShoppingBag, Star, Clock, Compass } from 'lucide-react';

const stats = [
  { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Active Rentals', value: '3', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Reviews Given', value: '8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Gear Explored', value: '47', icon: Compass, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function CustomerOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your rental activity.</p>
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
          <h2 className="font-semibold">Recent Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your latest rental orders will appear here.</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Recommended Gear</h2>
          <p className="mt-1 text-sm text-muted-foreground">Personalized gear suggestions based on your history.</p>
        </div>
      </div>
    </div>
  );
}
