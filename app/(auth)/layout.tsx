import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.22),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#e2e8f0_100%)] px-4 dark:bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20 dark:opacity-10" />
      <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden lg:block">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-600">Fintech operating system</p>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight text-slate-950 dark:text-white">
            Run cash, accounts, payments, and insights from one polished dashboard.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-300">
            This starter gives you secure auth, Plaid bank linking, Dwolla transfers, and executive-grade analytics in a scalable Next.js stack.
          </p>
        </div>
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
}
