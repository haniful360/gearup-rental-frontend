import { Package, Users, Star, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Package, value: "5,000+", label: "Gear Items" },
  { icon: Users, value: "2,500+", label: "Happy Users" },
  { icon: Star, value: "4.8/5", label: "Avg. Rating" },
  { icon: ShieldCheck, value: "100%", label: "Secure Payments" },
];

export function StatsBanner() {
  return (
    <section className="relative -mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border bg-card overflow-hidden shadow-lg">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center justify-center bg-background p-6 md:p-8">
                <Icon className="h-6 w-6 text-emerald-500 mb-2" />
                <p className="text-2xl md:text-3xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
