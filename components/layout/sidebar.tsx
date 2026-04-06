"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellRing, ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { navigation, notificationSeed } from "@/constants";
import { cn, initials } from "@/lib/utils";
import type { UserProfile } from "@/types";

export function Sidebar({ user }: { user: UserProfile }) {
  const pathname = usePathname();
  const items =
    user.role === "admin"
      ? [...navigation, { href: "/admin", label: "Admin", icon: ShieldCheck }]
      : navigation;

  return (
    <aside className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-slate-950 p-5 text-slate-100 shadow-2xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
          <Wallet className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-slate-400">Modern Finance</p>
          <h1 className="font-semibold">Banking App</h1>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-3xl bg-white/5 p-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-200">
          {initials(`${user.firstName} ${user.lastName}`)}
        </div>
        <div>
          <p className="font-medium">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all",
                active ? "bg-cyan-500 text-slate-950 shadow-glow" : "text-slate-300 hover:bg-white/5"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-sky-500/10 p-4">
          <div className="mb-3 flex items-center gap-2 text-cyan-200">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm font-medium">Smart insights</p>
          </div>
          <p className="text-sm text-slate-300">
            Cash runway improved by 18 days after recent payouts and spend reduction.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-200">
            <BellRing className="h-4 w-4" />
            Latest alerts
          </div>
          <div className="space-y-3">
            {notificationSeed.slice(0, 2).map((note) => (
              <div key={note.id}>
                <p className="text-sm font-medium text-white">{note.title}</p>
                <p className="text-xs text-slate-400">{note.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
