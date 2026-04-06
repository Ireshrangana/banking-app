import dwolla from "dwolla-v2";

import { env, hasDwollaEnv } from "@/lib/env";

type TransferPayload = {
  sourceUrl: string;
  destinationUrl: string;
  amount: string;
};

export function getDwollaClient() {
  if (!hasDwollaEnv) return null;

  return new dwolla.Client({
    key: env.dwolla.key,
    secret: env.dwolla.secret,
    environment: env.dwolla.env === "production" ? "production" : "sandbox"
  });
}

export async function createDwollaTransfer(payload: TransferPayload) {
  const client = getDwollaClient();

  if (!client) {
    return {
      id: `demo-transfer-${Date.now()}`,
      status: "pending",
      payload
    };
  }

  const response = await client.post("transfers", {
    _links: {
      source: { href: payload.sourceUrl },
      destination: { href: payload.destinationUrl }
    },
    amount: {
      currency: "USD",
      value: payload.amount
    }
  });

  return {
    id: response.headers.get("location"),
    status: "pending"
  };
}
