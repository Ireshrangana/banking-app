"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signInAction, signUpAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AuthFormMode } from "@/types";

type FormValues = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export function AuthForm({ mode }: { mode: AuthFormMode }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result =
        mode === "sign-in"
          ? await signInAction({ email: values.email, password: values.password })
          : await signUpAction({
              firstName: values.firstName || "",
              lastName: values.lastName || "",
              email: values.email,
              password: values.password
            });

      setMessage(result.message);

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      }
    });
  });

  return (
    <Card className="w-full max-w-md border-white/20 bg-white/80 shadow-2xl backdrop-blur dark:bg-slate-950/60">
      <CardHeader>
        <div>
          <CardTitle>{mode === "sign-in" ? "Welcome back" : "Create your account"}</CardTitle>
          <CardDescription>
            {mode === "sign-in"
              ? "Sign in to view balances, transfers, and analytics."
              : "Open your modern finance dashboard in a few seconds."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          {mode === "sign-up" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input {...register("firstName")} placeholder="First name" />
              <Input {...register("lastName")} placeholder="Last name" />
            </div>
          ) : null}
          <Input {...register("email")} placeholder="Email address" type="email" />
          <Input {...register("password")} placeholder="Password" type="password" />

          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Processing..." : mode === "sign-in" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          {mode === "sign-in" ? "Need an account?" : "Already have an account?"}{" "}
          <Link className="font-medium text-cyan-600" href={mode === "sign-in" ? "/sign-up" : "/sign-in"}>
            {mode === "sign-in" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
