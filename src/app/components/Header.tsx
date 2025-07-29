"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import Image from "next/image";

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
        <div className="text-white">
          {publicKey && <span>Balance: {balance.toFixed(2)} SOL</span>}
        </div>
        <WalletMultiButtonNoSSR />
      </div>
    </header>
  );
};
