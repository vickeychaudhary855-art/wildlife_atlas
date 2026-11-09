"use client";

import { useState } from "react";
import { Mail, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Mail className="w-4 h-4" />
          <span>Curatorial & Scientific Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Contact the Taxonomy Board
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)]">
          Submit peer-reviewed errata, dataset integration suggestions, or academic institutional queries.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-xl">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Inquiry Logged Successfully</h2>
            <p className="text-xs text-[var(--muted)] max-w-md mx-auto">
              Thank you, {name}. Your inquiry has been forwarded to the taxonomic review board.
              Our curatorial staff will review your submission against peer-reviewed records.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Your Full Name & Affiliation
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Marcus Bell, Dept. of Zoology"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Academic or Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus.bell@university.edu"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Message / Errata Description / Dataset Proposal
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe taxonomic revision, citation correction, or data source suggestion..."
                className="w-full px-4 py-3 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-forest-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-500 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit Scientific Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

