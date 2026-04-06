import type { ReactNode } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { UserProfile } from "@/types";

export function AppShell({
  children,
  user
}: {
  children: ReactNode;
  user: UserProfile;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.16),_transparent_32%),linear-gradient(180deg,_rgba(248,250,252,1)_0%,_rgba(241,245,249,1)_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.22),_transparent_28%),linear-gradient(180deg,_rgba(2,6,23,1)_0%,_rgba(15,23,42,1)_100%)]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[300px_1fr] lg:px-6">
        <div className="hidden lg:block">
          <Sidebar user={user} />
        </div>
        <main className="pb-24 lg:pb-6">
          <div className="rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-950/40 md:p-8">
            <Topbar user={user} />
            {children}
          </div>
        </main>
      </div>
      <MobileNav user={user} />
    </div>
  );
}
