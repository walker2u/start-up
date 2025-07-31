"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../api/auth/AuthProvider";

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
  const { isLoading, isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    if (publicKey && connection) {
      connection.getAccountInfo(publicKey).then((info) => {
        if (info) setBalance(info?.lamports / LAMPORTS_PER_SOL);
      });
    }
  }, [connection, publicKey]);

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
        <div className="flex items-center gap-x-4 text-white">
          {publicKey && (
            <span className="mr-4 mb-4">Balance: {balance.toFixed(2)} SOL</span>
          )}
          <WalletMultiButtonNoSSR />

          {publicKey && !isAuthenticated && (
            <button
              onClick={login}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Signing in..." : "Sign-In to Verify"}
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
