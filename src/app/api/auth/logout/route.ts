import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ success: true });
}
