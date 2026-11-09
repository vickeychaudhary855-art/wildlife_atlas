import { cn } from "@/lib/utils";
import { IUCN_LABELS } from "@/lib/constants";
import type { IUCNCategory } from "@/types";

export interface IUCNBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: IUCNCategory;
  /** Show the full label text alongside the category code. Default: true */
  showLabel?: boolean;
}

export function IUCNBadge({
  status,
  showLabel = true,
  className,
  ...props
}: IUCNBadgeProps) {
  const info = IUCN_LABELS[status] ?? {
    label: status,
    color: "bg-gray-400",
    textColor: "text-gray-900",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-tight whitespace-nowrap",
        info.color,
        info.textColor,
        className
      )}
      title={info.label}
      {...props}
    >
      <span className="font-bold">{status}</span>
      {showLabel && (
        <span className="hidden sm:inline">{info.label}</span>
      )}
    </span>
  );
}
