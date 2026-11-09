import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Wildlife Atlas",
  description: "Privacy policy and data governance practices of Wildlife Atlas.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-4 h-4" />
          <span>User Privacy Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs text-[var(--muted)] mt-1">Effective Date: November 2024</p>
      </div>

      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6 text-sm text-[var(--muted)] leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-foreground mb-2">1. Data Collection & Ethics</h2>
          <p>
            Wildlife Atlas collects minimal personal information necessary to manage user accounts and lifetime research entitlements.
            We collect your email address, full name, and payment transaction reference upon checkout. We do not sell or monetize personal researcher data.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">2. Payment Information Security</h2>
          <p>
            All payment processing is executed through verified gateway providers (Razorpay for INR transactions, Stripe for USD transactions).
            Credit card numbers and UPI authentication credentials are never processed or stored on our servers.
            Entitlements are verified exclusively through cryptographically signed server webhooks.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">3. Sensitive Wildlife Location Masking</h2>
          <p>
            To prevent wildlife poaching and illegal collection, exact GPS coordinates of Critically Endangered taxa (e.g. rare chelonians, rhinos, pangolins)
            are automatically generalized to regional 100 km grid squares in accordance with IUCN sensitivity guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">4. Your Rights</h2>
          <p>
            You have the right to inspect, download, or delete your account records at any time from your account settings.
          </p>
        </section>
      </div>
    </div>
  );
}

