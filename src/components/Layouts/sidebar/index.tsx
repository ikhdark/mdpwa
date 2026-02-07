"use client";

import { usePathname } from "next/navigation";
import { NAV_DATA } from "./data";
import MenuItem from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarContext();
  const pathname = usePathname();

  return (
    <>
      {/* mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed md:static
          left-0 top-0 z-50
          w-72 h-dvh
          bg-white
          border-r border-slate-200
          overflow-y-auto
          transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4 space-y-6">
          {NAV_DATA.map((group) => (
            <div key={group.label}>
              {/* ✅ bold + underline divider */}
              <p className="px-4 mb-3 pb-2 text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-400">
                {group.label}
              </p>

              <div className="space-y-1 mt-2">
                {group.items.map((item) => {
                  const href: string = item.url || `/${item.path || ""}`;
                  const active = !!item.path && pathname === href;

                  return (
                    <MenuItem
                      key={item.title}
                      href={href}
                      isActive={active}
                      onClick={closeSidebar}
                    >
                      {item.title}
                    </MenuItem>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}