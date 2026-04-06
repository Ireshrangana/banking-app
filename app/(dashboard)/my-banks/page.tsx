import { Building2 } from "lucide-react";

import { getDashboardDataAction } from "@/actions/banking";
import { ConnectBankButton } from "@/components/dashboard/connect-bank-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default async function MyBanksPage() {
  const data = await getDashboardDataAction();

  return (
    <div className="space-y-4">
      <Card className="animate-fade-up border-none bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-white">Bank connections</CardTitle>
              <CardDescription className="text-slate-300">
                Plaid powers secure account aggregation and live balance sync.
              </CardDescription>
            </div>
            <ConnectBankButton />
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {data.accounts.map((account) => (
          <Card key={account.id} className="animate-fade-up">
            <CardContent className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{account.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.type} • {account.subtype} • •••• {account.lastFour}
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-semibold">{formatCurrency(account.balance, account.currency)}</p>
                <p className="text-sm text-muted-foreground">
                  Available {formatCurrency(account.availableBalance, account.currency)}
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Active
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
