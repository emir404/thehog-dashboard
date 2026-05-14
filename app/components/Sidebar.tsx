"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CaretDoubleLeft,
  CaretDoubleRight,
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
import { cn } from "@/app/lib/utils";
import { credits } from "@/app/lib/data";
import { ThemeToggle } from "./ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  mirrored?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
};

const STORAGE_KEY = "sb";
const CHANGE_EVENT = "sb:change";

const SIDEBAR_EASE = "cubic-bezier(0.32,0.72,0,1)";
const SIDEBAR_DUR = "320ms";
const LABEL_OUT_DUR = "140ms";
const LABEL_IN_DUR = "260ms";
const LABEL_IN_DELAY = "100ms";

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

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getSnapshot() {
  return document.documentElement.dataset.sidebar === "collapsed";
}

function getServerSnapshot() {
  return false;
}

function setCollapsed(collapsed: boolean) {
  if (collapsed) {
    document.documentElement.dataset.sidebar = "collapsed";
    try {
      localStorage.setItem(STORAGE_KEY, "collapsed");
    } catch {}
  } else {
    delete document.documentElement.dataset.sidebar;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Reveals an inline label that fades + slides in when the sidebar expands.
 * Width is left to flex/intrinsic, with overflow-hidden on the parent clipping
 * the label during the width transition — no width animation needed.
 */
function Label({
  collapsed,
  className,
  children,
}: {
  collapsed: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden={collapsed}
      style={{
        transitionProperty: "opacity, transform",
        transitionTimingFunction: SIDEBAR_EASE,
        transitionDuration: collapsed ? LABEL_OUT_DUR : LABEL_IN_DUR,
        transitionDelay: collapsed ? "0ms" : LABEL_IN_DELAY,
      }}
      className={cn(
        "whitespace-nowrap",
        collapsed
          ? "opacity-0 -translate-x-1 pointer-events-none"
          : "opacity-100 translate-x-0",
        className,
      )}
    >
      {children}
    </span>
  );
}

function NavRow({
  item,
  pathname,
  collapsed,
  compact,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  compact?: boolean;
}) {
  const Icon = item.icon;
  const active = isActive(pathname, item.href);

  const content = (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center gap-2.5 rounded-lg px-3 overflow-hidden",
        "[transition-property:background-color,color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
        "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        compact ? "py-2" : "py-2.5",
        active
          ? "bg-primary/10 text-primary-pressed"
          : "text-text-muted hover:bg-surface-hover hover:text-text",
      )}
    >
      <Icon size={16} weight="bold" className="shrink-0" />
      <Label collapsed={collapsed} className="text-sm font-medium leading-none">
        {item.label}
      </Label>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }
  return content;
}

function ToggleButton({
  collapsed,
  className,
}: {
  collapsed: boolean;
  className?: string;
}) {
  const Icon = collapsed ? CaretDoubleRight : CaretDoubleLeft;
  return (
    <button
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "relative text-text-muted hover:text-text rounded inline-flex items-center justify-center cursor-pointer shrink-0",
        "[transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
        "active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-10 before:content-['']",
        className,
      )}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <Icon size={18} weight="bold" />
    </button>
  );
}

