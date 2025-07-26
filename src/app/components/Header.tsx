"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

// A placeholder function for connecting a wallet.
// You would replace this with your actual wallet connection logic
// using a library like wagmi, ethers.js, or web3-modal.
const handleConnectWallet = () => {
  console.log("Connecting wallet...");
  alert("Connect wallet functionality to be implemented.");
};

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 sm:p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/RedBerryLogo.png"
            alt="Your Company Logo"
            width={120}
            height={40}
            className="h-14 w-auto"
          />
        </Link>
        <Button onClick={handleConnectWallet} color="primary" className="mt-2">
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};
