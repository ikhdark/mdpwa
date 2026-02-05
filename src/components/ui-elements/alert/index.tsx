"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import {
  AlertErrorIcon,
  AlertSuccessIcon,
  AlertWarningIcon,
} from "./icons";

/* ============================= */
/* static styles — avoid cn() inside cva (extra call every render) */
/* ============================= */

const alertVariants = cva(
  "flex items-start gap-3 w-full rounded-lg border p-4 text-sm bg-white dark:bg-gray-900",
  {
    variants: {
      variant: {
        success:
          "border-emerald-200 bg-emerald-50/50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300",

        warning:
          "border-yellow-200 bg-yellow-50/50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300",

        error:
          "border-rose-200 bg-rose-50/50 text-rose-800 dark:border-rose-900 dark:bg-rose-900/20 dark:text-rose-300",
      },
    },
    defaultVariants: {
      variant: "error",
    },
  }
);

/* ============================= */
/* move outside component so it’s not recreated */
/* ============================= */

const ICONS = {
  error: AlertErrorIcon,
  success: AlertSuccessIcon,
  warning: AlertWarningIcon,
} as const;

type AlertProps =
  HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: ReactNode;
    children?: ReactNode;
  };

/* ============================= */
/* component */
/* ============================= */

export function Alert({
  className,
  variant = "error",
  title,
  children,
  ...props
}: AlertProps) {
  const Icon = ICONS[variant ?? "error"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />

      {(title || children) && (
        <div className="space-y-1">
          {title && <div className="font-semibold">{title}</div>}
          {children && <div className="opacity-90">{children}</div>}
        </div>
      )}
    </div>
  );
}