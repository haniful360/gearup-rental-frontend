import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { TrendingUp } from "lucide-react";

const gearItems = [
  { name: "Premium Kayak Pro", price: 45, period: "day", image: "🚣" },
  { name: "4-Season Camping Tent", price: 30, period: "day", image: "⛺" },
  { name: "Mountain Bike XTR", price: 55, period: "day", image: "🚵" },
  { name: "Snowboard Set Elite", price: 40, period: "day", image: "🏂" },
];

export function FeaturedGear() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="text-center space-y-3 mb-14">
        <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
          <TrendingUp className="inline h-3 w-3 mr-1" /> Trending Now
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Gear</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Top-rated equipment available for rent right now.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gearItems.map((item) => (
          <div key={item.name} className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-6xl group-hover:scale-110 transition-transform duration-500">
              {item.image}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  ${item.price}<span className="text-xs font-normal text-muted-foreground">/{item.period}</span>
                </p>
                <DynamicActionButton
                  label="Rent Now"
                  variant="outline"
                  className="h-9 text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
