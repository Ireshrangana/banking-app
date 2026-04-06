"use client";

import { Input } from "@/components/ui/input";

export function TransactionFilters({
  query,
  status,
  onQueryChange,
  onStatusChange
}: {
  query: string;
  status: string;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-4 rounded-[1.75rem] border border-border/60 bg-card/90 p-4 md:grid-cols-[1fr_180px]">
      <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by merchant, category, or account" />
      <select
        className="h-12 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">All statuses</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  );
}
