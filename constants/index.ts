import { Bell, CreditCard, Landmark, LayoutDashboard, Send, Wallet } from "lucide-react";

export const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-banks", label: "My Banks", icon: Landmark },
  { href: "/transactions", label: "Transactions", icon: CreditCard },
  { href: "/transfer", label: "Transfer", icon: Send }
];

export const quickStats = [
  { label: "Connected accounts", key: "accounts" },
  { label: "Pending transfers", key: "pendingTransfers" },
  { label: "Monthly notifications", key: "notifications" }
] as const;

export const spendingColors = ["#0891b2", "#14b8a6", "#f59e0b", "#0f172a", "#38bdf8"];

export const incomeExpenseColors = {
  income: "#0891b2",
  expenses: "#0f172a"
};

export const notificationSeed = [
  {
    id: "note-1",
    title: "Transfer completed",
    message: "Payroll move to Main Checking settled successfully.",
    date: "2 min ago"
  },
  {
    id: "note-2",
    title: "Budget insight",
    message: "Dining spend is 12% lower than last month.",
    date: "1 hr ago"
  },
  {
    id: "note-3",
    title: "New bank linked",
    message: "Mercury Savings is ready for analytics sync.",
    date: "Today"
  }
];
