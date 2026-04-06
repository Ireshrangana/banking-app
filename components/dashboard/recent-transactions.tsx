import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { TransactionRecord } from "@/types";

function statusVariant(status: TransactionRecord["status"]) {
  if (status === "completed") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

export function RecentTransactions({ transactions }: { transactions: TransactionRecord[] }) {
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <div>
          <CardTitle>Recent transactions</CardTitle>
          <CardDescription>Latest activity across all connected bank accounts.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-col gap-3 rounded-3xl border border-border/60 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <p className="font-medium">{transaction.name}</p>
                <Badge variant={statusVariant(transaction.status)}>{transaction.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {transaction.merchant} • {transaction.accountName} • {formatDate(transaction.date)}
              </p>
            </div>
            <p className={`text-lg font-semibold ${transaction.amount >= 0 ? "text-emerald-600" : "text-slate-950 dark:text-white"}`}>
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
