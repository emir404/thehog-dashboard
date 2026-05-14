"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/app/lib/utils";

const STORAGE_KEY = "th";
const CHANGE_EVENT = "th:change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerSnapshot() {
  return false;
}

function setDark(dark: boolean) {
  if (dark) {
    document.documentElement.dataset.theme = "dark";
    try {
      localStorage.setItem(STORAGE_KEY, "dark");
    } catch {}
  } else {
    delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(STORAGE_KEY, "light");
    } catch {}
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useDarkMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useDarkMode();
  const Icon = dark ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md cursor-pointer text-text-muted hover:text-text [transition-property:color,scale] [transition-duration:150ms] [transition-timing-function:cubic-bezier(0.2,0,0,1)] active:scale-[0.96] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-10 before:content-['']",
        className,
      )}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Icon size={18} weight="bold" />
    </button>
  );
}
