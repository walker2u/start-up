import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const token = cookies().get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const publicKey = await AuthService.verifySession(token);
    return NextResponse.json({ user: publicKey });
  } catch (error) {
    // Clear invalid token
    cookies().delete("session_token");
    return NextResponse.json({ user: null });
  }
}
