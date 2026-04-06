const parseList = (value: string | undefined, fallback: string[]) =>
  value ? value.split(",").map((entry) => entry.trim()) : fallback;

const demoLoginEnabled = process.env.ENABLE_DEMO_LOGIN === "true";

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  auth: {
    adminEmail: process.env.ADMIN_EMAIL || "",
    adminPassword: process.env.ADMIN_PASSWORD || "",
    adminName: process.env.ADMIN_NAME || "Platform Admin",
    adminEmails: parseList(process.env.ADMIN_EMAILS, process.env.ADMIN_EMAIL ? [process.env.ADMIN_EMAIL] : []),
    userEmail: process.env.USER_EMAIL || "",
    userPassword: process.env.USER_PASSWORD || "",
    userName: process.env.USER_NAME || "Demo User"
  },
  appwrite: {
    endpoint: process.env.APPWRITE_ENDPOINT || "",
    projectId: process.env.APPWRITE_PROJECT_ID || "",
    databaseId: process.env.APPWRITE_DATABASE_ID || "",
    usersCollectionId: process.env.APPWRITE_USERS_COLLECTION_ID || "",
    banksCollectionId: process.env.APPWRITE_BANKS_COLLECTION_ID || "",
    transactionsCollectionId: process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID || "",
    storageBucketId: process.env.APPWRITE_STORAGE_BUCKET_ID || "",
    apiKey: process.env.APPWRITE_API_KEY || ""
  },
  plaid: {
    clientId: process.env.PLAID_CLIENT_ID || "",
    secret: process.env.PLAID_SECRET || "",
    env: process.env.PLAID_ENV || "sandbox",
    products: parseList(process.env.PLAID_PRODUCTS, ["auth", "transactions"]),
    countries: parseList(process.env.PLAID_COUNTRY_CODES, ["US"])
  },
  dwolla: {
    key: process.env.DWOLLA_KEY || "",
    secret: process.env.DWOLLA_SECRET || "",
    env: process.env.DWOLLA_ENV || "sandbox",
    fundingSourceUrl: process.env.DWOLLA_FUNDING_SOURCE_URL || ""
  }
};

export const hasAppwriteEnv = Boolean(
  env.appwrite.endpoint &&
    env.appwrite.projectId &&
    env.appwrite.databaseId &&
    env.appwrite.usersCollectionId &&
    env.appwrite.banksCollectionId &&
    env.appwrite.transactionsCollectionId
);

export const hasPlaidEnv = Boolean(env.plaid.clientId && env.plaid.secret);
export const hasDwollaEnv = Boolean(env.dwolla.key && env.dwolla.secret);
export const hasAppwriteAuthEnv = Boolean(env.appwrite.endpoint && env.appwrite.projectId);
export const allowSeededAuth =
  demoLoginEnabled &&
  Boolean(
    env.auth.adminEmail &&
      env.auth.adminPassword &&
      env.auth.userEmail &&
      env.auth.userPassword
  );
