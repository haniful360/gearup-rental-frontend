import Link from "next/link";
import { XCircle } from "lucide-react";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-full rounded-2xl border bg-card p-8 shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
          <XCircle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Payment Cancelled</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment was not completed and no amount was charged. Your booking
          is still saved — you can complete the payment anytime from your orders
          dashboard.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <DynamicActionButton
            label="View My Orders"
            href="/dashboard/customer/orders"
            className="sm:flex-1"
          />
          <DynamicActionButton
            label="Continue Shopping"
            href="/gear"
            variant="outline"
            className="sm:flex-1"
          />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Questions about your payment?{" "}
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
