import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode
} from "plaid";

import { env, hasPlaidEnv } from "@/lib/env";

const plaidEnv = PlaidEnvironments[env.plaid.env as keyof typeof PlaidEnvironments];

export function getPlaidClient() {
  if (!hasPlaidEnv) return null;

  const config = new Configuration({
    basePath: plaidEnv,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": env.plaid.clientId,
        "PLAID-SECRET": env.plaid.secret
      }
    }
  });

  return new PlaidApi(config);
}

export async function createPlaidLinkToken(userId: string) {
  const client = getPlaidClient();
  if (!client) {
    return { link_token: "demo-link-token", expiration: new Date().toISOString() };
  }

  const response = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: "Banking App",
    products: env.plaid.products as Products[],
    country_codes: env.plaid.countries as CountryCode[],
    language: "en"
  });

  return response.data;
}

export async function exchangePublicToken(publicToken: string) {
  const client = getPlaidClient();
  if (!client) {
    return {
      access_token: "demo-access-token",
      item_id: "demo-item-id"
    };
  }

  const response = await client.itemPublicTokenExchange({ public_token: publicToken });
  return response.data;
}
