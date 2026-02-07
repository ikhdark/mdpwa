"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/forms", label: "Forms" },
  { href: "/community", label: "Community" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        border-t border-surface-200
        bg-white
        backdrop-blur
        pb-safe
      "
    >
      <div className="grid grid-cols-4 text-xs font-medium">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                py-3 text-center transition
                ${active ? "text-brand font-semibold" : "text-gray-500"}
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
