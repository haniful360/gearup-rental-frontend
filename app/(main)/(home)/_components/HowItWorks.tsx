import { Search, Handshake, Zap } from "lucide-react";

const steps = [
  { icon: Search, title: "Browse Gear", desc: "Explore thousands of premium outdoor equipment from trusted providers near you." },
  { icon: Handshake, title: "Book & Pay", desc: "Securely reserve your gear with instant confirmation and flexible rental periods." },
  { icon: Zap, title: "Pick Up & Enjoy", desc: "Collect your gear, enjoy your adventure, and return with ease." },
];

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="text-center space-y-3 mb-14">
        <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Three easy steps to get your gear and start your adventure.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative flex flex-col items-center text-center rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold">{i + 1}</span>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 mb-5">
                <Icon className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
