import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { AccountOverview } from "@/components/dashboard/account-overview";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { getDashboardDataAction } from "@/actions/banking";

export default async function DashboardPage() {
  const data = await getDashboardDataAction();

  return (
    <div className="space-y-4">
      <StatsGrid metrics={data.metrics} />
      <AccountOverview accounts={data.accounts} />
      <AnalyticsChart incomeVsExpenses={data.incomeVsExpenses} spending={data.spending} />
      <RecentTransactions transactions={data.transactions} />
    </div>
  );
}
