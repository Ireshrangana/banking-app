"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2 } from "lucide-react";
import { usePlaidLink } from "react-plaid-link";

import { Button } from "@/components/ui/button";

type LinkTokenResponse = {
  link_token?: string;
  error?: string;
};

export function ConnectBankButton() {
  const router = useRouter();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/create-link-token", { method: "POST" });
        const data = (await response.json()) as LinkTokenResponse;

        if (data.link_token) {
          setLinkToken(data.link_token);
        } else {
          setMessage(data.error || "Unable to initialize Plaid Link.");
        }
      } catch {
        setMessage("Unable to initialize Plaid Link.");
      }
    };

    void createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken) => {
      const response = await fetch("/api/plaid/exchange-public-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ publicToken })
      });
      const result = (await response.json()) as { success: boolean; message: string };
      setMessage(result.message);
      if (result.success) {
        router.refresh();
      }
    }
  });

  return (
    <div className="flex flex-col items-end gap-2">
      <Button variant="secondary" onClick={() => open()} disabled={!ready || !linkToken}>
        <Link2 className="mr-2 h-4 w-4" />
        {ready ? "Connect account" : "Preparing Plaid..."}
      </Button>
      {message ? <p className="text-xs text-slate-300">{message}</p> : null}
    </div>
  );
}
