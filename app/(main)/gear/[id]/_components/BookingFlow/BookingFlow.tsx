"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  PartyPopper,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DynamicActionButton from "@/components/dashboard/DynamicActionButton/DynamicActionButton";
import { createRentalOrder } from "@/service/rental-order/create";
import { createPayment } from "@/service/payment/create";
import type { GearItem } from "../../../page";

interface BookingFlowProps {
  gear: GearItem;
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDateTimeISO(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toISOString();
}

function formatDate(value?: string) {
  if (!value) return "—";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function todayISO() {
  return toISODate(new Date());
}

function addDaysISO(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

function diffDays(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  return Math.max(
    1,
    Math.round((endDate.getTime() - startDate.getTime()) / 86400000),
  );
}

interface OrderResult {
  id?: string;
  startDate?: string;
  endDate?: string;
  quantity?: number;
  totalPrice?: number;
}

export default function BookingFlow({ gear }: BookingFlowProps) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState(addDaysISO(todayISO(), 1));
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);

  const days = diffDays(startDate, endDate);
  const unitPrice = gear.pricePerDay;
  const totalPrice = unitPrice * days * quantity;
  const isValid =
    startDate >= todayISO() &&
    endDate > startDate &&
    quantity >= 1 &&
    quantity <= gear.stock;

  const handleClose = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        setStep(1);
        setOrder(null);
      }, 200);
    }
  };

  const handleConfirm = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      const result = await createRentalOrder({
        gearItemId: gear.id,
        startDate: toDateTimeISO(startDate),
        endDate: toDateTimeISO(endDate),
        totalPrice,
        quantity,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to create booking");
        return;
      }

      const created = (result?.data ?? {}) as OrderResult;
      setOrder(created);
      setStep(2);
      toast.success("Booking created successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!order?.id) {
      toast.info("Booking saved — payment link will be shared by the provider");
      return;
    }
    setIsPaying(true);
    try {
      const result = await createPayment({
        rentalOrderId: order.id,
        redirectUrl: `${window.location.origin}/payment/success`,
      });
      if (!result.success) {
        toast.info(
          result.message || "Payment initiated — you can complete it later",
        );
        return;
      }
      const data = (result?.data ?? {}) as { paymentUrl?: string };
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }
      toast.success("Payment initiated successfully");
    } catch {
      toast.info("Payment will be completed at pickup");
    } finally {
      setIsPaying(false);
    }
  };

  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQuantity = () =>
    setQuantity((q) => Math.min(gear.stock, q + 1));

  return (
    <>
      <DynamicActionButton
        label="Book Now"
        icon={CalendarDays}
        showIcon
        iconPosition="right"
        onClick={() => setOpen(true)}
        className="h-12 w-full text-base"
      />

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent maxHeight="90vh">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-emerald-600" />
              Book: {gear.title}
            </DialogTitle>
            <DialogDescription>
              Pick your dates and quantity — the total updates automatically.
            </DialogDescription>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 px-1 pt-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                step === 1
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900"
              }`}
            >
              1
            </div>
            <span
              className={`text-sm font-medium ${
                step === 1 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Rental Details
            </span>
            <div className="mx-1 h-px flex-1 bg-border" />
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                step === 2
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span
              className={`text-sm font-medium ${
                step === 2 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Confirmation
            </span>
          </div>

          {step === 1 ? (
            <div className="space-y-5 overflow-y-auto py-4">
              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <CalendarDays className="h-3.5 w-3.5 text-emerald-600" />
                    Pickup date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    min={todayISO()}
                    onChange={(e) => {
                      const value = e.target.value;
                      setStartDate(value);
                      if (value && endDate <= value) {
                        setEndDate(addDaysISO(value, 1));
                      }
                    }}
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <CalendarDays className="h-3.5 w-3.5 text-emerald-600" />
                    Return date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={addDaysISO(startDate, 1)}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between rounded-xl border bg-muted/40 p-4">
                <div>
                  <p className="text-sm font-semibold">Quantity</p>
                  <p className="text-xs text-muted-foreground">
                    {gear.stock > 0
                      ? `${gear.stock} available in stock`
                      : "Currently out of stock"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DynamicActionButton
                    label="−"
                    variant="outline"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-9 w-9 px-0 text-base"
                  />
                  <span className="w-10 text-center text-lg font-bold">
                    {quantity}
                  </span>
                  <DynamicActionButton
                    label="+"
                    variant="outline"
                    onClick={increaseQuantity}
                    disabled={quantity >= gear.stock}
                    className="h-9 w-9 px-0 text-base"
                  />
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 rounded-xl border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Price breakdown
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      ${unitPrice.toFixed(2)} / day × {days} day{days > 1 ? "s" : ""}
                    </span>
                    <span className="font-medium">
                      ${(unitPrice * days).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      × {quantity} item{quantity > 1 ? "s" : ""}
                    </span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-dashed pt-2.5 text-base font-bold">
                    <span>Total</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg bg-emerald-500/5 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Free cancellation up to 48 hours before pickup. A refundable
                  security deposit may be required at pickup.
                </span>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-400" />
                </div>
                <h3 className="mt-5 text-xl font-bold">
                  Booking Confirmed!
                </h3>
                <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                  Your rental order for{" "}
                  <span className="font-semibold text-foreground">
                    {gear.title}
                  </span>{" "}
                  has been placed successfully.
                </p>
                {order?.id ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    <PartyPopper className="h-3.5 w-3.5 text-emerald-600" />
                    Order #{order.id}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 space-y-2.5 rounded-xl border bg-card p-5 text-sm shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Pickup</span>
                  <span className="font-medium">
                    {formatDate(order?.startDate ?? startDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Return</span>
                  <span className="font-medium">
                    {formatDate(order?.endDate ?? endDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">
                    {order?.quantity ?? quantity}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed pt-2.5">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ${(order?.totalPrice ?? totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                A copy of this booking was sent to your account dashboard.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-4">
            {step === 2 ? (
              <>
                <DynamicActionButton
                  label="Proceed to Payment"
                  icon={ArrowRight}
                  showIcon
                  iconPosition="right"
                  isLoading={isPaying}
                  onClick={handlePayment}
                  className="flex-1"
                />
                <DynamicActionButton
                  label="Done"
                  onClick={() => handleClose(false)}
                  className="flex-1"
                />
              </>
            ) : (
              <>
                <DynamicActionButton
                  label="Cancel"
                  variant="outline"
                  onClick={() => handleClose(false)}
                />
                <DynamicActionButton
                  label={
                    !isValid
                      ? "Select valid dates"
                      : `Book for $${totalPrice.toFixed(2)}`
                  }
                  icon={CalendarDays}
                  showIcon
                  iconPosition="right"
                  isLoading={isSubmitting}
                  disabled={!isValid}
                  onClick={handleConfirm}
                />
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 px-1 pb-1 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            Powered by GearUp secure booking.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
