"use server";

import { z } from "zod";

import { createMockDocument, getDashboardData } from "@/lib/appwrite";
import { env } from "@/lib/env";
import { exchangePublicToken } from "@/lib/plaid";
import { createDwollaTransfer } from "@/lib/dwolla";
import type { ActionResponse } from "@/types";

export async function getDashboardDataAction() {
  return getDashboardData();
}

export async function linkBankAccountAction(publicToken: string): Promise<ActionResponse> {
  if (!publicToken) return { success: false, message: "Missing public token." };

  try {
    const plaidResult = await exchangePublicToken(publicToken);

    await createMockDocument(env.appwrite.banksCollectionId || "demo-banks", {
      institution: "Connected Bank",
      mask: "6789",
      type: "depository",
      subtype: "checking",
      balance: 9200,
      availableBalance: 8900,
      currency: "USD",
      color: "from-cyan-500 to-sky-600",
      lastFour: "6789",
      plaidAccessToken: plaidResult.access_token
    });

    return {
      success: true,
      message: "Bank account connected successfully."
    };
  } catch {
    return {
      success: false,
      message: "Unable to link bank account. Check your Plaid configuration."
    };
  }
}

const transferSchema = z.object({
  sourceUrl: z.string().min(1),
  destinationUrl: z.string().min(1),
  amount: z.coerce.number().positive(),
  note: z.string().min(3)
});

export async function createTransferAction(input: {
  sourceUrl: string;
  destinationUrl: string;
  amount: number;
  note: string;
}): Promise<ActionResponse> {
  const parsed = transferSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message || "Invalid transfer request."
    };
  }

  try {
    await createDwollaTransfer({
      sourceUrl: input.sourceUrl,
      destinationUrl: input.destinationUrl,
      amount: input.amount.toFixed(2)
    });

    await createMockDocument(env.appwrite.transactionsCollectionId || "demo-transactions", {
      name: input.note,
      merchant: "Dwolla transfer",
      accountId: "acc-1",
      accountName: "Northstar Checking",
      amount: -Math.abs(input.amount),
      category: "Transfer",
      date: new Date().toISOString(),
      status: "pending",
      type: "transfer"
    });

    return {
      success: true,
      message: "Transfer created and is processing."
    };
  } catch {
    return {
      success: false,
      message: "Unable to create transfer. Verify Dwolla settings and funding sources."
    };
  }
}
