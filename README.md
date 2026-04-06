# Banking App

Banking App is a production-style fintech dashboard built with Next.js 14, TypeScript, Tailwind CSS, Appwrite, Plaid, and Dwolla-ready service layers. It is designed as a public starter repository for modern online banking dashboards, account aggregation flows, transfers, and analytics.

## Live Demo

- Vercel App: `https://banking-app-kappa-one.vercel.app`

## Demo Login

Demo login can be enabled for local development or controlled staging.

- Set `ENABLE_DEMO_LOGIN=true`
- Configure `ADMIN_*` and `USER_*` values in your environment

Example demo credentials:

- Admin: `admin@example.com` / `strong-demo-password`
- User: `user@example.com` / `strong-demo-password`

Important:

- Do not enable demo login on a public production app unless you intentionally want public test access.
- If you enable it on Vercel, use non-sensitive demo-only accounts and passwords.

## Overview

- Modern banking dashboard with responsive layout
- Role-aware authentication flow with admin and user experiences
- Plaid-ready bank connection endpoints
- Dwolla-ready transfer initiation flow
- Appwrite-ready service modules for auth, data, and storage
- Analytics views for balances, spending, and income vs expenses

## Tech Stack

- Next.js 14 App Router
- React and TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Appwrite
- Plaid
- Dwolla
- Chart.js
- React Hook Form

## Features

- Sign up and sign in flows
- Dashboard with total balance and account overview
- Bank account cards and linked-bank view
- Transaction history with filters and pagination
- Transfer form and secure server-side transfer action
- Analytics charts for spending and cash flow
- Mobile and desktop responsive navigation
- Theme toggle
- Production-style folder organization

## Project Structure

```text
app/
  (auth)/
  (dashboard)/
  api/
actions/
components/
constants/
lib/
pages/
types/
public/
```

## Local Development

1. Clone the repository.
2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Fill in your own local values in `.env.local`.
4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

6. Open `http://localhost:3000`.

## Vercel Readiness

This repository can run on Vercel, but production deployment should use real provider configuration and should not rely on local seeded auth.

- Seeded local demo logins are for development only.
- Production should use Appwrite-backed authentication.
- All secrets must be configured in Vercel environment variables.

## Environment Configuration

This repository includes [.env.example](/Users/iresh/Documents/Banking app/.env.example) with placeholder values only.

Never commit:

- `.env`
- `.env.local`
- production API keys
- banking provider secrets
- customer data
- admin credentials

Required variable groups:

- `NEXT_PUBLIC_APP_URL`
- `ENABLE_DEMO_LOGIN`
- `ADMIN_*`
- `USER_*`
- `APPWRITE_*`
- `PLAID_*`
- `DWOLLA_*`

Recommended production behavior:

- set real `ADMIN_*` and `USER_*` values only if you explicitly want temporary seeded logins outside production
- keep `ENABLE_DEMO_LOGIN=false` for normal production use
- configure Appwrite auth for production sign-in and sign-up
- never rely on placeholder values from `.env.example`

## Security Guidance

- Keep all real credentials in local environment files or your hosting provider's secret manager.
- Do not commit real Appwrite API keys, Plaid secrets, Dwolla secrets, callback secrets, or live banking account identifiers.
- Rotate any credential immediately if it is ever pasted into source control.
- Use sandbox credentials during development and switch to production credentials only in your hosting platform.
- Review [SECURITY.md](/Users/iresh/Documents/Banking app/SECURITY.md) before publishing or deploying.

## Appwrite Setup

Configure an Appwrite project with:

- one project
- one database
- collections for users, bank accounts, and transactions
- optional storage bucket for statements or uploads

Set the corresponding `APPWRITE_*` values in `.env.local` and in your hosting provider settings.

## Plaid Setup

1. Create a Plaid developer account.
2. Start with sandbox mode.
3. Add your `PLAID_CLIENT_ID` and `PLAID_SECRET` to `.env.local`.
4. Configure redirect URLs if your flow requires them.
5. Use the backend routes in [app/api/plaid/create-link-token/route.ts](/Users/iresh/Documents/Banking app/app/api/plaid/create-link-token/route.ts) and [app/api/plaid/exchange-public-token/route.ts](/Users/iresh/Documents/Banking app/app/api/plaid/exchange-public-token/route.ts).

## Dwolla Setup

1. Create a Dwolla developer account.
2. Use sandbox credentials first.
3. Add `DWOLLA_KEY`, `DWOLLA_SECRET`, and `DWOLLA_FUNDING_SOURCE_URL` to `.env.local`.
4. Use the transfer action in [actions/banking.ts](/Users/iresh/Documents/Banking app/actions/banking.ts) and the route in [app/api/dwolla/transfer/route.ts](/Users/iresh/Documents/Banking app/app/api/dwolla/transfer/route.ts).

## Deploying To Live Hosting

This project is ready to deploy to Vercel.

### Vercel Deployment Steps

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. In Vercel, set the framework to Next.js if it is not auto-detected.
4. Add all required environment variables in the Vercel project settings.
5. Set `NEXT_PUBLIC_APP_URL` to your final production domain.
6. Set production callback URLs for Appwrite, Plaid, and Dwolla.
7. Deploy.

### Production Checklist

- Replace any temporary seeded credentials with real secure values in hosting secrets
- Set `NEXT_PUBLIC_APP_URL` to your production domain
- Enable Appwrite email/password auth and confirm production platform domains
- Verify Appwrite platform domains and session settings
- Verify Plaid allowed redirect URIs and webhook configuration
- Verify Dwolla redirect URLs, webhook URLs, and funding source setup
- Review server actions and API routes for authorization rules
- Test sign-in, bank linking, transfers, and analytics in production

### Vercel Environment Variables

Add these in the Vercel dashboard:

- `NEXT_PUBLIC_APP_URL`
- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_USERS_COLLECTION_ID`
- `APPWRITE_BANKS_COLLECTION_ID`
- `APPWRITE_TRANSACTIONS_COLLECTION_ID`
- `APPWRITE_STORAGE_BUCKET_ID`
- `APPWRITE_API_KEY`
- `PLAID_CLIENT_ID`
- `PLAID_SECRET`
- `PLAID_ENV`
- `PLAID_PRODUCTS`
- `PLAID_COUNTRY_CODES`
- `DWOLLA_KEY`
- `DWOLLA_SECRET`
- `DWOLLA_ENV`
- `DWOLLA_FUNDING_SOURCE_URL`

Optional for local or controlled staging only:

- `ENABLE_DEMO_LOGIN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`
- `ADMIN_EMAILS`
- `USER_EMAIL`
- `USER_PASSWORD`
- `USER_NAME`

### Recommended Hosting Notes

- Use Vercel preview deployments for integration testing.
- Use provider sandbox environments before switching to live banking data.
- Add provider webhooks only after your production domain is stable.
- Rotate secrets any time a team member changes or a credential is exposed.

## Public Repository Safety Checklist

Before pushing to GitHub:

- confirm `.env.local` is not tracked
- confirm no real API keys are present in source files
- confirm no private account IDs or webhook secrets are hard-coded
- confirm no customer banking data is stored in the repo
- confirm only placeholder values exist in `.env.example`

## Verification

Run:

```bash
npm run build
npm run typecheck
```

## License

Add your preferred license before publishing publicly.
