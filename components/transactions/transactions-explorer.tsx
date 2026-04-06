"use client";

import { useState } from "react";

import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import type { TransactionRecord } from "@/types";

export function TransactionsExplorer({ transactions }: { transactions: TransactionRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <div className="space-y-4">
      <TransactionFilters query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatus} />
      <TransactionsTable transactions={transactions} query={query} status={status} />
    </div>
  );
}
