import { getDashboardDataAction } from "@/actions/banking";
import { TransactionsExplorer } from "@/components/transactions/transactions-explorer";

export default async function TransactionsPage() {
  const data = await getDashboardDataAction();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">Activity</p>
        <h1 className="text-3xl font-semibold tracking-tight">Transactions</h1>
      </div>
      <TransactionsExplorer transactions={data.transactions} />
    </div>
  );
}
