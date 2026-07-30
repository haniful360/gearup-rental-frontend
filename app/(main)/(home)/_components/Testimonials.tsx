import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Jenkins", role: "Outdoor Enthusiast", text: "GearUp made renting top-tier kayak equipment effortless for our mountain trip. The pickup was seamless!", rating: 5 },
  { name: "Marcus Rivera", role: "Adventure Photographer", text: "I've been using GearUp for all my camping needs. The gear quality is exceptional and prices are fair.", rating: 5 },
  { name: "Emily Chen", role: "Weekend Cyclist", text: "Found a premium mountain bike at half the retail price. The provider was super helpful with fitting adjustments.", rating: 4 },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-14">
          <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-500 border border-purple-500/20">
            <Star className="inline h-3 w-3 mr-1" /> Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Trusted by thousands of adventurers and gear providers.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <StarRating count={t.rating} />
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
