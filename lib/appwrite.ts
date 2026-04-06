import { Account, Client, Databases, ID, Query } from "appwrite";

import { demoDashboardData } from "@/lib/demo-data";
import { env, hasAppwriteEnv } from "@/lib/env";
import type { DashboardData, UserProfile } from "@/types";

function createClient() {
  const client = new Client();
  client.setEndpoint(env.appwrite.endpoint).setProject(env.appwrite.projectId);
  return client;
}

export function getAppwriteServices() {
  if (!hasAppwriteEnv) return null;

  const client = createClient();
  return {
    client,
    account: new Account(client),
    databases: new Databases(client)
  };
}

export function getPublicAppwriteAccount() {
  if (!env.appwrite.endpoint || !env.appwrite.projectId) return null;

  const client = createClient();
  return {
    client,
    account: new Account(client)
  };
}

export function getRoleFromEmail(email: string): UserProfile["role"] {
  return env.auth.adminEmails.includes(email.toLowerCase()) ? "admin" : "user";
}

export function buildUserProfile(input: {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}): UserProfile {
  const fullName = input.name?.trim();
  const [derivedFirstName = "Northstar", ...rest] = fullName ? fullName.split(" ") : [];
  const derivedLastName = rest.join(" ") || "User";

  return {
    id: input.id,
    email: input.email,
    firstName: input.firstName || derivedFirstName,
    lastName: input.lastName || derivedLastName,
    role: getRoleFromEmail(input.email.toLowerCase())
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const services = getAppwriteServices();
  if (!services) return demoDashboardData;

  try {
    const [users, banks, transactions] = await Promise.all([
      services.databases.listDocuments(
        env.appwrite.databaseId,
        env.appwrite.usersCollectionId,
        [Query.limit(1)]
      ),
      services.databases.listDocuments(env.appwrite.databaseId, env.appwrite.banksCollectionId),
      services.databases.listDocuments(env.appwrite.databaseId, env.appwrite.transactionsCollectionId)
    ]);

    const firstUser = users.documents[0];
    const accountDocs = banks.documents;
    const transactionDocs = transactions.documents;

    const accounts = accountDocs.map((doc) => ({
      id: doc.$id,
      institution: doc.institution,
      mask: doc.mask,
      type: doc.type,
      subtype: doc.subtype,
      balance: doc.balance,
      availableBalance: doc.availableBalance,
      currency: doc.currency || "USD",
      color: doc.color || "from-cyan-500 to-sky-600",
      lastFour: doc.lastFour || doc.mask
    }));

    const mappedTransactions = transactionDocs.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      merchant: doc.merchant,
      accountId: doc.accountId,
      accountName: doc.accountName,
      amount: doc.amount,
      category: doc.category,
      date: doc.date,
      status: doc.status,
      type: doc.type
    }));

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    const monthlyIncome = mappedTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);
    const monthlyExpenses = Math.abs(
      mappedTransactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0)
    );

    return {
      user: {
        id: firstUser?.$id || "user-demo",
        firstName: firstUser?.firstName || demoDashboardData.user.firstName,
        lastName: firstUser?.lastName || demoDashboardData.user.lastName,
        email: firstUser?.email || demoDashboardData.user.email,
        role: getRoleFromEmail((firstUser?.email || demoDashboardData.user.email).toLowerCase())
      },
      accounts,
      transactions: mappedTransactions,
      spending: demoDashboardData.spending,
      incomeVsExpenses: demoDashboardData.incomeVsExpenses,
      metrics: {
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        accountsCount: accounts.length,
        pendingTransfers: mappedTransactions.filter((item) => item.status === "pending").length,
        notifications: demoDashboardData.metrics.notifications
      }
    };
  } catch {
    return demoDashboardData;
  }
}

export async function createMockDocument(collectionId: string, data: Record<string, unknown>) {
  const services = getAppwriteServices();
  if (!services) return { $id: ID.unique(), ...data };

  return services.databases.createDocument(env.appwrite.databaseId, collectionId, ID.unique(), data);
}
