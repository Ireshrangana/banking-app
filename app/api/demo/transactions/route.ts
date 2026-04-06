import { NextResponse } from "next/server";

import { demoDashboardData } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json(demoDashboardData.transactions);
}
