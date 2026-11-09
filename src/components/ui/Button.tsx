"use client";

import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-forest-800 text-white hover:bg-forest-700 active:bg-forest-900 dark:bg-forest-600 dark:hover:bg-forest-500 dark:active:bg-forest-700 shadow-sm",
  secondary:
    "border border-sage-300 text-sage-700 bg-transparent hover:bg-sage-50 active:bg-sage-100 dark:border-sage-600 dark:text-sage-300 dark:hover:bg-sage-900 dark:active:bg-sage-800",
  ghost:
    "text-sage-700 bg-transparent hover:bg-sage-100 active:bg-sage-200 dark:text-sage-300 dark:hover:bg-sage-800 dark:active:bg-sage-700",
  premium:
    "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 active:from-amber-700 active:via-yellow-700 active:to-amber-800 shadow-md",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-12 px-6 text-base rounded-lg gap-2.5",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner className="shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
