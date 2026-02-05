import type { ReactNode, HTMLAttributes } from "react";

/* ================================= */

const BASE =
  "rounded-lg border border-gray-200 bg-white p-6 shadow-sm overflow-hidden transition dark:border-gray-800 dark:bg-gray-900";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/* ================================= */

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={className ? `${BASE} ${className}` : BASE}
      {...props}
    >
      {children}
    </div>
  );
}