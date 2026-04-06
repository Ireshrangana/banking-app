import { NextRequest, NextResponse } from "next/server";

import { createTransferAction } from "@/actions/banking";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const result = await createTransferAction(payload);

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
