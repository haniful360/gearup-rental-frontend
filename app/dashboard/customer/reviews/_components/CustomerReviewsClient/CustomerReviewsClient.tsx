"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star, BadgeCheck, MessageSquarePlus, MapPin, Package } from "lucide-react";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/service/review/create";
import type { Review } from "@/types/review.types";

interface EligibleGear {
  gearItemId: string;
  title: string;
  brand?: string;
  location?: string;
  pricePerDay?: number;
  myReview: Review | null;
}

interface CustomerReviewsClientProps {
  gears: EligibleGear[];
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

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= value ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hover || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer p-0.5 transition-transform hover:scale-110"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                active
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewForm({ gear }: { gear: EligibleGear }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a short review");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createReview({
        gearItemId: gear.gearItemId,
        rating,
        comment: comment.trim(),
      });
      if (!result.success) {
        toast.error(result.message || "Failed to submit review");
        return;
      }
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/50 px-4 py-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your rating
          </p>
          <StarPicker value={rating} onChange={setRating} />
        </div>
        {rating > 0 && (
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {rating}/5
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Your review
        </label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience — condition, pickup experience, value for money..."
          rows={3}
          maxLength={500}
          className="resize-none bg-zinc-50 dark:bg-zinc-900/60"
        />
      </div>

      <div className="flex justify-end">
        <DynamicActionButton
          label={isSubmitting ? "Submitting..." : "Submit Review"}
          icon={MessageSquarePlus}
          showIcon
          type="button"
          isLoading={isSubmitting}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default function CustomerReviewsClient({ gears }: CustomerReviewsClientProps) {
  return (
    <div className="space-y-6">
      {gears.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageSquarePlus className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold">Nothing to review yet</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Once you have rented and returned a gear item, it will appear here
            so you can leave a review.
          </p>
        </div>
      ) : (
        gears.map((gear) => (
          <div key={gear.gearItemId} className="rounded-xl border bg-card shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b px-6 py-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{gear.title}</h3>
                  {gear.myReview ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Reviewed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      Ready to review
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {gear.pricePerDay != null && (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ${gear.pricePerDay.toFixed(2)}/day
                    </span>
                  )}
                  {gear.brand && (
                    <span className="flex items-center gap-1">
                      <Package className="h-3.5 w-3.5" />
                      {gear.brand}
                    </span>
                  )}
                  {gear.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {gear.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-5">
              {gear.myReview ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Stars value={Number(gear.myReview.rating ?? 0)} />
                    <span className="text-sm font-medium text-muted-foreground">
                      Submitted{" "}
                      {gear.myReview.createdAt
                        ? formatDate(gear.myReview.createdAt)
                        : "recently"}
                    </span>
                  </div>
                  {gear.myReview.comment && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {gear.myReview.comment}
                    </p>
                  )}
                </div>
              ) : (
                <ReviewForm gear={gear} />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
