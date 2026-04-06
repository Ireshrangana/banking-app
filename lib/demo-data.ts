import type { DashboardData } from "@/types";

export const demoDashboardData: DashboardData = {
  user: {
    id: "user-demo",
    firstName: "Avery",
    lastName: "Morgan",
    email: "avery@northstarbank.io",
    role: "user"
  },
  accounts: [
    {
      id: "acc-1",
      institution: "Northstar Checking",
      mask: "1024",
      type: "depository",
      subtype: "checking",
      balance: 18420.55,
      availableBalance: 17560.45,
      currency: "USD",
      color: "from-cyan-500 to-sky-600",
      lastFour: "1024"
    },
    {
      id: "acc-2",
      institution: "Mercury Savings",
      mask: "8891",
      type: "depository",
      subtype: "savings",
      balance: 42680.19,
      availableBalance: 42680.19,
      currency: "USD",
      color: "from-slate-900 to-slate-700",
      lastFour: "8891"
    },
    {
      id: "acc-3",
      institution: "Atlas Business",
      mask: "3328",
      type: "credit",
      subtype: "credit card",
      balance: -2480.1,
      availableBalance: 11400,
      currency: "USD",
      color: "from-emerald-500 to-teal-600",
      lastFour: "3328"
    }
  ],
  transactions: [
    {
      id: "tx-1",
      name: "Stripe payout",
      merchant: "Stripe",
      accountId: "acc-1",
      accountName: "Northstar Checking",
      amount: 4200,
      category: "Income",
      date: "2026-04-05",
      status: "completed",
      type: "income"
    },
    {
      id: "tx-2",
      name: "Office rent",
      merchant: "Urban Spaces",
      accountId: "acc-1",
      accountName: "Northstar Checking",
      amount: -1850,
      category: "Operations",
      date: "2026-04-04",
      status: "completed",
      type: "expense"
    },
    {
      id: "tx-3",
      name: "Coffee with client",
      merchant: "Blue Bottle",
      accountId: "acc-2",
      accountName: "Mercury Savings",
      amount: -34.15,
      category: "Dining",
      date: "2026-04-03",
      status: "completed",
      type: "expense"
    },
    {
      id: "tx-4",
      name: "Payroll reserve",
      merchant: "Internal Transfer",
      accountId: "acc-2",
      accountName: "Mercury Savings",
      amount: -2200,
      category: "Transfer",
      date: "2026-04-03",
      status: "pending",
      type: "transfer"
    },
    {
      id: "tx-5",
      name: "AWS billing",
      merchant: "Amazon Web Services",
      accountId: "acc-1",
      accountName: "Northstar Checking",
      amount: -418.72,
      category: "Infrastructure",
      date: "2026-04-02",
      status: "completed",
      type: "expense"
    },
    {
      id: "tx-6",
      name: "Consulting retainer",
      merchant: "Helix Venture",
      accountId: "acc-1",
      accountName: "Northstar Checking",
      amount: 2800,
      category: "Income",
      date: "2026-04-01",
      status: "completed",
      type: "income"
    }
  ],
  spending: [
    { category: "Operations", amount: 1850 },
    { category: "Infrastructure", amount: 418.72 },
    { category: "Dining", amount: 34.15 },
    { category: "Payroll", amount: 2200 },
    { category: "Travel", amount: 620 }
  ],
  incomeVsExpenses: [
    { month: "Jan", income: 9400, expenses: 5200 },
    { month: "Feb", income: 10200, expenses: 6100 },
    { month: "Mar", income: 11100, expenses: 5900 },
    { month: "Apr", income: 12300, expenses: 6400 }
  ],
  metrics: {
    totalBalance: 58620.64,
    monthlyIncome: 12300,
    monthlyExpenses: 6400,
    accountsCount: 3,
    pendingTransfers: 2,
    notifications: 12
  }
};
