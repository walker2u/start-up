import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { publicKey, signature, nonce } = await req.json();

  try {
    const signatureBytes = Uint8Array.from(signature);
    const token = await AuthService.verifySignature(
      publicKey,
      signatureBytes,
      nonce
    );

    // Set HTTP-only cookie
    cookies().set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Authentication failed" },
      { status: 401 }
    );
  }
}