export function Sidebar() {
  const collapsed = useSidebarCollapsed();
  const pathname = usePathname() ?? "/";

  return (
    <aside
      style={{
        width: collapsed ? 72 : 260,
        transitionProperty: "width",
        transitionDuration: SIDEBAR_DUR,
        transitionTimingFunction: SIDEBAR_EASE,
      }}
      className="shrink-0 h-screen sticky top-0 flex flex-col gap-6 p-4 overflow-hidden will-change-[width]"
    >
      {/* Workspace switcher */}
      <button
        type="button"
        aria-label="Switch workspace"
        className={cn(
          "relative flex items-center gap-3 p-2 -mx-1 rounded-md cursor-pointer overflow-hidden",
          "hover:bg-surface-hover",
          "[transition-property:background-color,color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
          "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        )}
      >
        <span className="text-xl leading-none shrink-0" aria-hidden>
          🐗
        </span>
        <Label collapsed={collapsed} className="flex items-center gap-1">
          <span className="text-h2 text-text">Personal</span>
          <CaretUpDown size={18} weight="bold" className="text-text-muted" />
        </Label>
      </button>

      {/* Main nav */}
      <nav className="flex flex-col gap-1.5 flex-1 min-h-0">
        {mainNav.map((item) => (
          <NavRow
            key={item.href}
            item={item}
            pathname={pathname}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Credits card */}
      <div
        aria-hidden={collapsed}
        style={{
          transitionProperty: "height, opacity, transform, margin",
          transitionTimingFunction: SIDEBAR_EASE,
          transitionDuration: collapsed ? "220ms" : "300ms",
          transitionDelay: collapsed ? "0ms" : "60ms",
        }}
        className={cn(
          "relative bg-primary/5 rounded-2xl overflow-hidden shrink-0",
          collapsed
            ? "h-0 opacity-0 -translate-y-1 pointer-events-none -mb-6"
            : "h-[100px] opacity-100 translate-y-0 mb-0",
        )}
      >
        <div className="p-3 h-[100px] flex flex-col justify-between min-w-[180px]">
          <span className="text-sm font-medium text-primary-pressed/80 whitespace-nowrap">
            Credits
          </span>
          <span className="text-metric-lg text-primary-pressed whitespace-nowrap">
            {credits.balance}
          </span>
        </div>
        <Link
          href="/api-billing"
          tabIndex={collapsed ? -1 : 0}
          className={cn(
            "absolute right-1.5 top-1.5 inline-flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-[11px]",
            "border border-primary-pressed/20 text-caption-strong text-primary-pressed/80",
            "hover:bg-surface/60 hover:text-primary-pressed",
            "[transition-property:background-color,color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
            "active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          )}
        >
          <Plus size={12} weight="bold" />
          Top up
        </Link>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-3">
        <nav className="flex flex-col gap-2">
          {utilityNav.map((item) => (
            <NavRow
              key={item.href}
              item={item}
              pathname={pathname}
              collapsed={collapsed}
              compact
            />
          ))}
        </nav>

        {/* User card — single layout that morphs via padding + opacity */}
        <div
          style={{
            transitionProperty: "padding",
            transitionDuration: SIDEBAR_DUR,
            transitionTimingFunction: SIDEBAR_EASE,
          }}
          className={cn(
            "relative flex items-center gap-3 rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,0.03)] overflow-hidden py-3",
            collapsed ? "px-1" : "px-3",
          )}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              role="img"
              aria-label="Emir Ayaz avatar"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-pressed shrink-0"
            />
            <Label collapsed={collapsed} className="flex flex-col gap-1 min-w-0">
              <span className="text-sm font-medium text-text-muted truncate">
                Emir Ayaz
              </span>
              <span className="text-caption text-text-subtle">Pro</span>
            </Label>
          </div>
          <div
            aria-hidden={collapsed}
            style={{
              transitionProperty: "opacity, transform",
              transitionTimingFunction: SIDEBAR_EASE,
              transitionDuration: collapsed ? LABEL_OUT_DUR : LABEL_IN_DUR,
              transitionDelay: collapsed ? "0ms" : LABEL_IN_DELAY,
            }}
            className={cn(
              "flex items-center gap-1 shrink-0",
              collapsed
                ? "opacity-0 translate-x-2 pointer-events-none"
                : "opacity-100 translate-x-0",
            )}
          >
            <ThemeToggle />
            <ToggleButton collapsed={collapsed} />
          </div>

          {/* Collapsed-state expand affordance: full-card click target.
              Sits behind the avatar so the avatar reads normally, but covers
              the empty area when collapsed. */}
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            tabIndex={collapsed ? 0 : -1}
            style={{
              transitionProperty: "opacity",
              transitionDuration: collapsed ? "200ms" : "120ms",
              transitionTimingFunction: SIDEBAR_EASE,
              transitionDelay: collapsed ? "120ms" : "0ms",
            }}
            className={cn(
              "absolute inset-0 rounded-lg cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              collapsed ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          />
        </div>
      </div>
    </aside>
  );
}

function useSidebarCollapsed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
