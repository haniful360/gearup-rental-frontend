"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, PartyPopper } from "lucide-react";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { confirmPayment } from "@/service/payment/confirm";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function verifyPayment() {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        if (active) {
          setStatus("failed");
          setMessage("Missing payment session. Please try booking again.");
        }
        return;
      }

      try {
        const result = await confirmPayment({ sessionId });
        if (!active) return;
        if (result.success) {
          setStatus("success");
        } else {
          setStatus("failed");
          setMessage(result.message || "Payment could not be confirmed.");
        }
      } catch {
        if (active) {
          setStatus("failed");
          setMessage("Something went wrong while confirming your payment.");
        }
      }
    }

    verifyPayment();
    return () => {
      active = false;
    };
  }, [searchParams]);

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-full rounded-2xl border bg-card p-8 shadow-sm sm:p-10">
        {status === "loading" && (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
            </div>
            <h1 className="mt-5 text-xl font-bold">Confirming payment...</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Please wait while we verify your payment with Stripe.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="relative mx-auto w-fit">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <PartyPopper className="absolute -right-1 -top-1 h-5 w-5 text-amber-400" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Payment Successful!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your payment has been confirmed and your booking is locked in.
              A copy of the receipt was sent to your account dashboard.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <DynamicActionButton
                label="View My Orders"
                href="/dashboard/customer/orders"
                className="sm:flex-1"
              />
              <DynamicActionButton
                label="Back to Home"
                href="/"
                variant="outline"
                className="sm:flex-1"
              />
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/50">
              <XCircle className="h-10 w-10 text-rose-600 dark:text-rose-400" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Payment Not Completed</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {message} You can retry the payment from your orders dashboard.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <DynamicActionButton
                label="View My Orders"
                href="/dashboard/customer/orders"
                className="sm:flex-1"
              />
              <DynamicActionButton
                label="Back to Home"
                href="/"
                variant="outline"
                className="sm:flex-1"
              />
            </div>
          </>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Need help?{" "}
          <Link
            href="/help"
            className="font-medium text-emerald-600 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
