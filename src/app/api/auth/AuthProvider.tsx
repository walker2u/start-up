"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, ReactNode, useContext, useState } from "react";
import b58 from "bs58";

interface AuthContextType {
  user: { publicKey: string; isAuthenticated: boolean } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    publicKey: string;
    isAuthenticated: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, signMessage } = useWallet();

  const login = async () => {
    if (!publicKey || !signMessage) {
      alert("Please connect your wallet first.");
      return;
    }
    setIsLoading(true);
    try {
      // 1. nonce gettting
      const nonceRes = await fetch("/api/auth/nonce");
      const { message } = await nonceRes.json();

      //   2. sign msg
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      //   3. verify signature and login
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          signature: b58.encode(signature),
          message: message,
        }),
      });

      const data = await loginRes.json();
      if (data.success) {
        setUser(data.user);
      } else {
        alert("Login failed! Please try again.");
        throw new Error(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Login failed!", error);
      alert("Login failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
