import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/lib/auth/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Wildlife Atlas — Global Animal Encyclopedia",
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-forest-500/20 selection:text-forest-900 dark:selection:text-forest-200">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
