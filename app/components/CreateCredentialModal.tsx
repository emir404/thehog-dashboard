"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type CreateCredentialModalProps = {
  children: React.ReactNode;
};

export function CreateCredentialModal({ children }: CreateCredentialModalProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [env, setEnv] = useState("production");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to credentials API
    setOpen(false);
    setLabel("");
    setEnv("production");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-8">
          <DialogTitle>Create credential</DialogTitle>
          <DialogDescription className="sr-only">
            Generate a new API credential. Choose an environment and provide an
            optional label.
          </DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="cred-label">Label</Label>
              <Input
                id="cred-label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Optional label (e.g. Postman, CI)"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="cred-env">Environment</Label>
              <Select value={env} onValueChange={setEnv}>
                <SelectTrigger id="cred-env">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="qa">QA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Create new credential
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
