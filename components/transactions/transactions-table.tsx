"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatCurrency, formatDate, paginate } from "@/lib/utils";
import type { TransactionRecord } from "@/types";

function getStatusVariant(status: TransactionRecord["status"]) {
  if (status === "completed") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

export function TransactionsTable({
  transactions,
  query,
  status
}: {
  transactions: TransactionRecord[];
  query: string;
  status: string;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesQuery =
        !query ||
        [transaction.name, transaction.merchant, transaction.category, transaction.accountName]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStatus = status === "all" || transaction.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status, transactions]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = paginate(filtered, Math.min(page, pageCount), pageSize);

  return (
    <div className="rounded-[1.75rem] border border-border/60 bg-card/90 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                </div>
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(transaction.status)}>{transaction.status}</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                <span className={transaction.amount >= 0 ? "text-emerald-600" : ""}>
                  {formatCurrency(transaction.amount)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {pageItems.length} of {filtered.length} transactions
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pageCount}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
