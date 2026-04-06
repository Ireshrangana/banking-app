import { ArrowRightLeft } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { BankAccount } from "@/types";

export function AccountOverview({ accounts }: { accounts: BankAccount[] }) {
  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <div>
          <CardTitle>My banks</CardTitle>
          <CardDescription>Connected accounts synced through Plaid and Appwrite.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 xl:grid-cols-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={`rounded-[1.75rem] bg-gradient-to-br ${account.color} p-5 text-white shadow-xl transition-transform hover:-translate-y-1`}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80">{account.institution}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{account.subtype}</p>
              </div>
              <ArrowRightLeft className="h-5 w-5 text-white/90" />
            </div>
            <p className="mb-3 text-3xl font-semibold">{formatCurrency(account.balance, account.currency)}</p>
            <div className="flex items-end justify-between text-sm text-white/80">
              <span>•••• {account.lastFour}</span>
              <span>Available {formatCurrency(account.availableBalance, account.currency)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
