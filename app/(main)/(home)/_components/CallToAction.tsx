import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";

export function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-10 md:p-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Start Renting?
          </h2>
          <p className="text-zinc-400">
            Join thousands of users who are already renting and listing gear on GearUp.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <DynamicActionButton
              label="Get Started Free"
              href="/register"
              showIcon
              className="h-12 px-8 text-base"
            />
            <DynamicActionButton
              label="Explore Gear"
              href="/gear"
              variant="outline"
              className="h-12 border-zinc-700 px-8 text-base text-zinc-300 hover:bg-zinc-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
