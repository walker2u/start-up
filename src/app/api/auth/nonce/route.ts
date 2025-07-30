import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/services/auth";

export async function POST(req: NextRequest) {
  const { publicKey } = await req.json();

  if (!publicKey) {
    return NextResponse.json(
      { error: "Public key is required" },
      { status: 400 }
    );
  }

  try {
    const nonce = await AuthService.generateNonce(publicKey);
    return NextResponse.json({ nonce });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
