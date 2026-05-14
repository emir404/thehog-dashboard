"use client";

import { useState } from "react";
import { Calendar } from "@phosphor-icons/react";
import { ContentShell } from "../components/ContentShell";
import { SectionTitle } from "../components/SectionTitle";
import { Card } from "../components/Card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { motion } from "motion/react";
import { cn } from "@/app/lib/utils";
import { creditPackages, customCheckoutBase, invoices } from "../lib/data";

export default function ApiBillingPage() {
  const [customAmount, setCustomAmount] = useState("");

  const goToStripe = (url: string) => {
    window.location.assign(url);
  };

  const handlePayCustom = () => {
    const amount = customAmount.trim();
    if (!amount) return;
    goToStripe(`${customCheckoutBase}?amount=${encodeURIComponent(amount)}`);
  };

  return (
    <ContentShell variant="wide">
      <header className="flex flex-col gap-2.5">
        <h1 className="text-metric-lg text-text">API Billing</h1>
        <p className="text-body text-text-muted">
          Manage your plan, payment method, and invoices.
        </p>
      </header>

      {/* Top KPI row */}
      <section className="grid grid-cols-2 gap-4" style={{ height: 180 }}>
        <Card className="p-5 flex flex-col justify-between" height={180}>
          <span className="text-sm font-medium text-text-muted">
            Available credits
          </span>
          <div className="flex flex-col gap-4">
            <span className="text-metric-lg text-text">$120.42</span>
            <div className="flex items-center gap-1.5">
              <Calendar
                size={14}
                weight="regular"
                className="text-text-muted"
              />
              <span className="text-caption text-text-muted">
                Available until May 28
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between" height={180}>
          <span className="text-sm font-medium text-text-muted">
            Spent (period)
          </span>
          <div className="flex flex-col gap-4">
            <span className="text-metric-lg text-text">$1,203.30</span>
            <span className="text-caption text-text-muted">
              Recorded credit spend for the usage period (ledger).
            </span>
          </div>
        </Card>
      </section>

      {/* Add credits */}
      <section className="flex flex-col gap-5">
        <SectionTitle>Add credits</SectionTitle>
        <div className="grid grid-cols-5 gap-3" style={{ height: 108 }}>
          {creditPackages.map((pkg) => (
            <motion.button
              key={pkg.name}
              type="button"
              onClick={() => goToStripe(pkg.buyLink)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between text-left cursor-pointer hover:border-primary/30 [transition-property:border-color,background-color] [transition-duration:150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <span className="text-sm font-medium text-text-muted">
                {pkg.name}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-metric font-semibold text-text">
                  {pkg.price}
                </span>
                <span className="text-sm font-medium text-text-subtle">
                  {pkg.credits}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* or divider */}
        <div className="relative h-4">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border-default" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-4 py-1.5">
            <span className="text-sm font-medium text-text-muted">or</span>
          </div>
        </div>

        {/* Custom amount */}
        <div className="flex items-end gap-2">
          <div className="flex-1 flex flex-col gap-3">
            <label
              htmlFor="custom-amount"
              className="text-sm font-medium text-text-muted"
            >
              Custom USD (whole $)
            </label>
            <Input
              id="custom-amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="e.g. 25"
              inputMode="numeric"
              className="h-[46px] rounded-2xl px-4 py-0"
            />
          </div>
          <Button
            type="button"
            variant="subtle"
            onClick={handlePayCustom}
            disabled={!customAmount.trim()}
            className="h-[46px] rounded-2xl border border-primary/10 px-4"
          >
            Pay amount
          </Button>
        </div>
      </section>

      {/* Invoices */}
      <section className="flex flex-col gap-5">
        <SectionTitle>Invoices</SectionTitle>
        <div className="bg-surface border border-border-default rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv, i) => (
                <TableRow
                  key={inv.name}
                  className={
                    i === invoices.length - 1 ? "border-b-0" : undefined
                  }
                >
                  <TableCell>{inv.name}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell
                    className={cn(
                      inv.status === "Failed" ? "text-error" : "text-text",
                    )}
                  >
                    {inv.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </ContentShell>
  );
}
