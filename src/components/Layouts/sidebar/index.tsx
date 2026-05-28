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
        className={`fixed left-0 top-0 z-50 h-dvh w-72 overflow-y-auto border-r border-slate-200 bg-white transition-transform md:static ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
      >
        <div className="space-y-6 p-4">
          {NAV_DATA.map((group) => (
            <div key={group.label}>
              {/* ✅ bold + underline divider */}
              <p className="mb-3 border-b border-slate-400 px-4 pb-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                {group.label}
              </p>

              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const href: string = item.url ?? `/${item.path ?? ""}`;
                  const active =
                    item.path !== undefined &&
                    item.path.length > 0 &&
                    pathname === href;

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
