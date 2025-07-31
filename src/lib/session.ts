import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  nonce?: string;
  expires?: number;
  user?: {
    publicKey: string;
    isAuthenticated: boolean;
  };
}

export const sessionOptions: SessionOptions = {
  cookieName: "cryptobee-session",
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
