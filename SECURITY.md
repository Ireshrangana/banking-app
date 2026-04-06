# Security Policy

## Supported Usage

This repository is intended as a starter project. Do not treat the seeded local auth flow or demo data as production-grade security.

## Sensitive Data Rules

Never commit:

- `.env` or `.env.local`
- API keys
- provider secrets
- access tokens
- banking account numbers
- webhook secrets
- customer personal data

## Recommended Secret Storage

Use:

- local environment files for development
- Vercel environment variables for deployment
- Appwrite, Plaid, and Dwolla dashboards for provider-side configuration

## Before Publishing

1. Verify that `.gitignore` excludes local environment files.
2. Replace any demo credentials with placeholders in documentation.
3. Review commit history for pasted secrets.
4. Rotate any credential that was exposed during development.

## Reporting

If you adapt this project for production, establish a private reporting channel for security issues before inviting external users.
