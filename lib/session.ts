import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { UserProfile } from "@/types";

const SESSION_KEY = "banking-demo-session";

export async function getSessionUser(): Promise<UserProfile | null> {
  const value = cookies().get(SESSION_KEY)?.value;
  if (!value) return null;

  try {
    return JSON.parse(value) as UserProfile;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/dashboard");
  return user;
}

export async function createSession(user: UserProfile) {
  cookies().set(SESSION_KEY, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });
}

export async function clearSession() {
  cookies().delete(SESSION_KEY);
}
