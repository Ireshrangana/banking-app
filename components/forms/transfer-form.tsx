"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { createTransferAction } from "@/actions/banking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type TransferFormValues = {
  sourceUrl: string;
  destinationUrl: string;
  amount: number;
  note: string;
};

export function TransferForm() {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset } = useForm<TransferFormValues>({
    defaultValues: {
      sourceUrl: "https://api-sandbox.dwolla.com/funding-sources/source-demo",
      destinationUrl: "https://api-sandbox.dwolla.com/funding-sources/destination-demo",
      amount: 1250,
      note: "Working capital transfer"
    }
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result = await createTransferAction(values);
      setResponseMessage(result.message);
      if (result.success) reset();
    });
  });

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <div>
          <CardTitle>Send a transfer</CardTitle>
          <CardDescription>Use Dwolla funding sources to move money securely.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <Input {...register("sourceUrl")} placeholder="Source funding source URL" />
          <Input {...register("destinationUrl")} placeholder="Destination funding source URL" />
          <div className="grid gap-4 md:grid-cols-[160px_1fr]">
            <Input {...register("amount", { valueAsNumber: true })} type="number" step="0.01" placeholder="Amount" />
            <Input {...register("note")} placeholder="Transfer note" />
          </div>
          {responseMessage ? <p className="text-sm text-muted-foreground">{responseMessage}</p> : null}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating transfer..." : "Create transfer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
