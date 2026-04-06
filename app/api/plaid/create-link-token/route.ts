import { NextResponse } from "next/server";

import { createPlaidLinkToken } from "@/lib/plaid";

export async function POST() {
  try {
    const data = await createPlaidLinkToken("user-demo");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unable to create Plaid link token." }, { status: 500 });
  }
}
