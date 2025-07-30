import jwt from "jsonwebtoken";
import { redis } from "@/lib/redis";
import { verifyMessage } from "@solana/web3.js";

const JWT_SECRET = process.env.JWT_SECRET!;
const SESSION_EXPIRY = parseInt(process.env.SESSION_EXPIRY || "604800");

export class AuthService {
  static async generateNonce(publicKey: string): Promise<string> {
    const nonce = Math.floor(Math.random() * 1e9).toString();
    await redis.set(`nonce:${publicKey}`, nonce, 300); // 5 min expiry
    return nonce;
  }

  static async verifySignature(
    publicKey: string,
    signature: Uint8Array,
    nonce: string
  ): Promise<string> {
    // Verify nonce
    const storedNonce = await redis.get(`nonce:${publicKey}`);
    if (storedNonce !== nonce) {
      throw new Error("Invalid nonce");
    }

    // Verify signature
    const message = `CryptoBee Authentication: ${nonce}`;
    const encodedMessage = new TextEncoder().encode(message);

    if (!verifyMessage(publicKey, encodedMessage, signature)) {
      throw new Error("Invalid signature");
    }

    // Create session token
    const token = jwt.sign({ sub: publicKey }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Store session in Redis
    await redis.set(`session:${token}`, publicKey, SESSION_EXPIRY);

    return token;
  }

  static async verifySession(token: string): Promise<string> {
    if (!(await redis.exists(`session:${token}`))) {
      throw new Error("Session expired");
    }

    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    return payload.sub;
  }
}
