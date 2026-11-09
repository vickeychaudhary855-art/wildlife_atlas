import { cn } from "@/lib/utils";
import { CONFIDENCE_LABELS } from "@/lib/constants";
import type { ScientificConfidence } from "@/types";
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  HelpCircle,
  XCircle,
  MinusCircle,
} from "lucide-react";

const confidenceIcons: Record<
  ScientificConfidence,
  React.ComponentType<{ className?: string }>
> = {
  verified: CheckCircle,
  estimated: Clock,
  historical: Clock,
  uncertain: AlertTriangle,
  data_unavailable: XCircle,
  not_assessed: MinusCircle,
};

export interface ConfidenceBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  level: ScientificConfidence;
}

export function ConfidenceBadge({
  level,
  className,
  ...props
}: ConfidenceBadgeProps) {
  const info = CONFIDENCE_LABELS[level] ?? {
    label: level,
    color: "bg-gray-100 text-gray-500",
  };

  const Icon = confidenceIcons[level] ?? HelpCircle;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium leading-tight whitespace-nowrap",
        info.color,
        className
      )}
      {...props}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {info.label}
    </span>
  );
}
