import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "bg-sage-100 text-sage-800 dark:bg-sage-800 dark:text-sage-200",
  success:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  warning:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  danger:
    "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  info:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  muted:
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-tight whitespace-nowrap",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
