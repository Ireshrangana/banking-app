"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useTransition } from "react";

import { signOutAction } from "@/actions/auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserProfile } from "@/types";

export function Topbar({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Finance command center</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Modern banking, built for daily decisions.
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-border/70 px-4 py-2 text-sm md:block">
          <span className="font-medium">{user.firstName}</span>
          <span className="ml-2 text-muted-foreground">{user.role}</span>
        </div>
        <div className="relative hidden min-w-[260px] md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search transactions or accounts" />
        </div>
        <ThemeToggle />
        <Button
          variant="outline"
          onClick={() =>
            startTransition(async () => {
              await signOutAction();
              router.push("/sign-in");
              router.refresh();
            })
          }
          disabled={isPending}
        >
          {isPending ? "Signing out..." : "Sign out"}
        </Button>
      </div>
    </div>
  );
}
