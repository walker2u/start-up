import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import nacl from "tweetnacl";
import bs58 from "bs58";

export async function POST(req: NextRequest) {
  try {
    const { publicKey, signature, message } = await req.json();
    if (!publicKey || !signature || !message) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const session = await getSession();
    const nonce = session.nonce;
    const expires = session.expires;

    if (!nonce || !expires || expires < Date.now()) {
      return NextResponse.json({ error: "Invalid nonce." }, { status: 400 });
    }
    const expectedMessage = `Sign this message to log into CryptoBee. \n\nNonce : ${nonce}`;

    if (message !== expectedMessage) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const messageBytes = new TextEncoder().encode(message);
    const publicKeyBytes = bs58.decode(publicKey);
    const signatureBytes = bs58.decode(signature);

    const isVerified = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    if (!isVerified) {
      return NextResponse.json(
        { error: "Invalid signature." },
        { status: 400 }
      );
    }
    session.nonce = undefined;
    session.expires = undefined;

    session.user = {
      publicKey,
      isAuthenticated: true,
    };
    await session.save();

    return NextResponse.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Error while login!", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
