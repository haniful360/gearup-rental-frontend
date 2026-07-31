import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Package,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { Badge } from "@/components/ui/badge";
import { getGearImage } from "@/lib/gear-images";
import { getGearItemById } from "@/service/gear-items/getById";
import { getAllGearItems } from "@/service/gear-items/getAll";
import { getAllCategories } from "@/service/category/getAll";
import { getMe } from "@/service/auth/getMe";
import GearCard from "../_components/GearCard/GearCard";
import BookingFlow from "./_components/BookingFlow/BookingFlow";
import type { GearItem } from "../page";

interface RawGearItem {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  pricePerDay?: number;
  location?: string;
  brand?: string;
  stock?: number;
  categoryId?: string;
  categoryName?: string;
}

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [gearResult, allGearsResult, categoriesResult, userResult] =
    await Promise.all([
      getGearItemById(id),
      getAllGearItems({ limit: 100 }),
      getAllCategories(),
      getMe(),
    ]);

  const rawGear = gearResult?.data as RawGearItem | undefined;
  if (!rawGear || !rawGear.id) notFound();

  const currentUser = userResult?.data as
    | { role?: string; id?: string }
    | null
    | undefined;
  const canBook =
    !!currentUser && currentUser.role === "CUSTOMER";

  const categories: { id: string; name: string }[] = categoriesResult?.data || [];

  const gear: GearItem = {
    id: rawGear.id,
    title: rawGear.title ?? "Untitled Gear",
    description: rawGear.description ?? "",
    pricePerDay: Number(rawGear.pricePerDay ?? 0),
    location: rawGear.location ?? "",
    brand: rawGear.brand ?? "",
    stock: Number(rawGear.stock ?? 0),
    categoryId: rawGear.categoryId,
    categoryName:
      rawGear.categoryName ||
      categories.find((c) => c.id === rawGear.categoryId)?.name,
  };

  const relatedItems = ((allGearsResult?.data as RawGearItem[] | undefined) || [])
    .map((raw) => ({
      id: raw?.id ?? raw?._id ?? "",
      title: raw?.title ?? "Untitled Gear",
      description: raw?.description ?? "",
      pricePerDay: Number(raw?.pricePerDay ?? 0),
      location: raw?.location ?? "",
      brand: raw?.brand ?? "",
      stock: Number(raw?.stock ?? 0),
      categoryId: raw?.categoryId,
      categoryName:
        raw?.categoryName ||
        categories.find((c) => c.id === raw?.categoryId)?.name,
    }))
    .filter((item) => item.id !== gear.id);

  const sameCategory = relatedItems.filter(
    (item) =>
      !!gear.categoryName &&
      (item.categoryName ?? "").toLowerCase() === gear.categoryName.toLowerCase(),
  );
  const otherCategory = relatedItems.filter(
    (item) => !sameCategory.includes(item),
  );
  const related = [...sameCategory, ...otherCategory].slice(0, 4);

  const includes = [
    "Free cancellation up to 48 hours before pickup",
    "Clean, inspected and safety-checked before every rental",
    "Pickup & drop-off available at provider location",
    "Basic usage guide included",
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <Link
        href="/gear"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Explore Gear
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="relative aspect-[4/3]">
            <Image
              src={getGearImage(gear.categoryName, 0)}
              alt={gear.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {gear.categoryName && (
            <Badge className="absolute left-4 top-4 bg-black/50 text-white backdrop-blur-sm border-white/20">
              {gear.categoryName}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                <BadgeCheck className="mr-1 h-3 w-3" />
                Verified Provider
              </Badge>
              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                4.8 (128 reviews)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {gear.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-600" />
                {gear.location || "Location TBD"}
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4 text-emerald-600" />
                {gear.brand || "Generic"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" />
                {gear.stock > 0
                  ? `${gear.stock} in stock`
                  : "Currently out of stock"}
              </span>
            </div>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {gear.description}
          </p>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Price per day
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${gear.pricePerDay.toFixed(2)}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    /day
                  </span>
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                ${(gear.pricePerDay * 7).toFixed(2)} for 7 days
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {canBook ? (
                <BookingFlow gear={gear} />
              ) : (
                <DynamicActionButton
                  label="Rent Now"
                  href={`/login?redirect=/gear/${gear.id}`}
                  className="h-12 w-full text-base"
                />
              )}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 py-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Protected</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 py-3">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Pickup</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 py-3">
                  <BadgeCheck className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">What&apos;s included</h2>
          <ul className="mt-4 space-y-3">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Rental terms</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Valid ID and security deposit required at pickup",
              "Renter must be 18 years or older",
              "Items must be returned in the same condition",
              "Damage beyond normal wear is the renter's responsibility",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {sameCategory.length > 0
                  ? "Related Gear"
                  : "You may also like"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {sameCategory.length > 0
                  ? `More gear in ${gear.categoryName || "this category"}`
                  : "Similar gear our users love"}
              </p>
            </div>
            <Link
              href="/gear"
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <GearCard key={item.id} gear={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
