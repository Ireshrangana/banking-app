import { Landmark, ShieldCheck, Zap } from "lucide-react";

import { TransferForm } from "@/components/forms/transfer-form";
import { Card, CardContent } from "@/components/ui/card";

export default function TransferPage() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Secure payment rails",
      description: "Dwolla-backed ACH flows with a server-side transfer initiation path."
    },
    {
      icon: Landmark,
      title: "Account routing ready",
      description: "Designed to work alongside Plaid-linked funding sources and Appwrite records."
    },
    {
      icon: Zap,
      title: "Operational visibility",
      description: "Pending transfers immediately feed the transaction stream and analytics."
    }
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <TransferForm />
      <div className="space-y-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="animate-fade-up">
              <CardContent className="flex gap-4">
                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
