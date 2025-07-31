import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const nonce = randomBytes(32).toString("hex");
    const now = Date.now();

    session.nonce = nonce;
    session.expires = now + 5 * 60 * 1000;
    await session.save();

    const message = `Sign this message to log into CryptoBee. \n\nNonce : ${nonce}`;
    return NextResponse.json({ message });
  } catch (error) {
    console.error("Nonce generation failed!", error);
    return NextResponse.json({ error: "Could not generate nonce!" });
  }
}
