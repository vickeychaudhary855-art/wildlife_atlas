import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        isCenter ? "items-center text-center" : "items-start text-left",
        viewAllHref && !isCenter
          ? "sm:flex-row sm:items-end sm:justify-between"
          : "",
        className
      )}
      {...props}
    >
      <div className={cn(isCenter && "max-w-2xl")}>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-forest-500">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold text-foreground">{heading}</h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-base text-[var(--muted)]">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="shrink-0 text-sm font-medium text-forest-600 transition-colors hover:text-forest-500 hover:underline dark:text-forest-400 dark:hover:text-forest-300"
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
