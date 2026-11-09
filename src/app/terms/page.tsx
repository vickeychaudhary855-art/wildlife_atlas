import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Wildlife Atlas",
  description: "Terms and conditions of use for Wildlife Atlas.",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Terms of Service
        </h1>
        <p className="text-xs text-[var(--muted)] mt-1">Effective Date: November 2024</p>
      </div>

      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6 text-sm text-[var(--muted)] leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Wildlife Atlas, you agree to be bound by these Terms of Service.
            If you disagree with any portion, please discontinue access to the platform.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">2. Lifetime Research Membership</h2>
          <p>
            Premium access is granted as a perpetual, one-time lifetime entitlement priced at ₹30 INR for Indian residents and $1 USD internationally.
            There are no recurring subscription charges, renewals, or hidden termination clauses. Entitlements are tied to the registered user account.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">3. Academic & Educational Citation</h2>
          <p>
            Content, biometrics, and research profiles may be cited for academic publications, classroom education, conservation planning, and journalism with standard attribution to &ldquo;Wildlife Atlas&rdquo; and the corresponding DOI literature citations.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">4. Disclaimer of Biological Completeness</h2>
          <p>
            Nature is vast and evolving. Millions of species remain undescribed by science. Wildlife Atlas never represents itself as having completely documented every organism on Earth. Missing or unavailable data reflects empirical boundaries in current scientific literature.
          </p>
        </section>
      </div>
    </div>
  );
}

