"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function ChartContainer({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  if (!isClient) return null;
  return <>{children}</>;
}
