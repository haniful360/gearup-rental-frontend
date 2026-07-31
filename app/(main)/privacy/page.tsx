import { ShieldCheck } from "lucide-react";
import {
  PolicyPage,
  PolicySection,
  PolicyList,
} from "@/components/shared/PolicyPage/PolicyPage";

export default function PrivacyPage() {
  return (
    <PolicyPage
      badge="Privacy"
      icon={ShieldCheck}
      title="Privacy Policy"
      description="How GearUp collects, uses, and protects your personal information when you use our platform."
      updatedAt="July 31, 2026"
    >
      <PolicySection title="1. Information We Collect">
        <PolicyList
          items={[
            "Account information such as your name, email address, and profile photo.",
            "Identity and verification details you voluntarily provide.",
            "Booking and transaction history, including rental dates and payment records.",
            "Communications you exchange with other users through the platform.",
            "Technical data such as device type, browser, and usage patterns.",
          ]}
        />
      </PolicySection>

      <PolicySection title="2. How We Use Your Information">
        <PolicyList
          items={[
            "To operate and maintain your account and rental transactions.",
            "To process payments and prevent fraud.",
            "To provide customer support and respond to inquiries.",
            "To improve our services, features, and user experience.",
            "To send service updates and, with your consent, promotional content.",
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Sharing & Disclosure">
        <p>
          We do not sell your personal information. We share data only in
          limited circumstances, such as:
        </p>
        <PolicyList
          items={[
            "With providers or renters as necessary to complete a booking.",
            "With payment processors to handle transactions securely.",
            "With service providers who help us operate the platform.",
            "When required by law or to protect the rights and safety of users.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Data Security">
        <p>
          We implement reasonable technical and organizational safeguards to
          protect your information. While no method of transmission is 100%
          secure, we continuously work to keep your data safe using encryption,
          access controls, and routine security reviews.
        </p>
      </PolicySection>

      <PolicySection title="5. Your Choices & Rights">
        <PolicyList
          items={[
            "Access, update, or correct your account information at any time.",
            "Opt out of marketing communications with one click.",
            "Request deletion of your account and personal data.",
            "Export a copy of the data we hold about you.",
            "Withdraw consent for optional data processing at any time.",
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Cookies & Analytics">
        <p>
          We use cookies and similar technologies to keep you signed in,
          remember your preferences, and understand how the platform is used.
          You can control cookies through your browser settings.
        </p>
      </PolicySection>

      <PolicySection title="7. Contact Us">
        <p>
          Questions about this Privacy Policy? Contact us at{" "}
          <a
            href="mailto:privacy@gearup.com"
            className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            privacy@gearup.com
          </a>
          .
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
