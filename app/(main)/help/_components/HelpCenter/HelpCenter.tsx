"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "How do I book a rental?",
    answer:
      "Browse the Gear Catalog, pick an item, choose your pickup and return dates, and hit Rent Now. Once you confirm your payment, your booking request is sent to the provider for approval.",
  },
  {
    question: "How do I cancel a booking?",
    answer:
      "Go to your dashboard, open the booking, and select Cancel. Cancellations made more than 48 hours before pickup are fully refunded. See our Rental Policies for the complete timeline.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are issued to your original payment method within 5–10 business days after a cancellation or a successful return and inspection.",
  },
  {
    question: "How do I list my gear as a provider?",
    answer:
      "Sign up for a provider account, open the Provider Dashboard, and use the List Your Gear form to add your equipment with photos, pricing, and availability.",
  },
  {
    question: "What happens if the gear is damaged?",
    answer:
      "Report the damage to the provider as soon as possible. Reasonable wear and tear is expected, while accidental damage is assessed case-by-case against the item's security deposit.",
  },
  {
    question: "Can I extend my rental period?",
    answer:
      "Yes — contact the provider through the platform to request an extension. Extensions are subject to the item's availability and are charged at the daily rate.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely. All payments are processed through encrypted, PCI-DSS compliant payment gateways. Your card details are never stored on our servers.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click Forgot Password on the sign-in page and enter the email associated with your account. We'll send you a secure link to create a new password.",
  },
];

export function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="flex items-center gap-3 font-semibold">
                <MessageCircleQuestion className="h-5 w-5 shrink-0 text-emerald-600" />
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-emerald-500" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
