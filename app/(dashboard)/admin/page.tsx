import { redirect } from "next/navigation";
import { Shield, Users, WalletCards } from "lucide-react";

import { getDashboardDataAction } from "@/actions/banking";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/session";
import { formatCurrency } from "@/lib/utils";

export default async function AdminPage() {
  const user = await requireAdmin();
  if (user.role !== "admin") redirect("/dashboard");

  const data = await getDashboardDataAction();

  const panels = [
    {
      title: "Admin session",
      description: `${user.email} is signed in with elevated access.`,
      icon: Shield
    },
    {
      title: "Managed accounts",
      description: `${data.metrics.accountsCount} connected accounts are visible in this workspace.`,
      icon: Users
    },
    {
      title: "Total funds tracked",
      description: formatCurrency(data.metrics.totalBalance),
      icon: WalletCards
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">Restricted</p>
        <h1 className="text-3xl font-semibold tracking-tight">Admin Console</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {panels.map((panel) => {
          const Icon = panel.icon;
          return (
            <Card key={panel.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{panel.title}</CardTitle>
                    <CardDescription>{panel.description}</CardDescription>
                  </div>
                  <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardContent className="space-y-3">
          <p className="font-medium">Role rules</p>
          <p className="text-sm text-muted-foreground">
            Admin access is granted when the signed-in email matches `ADMIN_EMAILS`. The seeded local admin defaults to `admin@example.com`.
          </p>
          <p className="text-sm text-muted-foreground">
            Standard users can sign up and use the banking dashboard, but they are redirected away from this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
