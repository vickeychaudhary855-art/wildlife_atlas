import React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({
  value,
  label,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-600 dark:bg-forest-900/40 dark:text-forest-400">
          {icon}
        </div>
      )}
      <span className="text-3xl font-bold text-forest-600 dark:text-forest-400 sm:text-4xl">
        {value}
      </span>
      <span className="text-sm text-[var(--muted)]">{label}</span>
    </div>
  );
}
