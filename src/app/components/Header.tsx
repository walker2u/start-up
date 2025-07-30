"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const WalletMultiButtonNoSSR = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export const Header = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  useEffect(() => {
    const updateBalance = async () => {
      if (!connection || !publicKey) {
        console.warn("Wallet not connected or connection unavailable");
      } else {
        try {
          const accountInfo = await connection.getAccountInfo(publicKey);
          if (accountInfo) {
            setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
          } else {
            throw new Error("Account info not found");
          }
        } catch (error) {
          console.error("Failed to retrieve account info:", error);
        }
      }
    };

    updateBalance();
  }, [connection, publicKey]);

  const handleLogin = async () => {
    if (!publicKey || !signMessage) return;

    try {
      // 1. Get nonce from backend
      const nonceRes = await fetch("/api/auth/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: publicKey.toBase58() }),
      });
      const { nonce } = await nonceRes.json();

      // 2. Sign message with wallet
      const message = `CryptoBee Authentication: ${nonce}`;
      const signature = await signMessage(new TextEncoder().encode(message));

      // 3. Verify signature with backend
      await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          signature: Array.from(signature),
          nonce,
        }),
      });

      // AuthContext will automatically update after successful verification
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 p-4 sm:p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-2">
          <Image
            src="/RedBerryLogo.png"
            alt="Your Company Logo"
            width={120}
            height={40}
            className="h-14 w-auto"
          />
          <span className="text-2xl font-bold text-white">CryptoBee</span>
        </Link>

        <div className="flex items-center gap-3">
          {publicKey && (
            <span className="text-sm bg-gray-800 py-1 px-3 rounded-full">
              Balance: {balance.toFixed(2)} SOL
            </span>
          )}

          {isAuthenticated ? (
            <>
              <span className="text-sm bg-gray-800 py-1 px-3 rounded-full">
                {user?.toBase58().slice(0, 6)}...{user?.toBase58().slice(-4)}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoading || !publicKey}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Signing..." : "Sign In"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
