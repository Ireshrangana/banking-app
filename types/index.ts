export type AuthFormMode = "sign-in" | "sign-up";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
};

export type BankAccount = {
  id: string;
  institution: string;
  mask: string;
  type: string;
  subtype: string;
  balance: number;
  availableBalance: number;
  currency: string;
  color: string;
  lastFour: string;
};

export type TransactionKind = "income" | "expense" | "transfer";

export type TransactionRecord = {
  id: string;
  name: string;
  merchant: string;
  accountId: string;
  accountName: string;
  amount: number;
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
  type: TransactionKind;
};

export type SpendingCategory = {
  category: string;
  amount: number;
};

export type IncomeExpensePoint = {
  month: string;
  income: number;
  expenses: number;
};

export type DashboardMetrics = {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  accountsCount: number;
  pendingTransfers: number;
  notifications: number;
};

export type DashboardData = {
  user: UserProfile;
  accounts: BankAccount[];
  transactions: TransactionRecord[];
  spending: SpendingCategory[];
  incomeVsExpenses: IncomeExpensePoint[];
  metrics: DashboardMetrics;
};

export type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};
