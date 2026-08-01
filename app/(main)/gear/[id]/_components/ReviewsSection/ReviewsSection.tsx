import { Star, MessageSquareQuote, UserRound } from "lucide-react";
import type { Review } from "@/types/review.types";

interface ReviewsSectionProps {
  reviews: Review[];
}

function formatDate(value?: string) {
  if (!value) return "—";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function initials(name?: string) {
  return (name || "R")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const validReviews = reviews.filter(
    (review) => review && (review.comment || review.rating),
  );
  const count = validReviews.length;
  const average =
    count > 0
      ? validReviews.reduce((sum, review) => sum + Number(review.rating ?? 0), 0) /
        count
      : 0;

  return (
    <div className="mt-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What renters are saying about this gear.
          </p>
        </div>
        {count > 0 && (
          <div className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-3 shadow-sm">
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {average.toFixed(1)}
            </span>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(average)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Based on {count} {count === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        )}
      </div>

      {count === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageSquareQuote className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold">No reviews yet</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Rent this gear and be the first to leave a review after your rental
            is returned.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {validReviews.map((review, index) => (
            <div
              key={review.id || review.createdAt || `review-${index}`}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {initials(review.customer?.name)}
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      <UserRound className="h-3.5 w-3.5 text-muted-foreground" />
                      {review.customer?.name || "Verified Renter"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Number(review.rating ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.comment ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No written comment.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
