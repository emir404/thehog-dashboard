"use client";

import * as React from "react";
import { CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import type { EndpointRow } from "@/app/lib/data";

type Props = {
  rows: EndpointRow[];
};

export function EndpointTable({ rows }: Props) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggle = (endpoint: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(endpoint)) {
        next.delete(endpoint);
      } else {
        next.add(endpoint);
      }
      return next;
    });
  };

  return (
    <div className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Endpoint</TableHead>
            <TableHead>Calls</TableHead>
            <TableHead>Success</TableHead>
            <TableHead>Avg latency</TableHead>
            <TableHead>P95</TableHead>
            <TableHead className="text-right pr-5">Credits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => {
            const isOpen = expanded.has(row.endpoint);
            const hasBreakdown = !!row.breakdown && row.breakdown.length > 0;
            const isLast = i === rows.length - 1;

            return (
              <React.Fragment key={row.endpoint}>
                <TableRow
                  data-state={isOpen ? "expanded" : undefined}
                  aria-expanded={hasBreakdown ? isOpen : undefined}
                  role={hasBreakdown ? "button" : undefined}
                  tabIndex={hasBreakdown ? 0 : undefined}
                  className={cn(
                    hasBreakdown &&
                      "cursor-pointer select-none focus-visible:outline-none focus-visible:bg-surface-hover/60",
                    isOpen && "bg-surface-subtle/40 hover:bg-surface-subtle/60",
                    !hasBreakdown && isLast && "border-b-0",
                  )}
                  onClick={hasBreakdown ? () => toggle(row.endpoint) : undefined}
                  onKeyDown={
                    hasBreakdown
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggle(row.endpoint);
                          }
                        }
                      : undefined
                  }
                >
                  <TableCell className="text-code text-primary-pressed">
                    <span className="inline-flex items-center gap-2">
                      {hasBreakdown ? (
                        <span
                          aria-hidden
                          className="inline-flex h-5 w-5 items-center justify-center rounded text-text-subtle"
                        >
                          <CaretRight
                            size={12}
                            weight="bold"
                            className={cn(
                              "transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
                              isOpen && "rotate-90",
                            )}
                          />
                        </span>
                      ) : (
                        <span aria-hidden className="inline-block h-5 w-5" />
                      )}
                      {row.endpoint}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">{row.calls}</TableCell>
                  <TableCell className="tabular-nums">{row.success}</TableCell>
                  <TableCell className="tabular-nums">
                    {row.avgLatency}
                  </TableCell>
                  <TableCell className="tabular-nums">{row.p95}</TableCell>
                  <TableCell className="text-right pr-5 tabular-nums">
                    {row.credits}
                  </TableCell>
                </TableRow>

                {hasBreakdown && (
                  <tr className="bg-surface-subtle/40">
                    <td colSpan={6} className="p-0">
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="breakdown"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: {
                                duration: 0.28,
                                ease: [0.2, 0, 0, 1],
                              },
                              opacity: {
                                duration: 0.2,
                                ease: [0.2, 0, 0, 1],
                              },
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <BreakdownPanel row={row} isLast={isLast} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function BreakdownPanel({
  row,
  isLast,
}: {
  row: EndpointRow;
  isLast: boolean;
}) {
  const items = row.breakdown ?? [];

  return (
    <div
      className={cn(
        "px-5 py-4",
        !isLast && "border-b border-border-default",
      )}
    >
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-caption-strong text-text-muted uppercase tracking-wide">
            Cost breakdown
          </span>
          <span className="text-caption text-text-subtle">
            sub-charges that make up {row.endpoint}
          </span>
        </div>
        <span className="text-caption text-text-subtle tabular-nums">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="rounded-xl border border-border-subtle bg-surface overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-6 px-4 py-2.5 border-b border-border-subtle bg-surface-subtle/60">
          <span className="text-caption-strong text-text-muted">Item</span>
          <span className="text-caption-strong text-text-muted text-right">
            Sub-calls
          </span>
          <span className="text-caption-strong text-text-muted text-right">
            Per call
          </span>
          <span className="text-caption-strong text-text-muted text-right min-w-[80px]">
            Credits
          </span>
        </div>
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.22,
              delay: 0.04 + idx * 0.035,
              ease: [0.2, 0, 0, 1],
            }}
            className={cn(
              "grid grid-cols-[1fr_auto_auto_auto] gap-x-6 px-4 py-3 items-baseline",
              idx !== items.length - 1 && "border-b border-border-subtle",
            )}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span
                className={cn(
                  item.label.startsWith("/")
                    ? "text-code-sm text-primary-pressed"
                    : "text-body-strong text-text",
                )}
              >
                {item.label}
              </span>
              {item.description && (
                <span className="text-caption text-text-subtle">
                  {item.description}
                </span>
              )}
            </div>
            <span className="text-body text-text-muted text-right tabular-nums">
              {item.calls}
            </span>
            <span className="text-body text-text-muted text-right tabular-nums">
              {item.unitCredits}
            </span>
            <span className="text-body-strong text-text text-right tabular-nums min-w-[80px]">
              {item.credits}
            </span>
          </motion.div>
        ))}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-6 px-4 py-3 items-baseline border-t border-border-default bg-surface-subtle/40">
          <span className="text-caption-strong text-text">
            Total for {row.endpoint}
          </span>
          <span />
          <span />
          <span className="text-body-strong text-text text-right tabular-nums min-w-[80px]">
            {row.credits}
          </span>
        </div>
      </div>
    </div>
  );
}
