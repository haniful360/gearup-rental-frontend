import { CalendarClock } from "lucide-react";
import {
  PolicyPage,
  PolicySection,
  PolicyList,
} from "@/components/shared/PolicyPage/PolicyPage";

export default function RentalPolicyPage() {
  return (
    <PolicyPage
      badge="Policies"
      icon={CalendarClock}
      title="Rental Policies"
      description="Everything you need to know about booking, canceling, damage, and returns — so you can rent with confidence."
      updatedAt="July 31, 2026"
    >
      <PolicySection title="1. Booking & Confirmation">
        <PolicyList
          items={[
            "A booking is confirmed once your payment is successfully processed.",
            "You must select a valid pickup date, return date, and rental duration.",
            "Stock availability is updated in real time; bookings are subject to confirmation by the provider.",
            "Providers may approve or decline a booking request within 24 hours.",
          ]}
        />
      </PolicySection>

      <PolicySection title="2. Payment & Deposits">
        <PolicyList
          items={[
            "The full rental amount is charged at the time of booking.",
            "Some premium items may require a refundable security deposit.",
            "Deposits are held and released within 5–7 business days after a successful return and inspection.",
            "All major credit cards and supported digital wallets are accepted.",
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Cancellations & Refunds">
        <PolicyList
          items={[
            "Free cancellation up to 48 hours before the rental start time.",
            "Cancellations within 48 hours may incur a 50% charge of the rental total.",
            "No-show cancellations (pickup more than 2 hours late) are non-refundable.",
            "Refunds are issued to the original payment method within 5–10 business days.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Pickup & Return">
        <PolicyList
          items={[
            "Inspect the gear with the provider at pickup; report any pre-existing issues immediately.",
            "Return gear clean and in the same condition it was received.",
            "Late returns incur a 50% surcharge of the daily rate per additional day.",
            "Returns must be coordinated directly with the provider at the agreed location.",
          ]}
        />
      </PolicySection>

      <PolicySection title="5. Damage, Loss, & Insurance">
        <PolicyList
          items={[
            "Renters are responsible for gear from pickup until return.",
            "Reasonable wear and tear is expected; accidental damage is handled case-by-case.",
            "Loss or theft of equipment must be reported immediately and will be billed at replacement value.",
            "Providers must accurately describe the condition of their gear at the time of listing.",
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Safety & Usage">
        <PolicyList
          items={[
            "You must be qualified and experienced to use the equipment you rent.",
            "Use gear only for its intended purpose as described by the provider.",
            "Follow all manufacturer safety guidelines and local regulations.",
            "GearUp and providers are not liable for injuries resulting from misuse of equipment.",
          ]}
        />
      </PolicySection>

      <PolicySection title="7. Provider Responsibilities">
        <PolicyList
          items={[
            "Deliver gear that is safe, functional, and accurately described.",
            "Communicate pickup instructions and availability promptly.",
            "Honor confirmed bookings and agreed-upon pricing.",
            "Maintain hygiene and cleanliness of all rental items.",
          ]}
        />
      </PolicySection>

      <PolicySection title="8. Disputes & Resolution">
        <p>
          If an issue arises with a rental, contact the provider first through
          the platform. If you cannot reach a resolution, our support team will
          mediate. Escalated disputes are reviewed within 5 business days.
        </p>
        <p>
          Have questions? Email us at{" "}
          <a
            href="mailto:support@gearup.com"
            className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            support@gearup.com
          </a>
          .
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
