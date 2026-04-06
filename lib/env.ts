const clean = (value: string | undefined) => value?.trim() || "";
const parseList = (value: string | undefined, fallback: string[]) =>
  clean(value) ? clean(value).split(",").map((entry) => entry.trim()) : fallback;

const demoLoginEnabled = clean(process.env.ENABLE_DEMO_LOGIN) === "true";

export const env = {
  appUrl: clean(process.env.NEXT_PUBLIC_APP_URL) || "http://localhost:3000",
  auth: {
    adminEmail: clean(process.env.ADMIN_EMAIL),
    adminPassword: clean(process.env.ADMIN_PASSWORD),
    adminName: clean(process.env.ADMIN_NAME) || "Platform Admin",
    adminEmails: parseList(process.env.ADMIN_EMAILS, clean(process.env.ADMIN_EMAIL) ? [clean(process.env.ADMIN_EMAIL)] : []),
    userEmail: clean(process.env.USER_EMAIL),
    userPassword: clean(process.env.USER_PASSWORD),
    userName: clean(process.env.USER_NAME) || "Demo User"
  },
  appwrite: {
    endpoint: clean(process.env.APPWRITE_ENDPOINT),
    projectId: clean(process.env.APPWRITE_PROJECT_ID),
    databaseId: clean(process.env.APPWRITE_DATABASE_ID),
    usersCollectionId: clean(process.env.APPWRITE_USERS_COLLECTION_ID),
    banksCollectionId: clean(process.env.APPWRITE_BANKS_COLLECTION_ID),
    transactionsCollectionId: clean(process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID),
    storageBucketId: clean(process.env.APPWRITE_STORAGE_BUCKET_ID),
    apiKey: clean(process.env.APPWRITE_API_KEY)
  },
  plaid: {
    clientId: clean(process.env.PLAID_CLIENT_ID),
    secret: clean(process.env.PLAID_SECRET),
    env: clean(process.env.PLAID_ENV) || "sandbox",
    products: parseList(process.env.PLAID_PRODUCTS, ["auth", "transactions"]),
    countries: parseList(process.env.PLAID_COUNTRY_CODES, ["US"])
  },
  dwolla: {
    key: clean(process.env.DWOLLA_KEY),
    secret: clean(process.env.DWOLLA_SECRET),
    env: clean(process.env.DWOLLA_ENV) || "sandbox",
    fundingSourceUrl: clean(process.env.DWOLLA_FUNDING_SOURCE_URL)
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
