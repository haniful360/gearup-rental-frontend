import { getAllRentalOrders } from "@/service/rental-order/getAll";
import { getMe } from "@/service/auth/getMe";
import { getReviewsByGearItem } from "@/service/review/getByGearItem";
import DynamicPageHeader from "@/components/dashboard/DynamicPageHeader/DynamicPageHeader";
import CustomerReviewsClient from "./_components/CustomerReviewsClient/CustomerReviewsClient";
import type { Review } from "@/types/review.types";

const REVIEWABLE_STATUSES = ["RETURNED", "COMPLETED"];

interface RentalOrder {
  id?: string;
  gearItemId?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  status?: string;
  gearItem?: {
    id?: string;
    title?: string;
    brand?: string;
    location?: string;
    pricePerDay?: number;
  };
}

export default async function CustomerReviewsPage() {
  const [ordersResult, userResult] = await Promise.all([
    getAllRentalOrders({ limit: 100 }),
    getMe(),
  ]);

  const orders: RentalOrder[] = ordersResult?.data || [];
  const currentUser = userResult?.data as
    | { id?: string; name?: string }
    | null
    | undefined;

  const returnedOrders = orders.filter((order) =>
    REVIEWABLE_STATUSES.includes((order.status || "").toUpperCase()),
  );

  const uniqueGears = returnedOrders.reduce<Record<string, RentalOrder>>(
    (acc, order) => {
      const gearItemId = order.gearItemId || order.gearItem?.id;
      if (gearItemId && !acc[gearItemId]) acc[gearItemId] = order;
      return acc;
    },
    {},
  );

  const gears = await Promise.all(
    Object.values(uniqueGears).map(async (order) => {
      const gearItemId = order.gearItemId || order.gearItem?.id || "";
      const reviewsResult = gearItemId
        ? await getReviewsByGearItem(gearItemId)
        : null;
      const reviews: Review[] = (reviewsResult?.data as Review[] | undefined) ?? [];
      const myReview =
        reviews.find(
          (review) =>
            review.customerId &&
            currentUser?.id &&
            review.customerId === currentUser.id,
        ) || null;

      return {
        gearItemId,
        title: order.gearItem?.title || "Untitled Gear",
        brand: order.gearItem?.brand || "",
        location: order.gearItem?.location || "",
        pricePerDay: Number(order.gearItem?.pricePerDay ?? 0) || undefined,
        myReview,
      };
    }),
  );

  return (
    <div className="space-y-6">
      <DynamicPageHeader
        title="My Reviews"
        description="Rate and review gear you have rented and returned"
      />
      <CustomerReviewsClient gears={gears} />
    </div>
  );
}
