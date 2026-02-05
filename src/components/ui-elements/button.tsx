"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================= */

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2",
    "text-sm font-medium rounded-md",
    "transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500",
    "disabled:opacity-50 disabled:pointer-events-none"
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-600 text-white hover:bg-emerald-700",
        outline:
          "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
        ghost:
          "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
      },

      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ============================= */

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: ReactNode;
  };

export function Button({
  children,
  icon,
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}
      {children}
    </button>
  );
}