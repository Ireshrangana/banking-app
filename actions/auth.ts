"use server";

import { ID } from "appwrite";
import { z } from "zod";

import { buildUserProfile, getPublicAppwriteAccount } from "@/lib/appwrite";
import { allowSeededAuth, env, hasAppwriteAuthEnv } from "@/lib/env";
import { createSession, clearSession } from "@/lib/session";
import type { ActionResponse, UserProfile } from "@/types";

const authSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

function getLocalAdminUser(email: string): UserProfile {
  return buildUserProfile({
    id: "admin-local",
    email,
    name: env.auth.adminName
  });
}

function getLocalUser(email: string): UserProfile {
  return buildUserProfile({
    id: "user-local-seeded",
    email,
    name: env.auth.userName
  });
}

export async function signInAction(input: {
  email: string;
  password: string;
}): Promise<ActionResponse<UserProfile>> {
  const parsed = authSchema.pick({ email: true, password: true }).safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0]?.message || "Invalid credentials." };
  }

  const normalizedEmail = input.email.toLowerCase().trim();

  if (allowSeededAuth) {
    if (
      normalizedEmail === env.auth.adminEmail.toLowerCase() &&
      input.password === env.auth.adminPassword
    ) {
      const adminUser = getLocalAdminUser(normalizedEmail);
      await createSession(adminUser);
      return {
        success: true,
        message: "Signed in as admin.",
        data: adminUser
      };
    }

    if (
      normalizedEmail === env.auth.userEmail.toLowerCase() &&
      input.password === env.auth.userPassword
    ) {
      const user = getLocalUser(normalizedEmail);
      await createSession(user);
      return {
        success: true,
        message: "Signed in successfully.",
        data: user
      };
    }
  }

  if (hasAppwriteAuthEnv) {
    try {
      const services = getPublicAppwriteAccount();
      if (!services) throw new Error("Missing Appwrite auth configuration.");

      const session = await services.account.createEmailPasswordSession(normalizedEmail, input.password);
      if (session.secret) {
        services.client.setSession(session.secret);
      }

      const account = await services.account.get();
      const user = buildUserProfile({
        id: account.$id,
        email: account.email,
        name: account.name
      });

      await createSession(user);

      return {
        success: true,
        message: user.role === "admin" ? "Signed in as admin." : "Signed in successfully.",
        data: user
      };
    } catch {
      return {
        success: false,
        message:
          "Invalid email or password. Verify your Appwrite account or your seeded local credentials."
      };
    }
  }

  return {
    success: false,
    message:
      "Authentication is not configured for this environment. Add Appwrite auth settings or enable local seeded credentials only for development."
  };
}

export async function signUpAction(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<ActionResponse<UserProfile>> {
  const parsed = authSchema.extend({
    firstName: z.string().min(2),
    lastName: z.string().min(2)
  }).safeParse(input);

  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0]?.message || "Invalid registration data." };
  }

  const normalizedEmail = input.email.toLowerCase().trim();

  if (hasAppwriteAuthEnv) {
    try {
      const services = getPublicAppwriteAccount();
      if (!services) throw new Error("Missing Appwrite auth configuration.");

      await services.account.create(
        ID.unique(),
        normalizedEmail,
        input.password,
        `${input.firstName} ${input.lastName}`
      );
      const session = await services.account.createEmailPasswordSession(normalizedEmail, input.password);
      if (session.secret) {
        services.client.setSession(session.secret);
      }

      const account = await services.account.get();
      const user = buildUserProfile({
        id: account.$id,
        email: account.email,
        firstName: input.firstName,
        lastName: input.lastName,
        name: account.name
      });

      await createSession(user);

      return {
        success: true,
        message: "Account created successfully.",
        data: user
      };
    } catch {
      return {
        success: false,
        message: "Unable to create Appwrite account. Confirm your project allows email/password sign-ups."
      };
    }
  }

  if (!hasAppwriteAuthEnv) {
    return {
      success: false,
      message:
        "Local signup is disabled without Appwrite auth. Configure Appwrite to allow account creation in deployed environments."
    };
  }

  return {
    success: false,
    message: "Unable to create account in the current environment."
  };
}

export async function signOutAction(): Promise<ActionResponse> {
  await clearSession();
  return { success: true, message: "Signed out." };
}
