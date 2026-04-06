import { NextRequest, NextResponse } from "next/server";

import { linkBankAccountAction } from "@/actions/banking";

export async function POST(request: NextRequest) {
  const { publicToken } = await request.json();
  const result = await linkBankAccountAction(publicToken);

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
