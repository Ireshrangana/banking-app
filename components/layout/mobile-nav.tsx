"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { navigation } from "@/constants";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types";

export function MobileNav({ user }: { user: UserProfile }) {
  const pathname = usePathname();
  const items =
    user.role === "admin"
      ? [...navigation, { href: "/admin", label: "Admin", icon: ShieldCheck }]
      : navigation;

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full border border-border/60 bg-background/90 px-3 py-2 shadow-2xl backdrop-blur lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-xs",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
