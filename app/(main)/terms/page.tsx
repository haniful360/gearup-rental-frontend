import { ScrollText } from "lucide-react";
import {
  PolicyPage,
  PolicySection,
  PolicyList,
} from "@/components/shared/PolicyPage/PolicyPage";

export default function TermsPage() {
  return (
    <PolicyPage
      badge="Legal"
      icon={ScrollText}
      title="Terms of Service"
      description="The rules and guidelines that govern your use of the GearUp platform as a renter or a provider."
      updatedAt="July 31, 2026"
    >
      <PolicySection title="1. Acceptance of Terms">
        <p>
          By accessing or using GearUp, you agree to be bound by these Terms of
          Service and all applicable laws and regulations. If you do not agree
          with any part of these terms, you may not use the platform.
        </p>
        <p>
          These terms apply to all visitors, renters, and providers. Your
          continued use of the platform constitutes acceptance of any future
          revisions we publish.
        </p>
      </PolicySection>

      <PolicySection title="2. Accounts & Eligibility">
        <PolicyList
          items={[
            "You must be at least 18 years old to create an account or enter into a rental agreement.",
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "You must provide accurate, current, and complete information during registration.",
            "We may suspend or terminate accounts that violate these terms or platform policies.",
            "Each individual is limited to one account unless otherwise approved in writing.",
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Rental Transactions">
        <p>
          GearUp acts as a marketplace connecting renters with providers.
          While we facilitate bookings, payments, and communications, the
          rental agreement itself is formed directly between the renter and the
          provider.
        </p>
        <PolicyList
          items={[
            "Rental prices are set by providers and may be adjusted at any time.",
            "Bookings are confirmed once payment has been successfully processed.",
            "Renters must return equipment by the agreed-upon end date and time.",
            "Providers are responsible for delivering gear in the condition described.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Payments & Fees">
        <PolicyList
          items={[
            "All payments are processed securely and may be subject to service fees.",
            "Listed prices are shown per day unless otherwise specified.",
            "Cancellation eligibility and refunds are governed by our Rental Policies.",
            "Providers are responsible for any taxes applicable to their rental income.",
          ]}
        />
      </PolicySection>

      <PolicySection title="5. Acceptable Use">
        <PolicyList
          items={[
            "Do not use the platform for any unlawful, fraudulent, or abusive purpose.",
            "Do not attempt to interfere with the platform's security or availability.",
            "Do not misrepresent yourself, your gear, or the condition of listed items.",
            "Do not use automated tools to scrape or harvest data from the platform.",
            "Respect intellectual property rights of other users and the platform.",
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Liability & Disclaimers">
        <p>
          GearUp is provided on an &quot;as is&quot; and &quot;as available&quot;
          basis. We do not guarantee uninterrupted availability, and we are not
          liable for damages arising from the condition or use of rented
          equipment.
        </p>
        <p>
          To the fullest extent permitted by law, GearUp disclaims all
          warranties, and our aggregate liability shall not exceed the fees you
          paid to us in the three months preceding the claim.
        </p>
      </PolicySection>

      <PolicySection title="7. Changes to These Terms">
        <p>
          We may update these Terms of Service from time to time. We will notify
          you of material changes through the platform or via email. Continued
          use of GearUp after changes take effect constitutes acceptance of the
          revised terms.
        </p>
      </PolicySection>

      <PolicySection title="8. Contact Us">
        <p>
          If you have questions about these Terms of Service, reach out to our
          support team at{" "}
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
