import { getAllCategories } from "@/service/category/getAll";
import { HeroSection } from "./_components/HeroSection";
import { StatsBanner } from "./_components/StatsBanner";
import { HowItWorks } from "./_components/HowItWorks";
import { PopularCategories } from "./_components/PopularCategories";
import { FeaturedGear } from "./_components/FeaturedGear";
import { Testimonials } from "./_components/Testimonials";
import { CallToAction } from "./_components/CallToAction";

export default async function HomePage() {
  const categoriesResult = await getAllCategories();
  const categories = categoriesResult?.data || [];

  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBanner />
      <HowItWorks />
      <PopularCategories categories={categories} />
      <FeaturedGear />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
