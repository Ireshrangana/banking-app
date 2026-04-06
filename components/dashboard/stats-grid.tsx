import { ArrowDownRight, ArrowUpRight, WalletCards } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { DashboardMetrics } from "@/types";

export function StatsGrid({ metrics }: { metrics: DashboardMetrics }) {
  const items = [
    {
      label: "Total balance",
      value: formatCurrency(metrics.totalBalance),
      icon: WalletCards,
      tone: "text-cyan-600 bg-cyan-500/10"
    },
    {
      label: "Monthly income",
      value: formatCurrency(metrics.monthlyIncome),
      icon: ArrowUpRight,
      tone: "text-emerald-600 bg-emerald-500/10"
    },
    {
      label: "Monthly expenses",
      value: formatCurrency(metrics.monthlyExpenses),
      icon: ArrowDownRight,
      tone: "text-amber-600 bg-amber-500/10"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="animate-fade-up">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <h3 className="mt-3 text-2xl font-semibold">{item.value}</h3>
              </div>
              <div className={`rounded-2xl p-3 ${item.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
