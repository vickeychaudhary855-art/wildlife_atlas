"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, TreePine, X, User, Crown, Shield } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useAuth } from "@/lib/auth/AuthContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16",
        "border-b border-sage-200/60 dark:border-sage-800/50",
        "bg-parchment-50/80 backdrop-blur-lg dark:bg-forest-950/80"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <TreePine className="h-6 w-6 text-forest-600 dark:text-forest-400" />
          <span className="text-lg font-bold tracking-tight text-forest-800 dark:text-forest-200">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium text-sage-700 dark:text-sage-300",
                "transition-colors hover:text-forest-700 dark:hover:text-forest-300"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-forest-500/10 text-forest-700 dark:text-forest-300 border border-forest-500/20 flex items-center gap-1 hover:bg-forest-500/20 transition-colors ml-2"
            >
              <Shield className="w-3.5 h-3.5 text-forest-600" />
              <span>Admin Portal</span>
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg",
              "text-sage-600 transition-colors",
              "hover:bg-sage-100 hover:text-forest-700",
              "dark:text-sage-400 dark:hover:bg-forest-900 dark:hover:text-forest-300"
            )}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Profile or Sign In */}
          {user ? (
            <Link
              href="/account"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors",
                user.isLifetimePremium
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                  : "bg-[var(--card-bg)] text-foreground border-[var(--card-border)] hover:bg-forest-500/10"
              )}
            >
              {user.isLifetimePremium ? (
                <Crown className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <User className="w-3.5 h-3.5 text-forest-600" />
              )}
              <span className="truncate max-w-[120px]">{user.name.split(" ")[0]}</span>
              {user.isLifetimePremium && (
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500 text-black font-extrabold uppercase">
                  PRO
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                "hidden sm:inline-flex items-center justify-center rounded-lg px-3 py-2",
                "text-sm font-medium text-sage-700 transition-colors",
                "hover:bg-sage-100 hover:text-forest-700",
                "dark:text-sage-300 dark:hover:bg-forest-900 dark:hover:text-forest-300"
              )}
            >
              Sign In
            </Link>
          )}

          {/* Premium CTA Button if not already premium */}
          {!user?.isLifetimePremium && (
            <Link
              href="/membership"
              className={cn(
                "inline-flex items-center justify-center rounded-lg px-3.5 py-2",
                "text-xs font-semibold text-forest-950 shadow-sm",
                "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500",
                "hover:brightness-105 active:brightness-95 transition-all"
              )}
            >
              Get Premium (₹30 / $1)
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className={cn(
              "inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg",
              "text-sage-600 hover:bg-sage-100 dark:text-sage-400 dark:hover:bg-forest-900"
            )}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-sage-200/60 dark:border-sage-800/50 bg-parchment-50 dark:bg-forest-950 px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-sage-800 dark:text-sage-200 hover:bg-sage-100 dark:hover:bg-forest-900"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-forest-700 dark:text-forest-300 hover:bg-forest-500/10"
            >
              Admin Portal
            </Link>
          )}
          <div className="pt-2 border-t border-[var(--card-border)] flex flex-col gap-2">
            {user ? (
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <User className="w-4 h-4 text-forest-600" />
                <span>Account ({user.name})</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-foreground"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/membership"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-black text-center text-xs font-bold"
            >
              Get Lifetime Premium (₹30 / $1)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
