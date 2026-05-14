"use client";

import {
  BookOpen,
  CaretDoubleLeft,
  CaretUpDown,
  ChartLine,
  Gear,
  House,
  Key,
  Plus,
  Question,
  Receipt,
  Wallet,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  mirrored?: boolean;
};
type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
};

const mainNav: NavItem[] = [
  { label: "Home", href: "/", icon: House },
  { label: "Credentials", href: "/credentials", icon: Key },
  { label: "Usage", href: "/usage", icon: ChartLine },
  { label: "Spending", href: "/spending", icon: Wallet },
  { label: "API Billing", href: "/api-billing", icon: Receipt },
  { label: "How to use", href: "/docs", icon: BookOpen },
];

const utilityNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Gear },
  { label: "Help", href: "/help", icon: Question },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavRow({
  item,
  pathname,
  compact,
}: {
  item: NavItem;
  pathname: string;
  compact?: boolean;
}) {
  const Icon = item.icon;
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      className={[
        "flex items-center gap-2.5 px-3 rounded-lg transition-colors",
        compact ? "py-2" : "py-2.5",
        active
          ? "bg-primary/10 text-primary-pressed"
          : "text-text-muted hover:bg-nav-bg-hover hover:text-text",
      ].join(" ")}
    >
      <Icon size={16} weight="regular" />
      <span className="text-body-strong">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname() ?? "/";
  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 bg-sidebar-bg flex flex-col gap-6 p-4">
      <div className="flex items-start gap-3 p-2">
        <span className="text-xl leading-none" aria-hidden>
          🐗
        </span>
        <div className="flex items-center gap-1">
          <span className="text-h2 text-text">Personal</span>
          <button
            type="button"
            className="text-text-muted hover:text-text p-0.5 -m-0.5 rounded transition-colors"
            aria-label="Switch workspace"
          >
            <CaretUpDown size={18} weight="regular" />
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1 min-h-0">
        {mainNav.map((item) => (
          <NavRow key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="relative bg-primary/5 rounded-2xl p-3 h-[100px] flex flex-col justify-between">
        <span className="text-body-strong text-primary-pressed/80">
          Credits
        </span>
        <span className="text-metric-lg text-primary-pressed">$120.42</span>
        <button
          type="button"
          className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-[11px] border border-primary-pressed/20 text-caption-strong text-primary-pressed/80 hover:bg-white/40 transition-colors"
        >
          <Plus size={12} weight="bold" />
          Top up
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <nav className="flex flex-col gap-2">
          {utilityNav.map((item) => (
            <NavRow
              key={item.href}
              item={item}
              pathname={pathname}
              compact
            />
          ))}
        </nav>

        <div className="flex items-center justify-between gap-2 p-3 rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-pressed shrink-0 overflow-hidden" />
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-body-strong text-text-muted truncate">
                Emir Ayaz
              </span>
              <span className="text-caption text-text-subtle">Pro</span>
            </div>
          </div>
          <button
            type="button"
            className="text-text-muted hover:text-text p-0.5 -m-0.5 rounded transition-colors shrink-0"
            aria-label="Collapse sidebar"
          >
            <CaretDoubleLeft size={18} weight="regular" />
          </button>
        </div>
      </div>
    </aside>
  );
}
