"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createPayment } from "@/service/payment/create";

interface PayNowButtonProps {
  orderId: string;
  size?: "sm" | "md";
  className?: string;
}

export default function PayNowButton({
  orderId,
  size = "sm",
  className = "",
}: PayNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    if (!orderId) {
      toast.error("Invalid order ID");
      return;
    }
    setLoading(true);
    try {
      const result = await createPayment({
        rentalOrderId: orderId,
        redirectUrl: `${window.location.origin}/payment/success`,
      });

      if (!result?.success) {
        toast.error(result?.message || "Failed to initiate payment");
        return;
      }

      const data = (result?.data ?? {}) as { paymentUrl?: string };
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      toast.success("Payment initiated successfully");
    } catch (err: any) {
      toast.error(
        err?.message || "Something went wrong while initiating payment",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayNow}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500 ${
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
      } ${className}`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <CreditCard className="h-3.5 w-3.5" />
      )}
      <span>{loading ? "Redirecting..." : "Pay Now"}</span>
    </button>
  );
}
