import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

const BASE =
  "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card";

const HEADER =
  "border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5";

const BODY =
  "p-4 sm:p-6 xl:p-10";

export function ShowcaseSection({ title, children, className }: Props) {
  return (
    <section className={cn(BASE, className)}>
      <h2 className={HEADER}>{title}</h2>
      <div className={BODY}>{children}</div>
    </section>
  );
}