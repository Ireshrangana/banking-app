# Banking App

Banking App is a production-style fintech dashboard built with Next.js 14, TypeScript, Tailwind CSS, Appwrite, Plaid, and Dwolla-ready service layers. It is designed as a public starter repository for modern online banking dashboards, account aggregation flows, transfers, and analytics.

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
- `ADMIN_*`
- `USER_*`
- `APPWRITE_*`
- `PLAID_*`
- `DWOLLA_*`

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
3. Add all required environment variables in the Vercel project settings.
4. Set production callback URLs for Appwrite, Plaid, and Dwolla.
5. Deploy.

### Production Checklist

- Replace demo credentials with real secure values in hosting secrets
- Set `NEXT_PUBLIC_APP_URL` to your production domain
- Verify Appwrite platform domains and session settings
- Verify Plaid allowed redirect URIs and webhook configuration
- Verify Dwolla redirect URLs, webhook URLs, and funding source setup
- Review server actions and API routes for authorization rules
- Test sign-in, bank linking, transfers, and analytics in production

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
