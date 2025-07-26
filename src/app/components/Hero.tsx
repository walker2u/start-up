"use client";
import React from "react";
import { Button } from "./ui/button";
const handlePrimaryAction = () => {
  console.log("Primary action clicked...");
  alert("This will lead to the main betting interface.");
};
export const Hero = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
        Bet on the Future of Crypto.
      </h1>
      <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        The decentralized platform for betting on cryptocurrency markets.
        Connect your wallet and start predicting.
      </p>
      <Button onClick={handlePrimaryAction} size="lg">
        Explore Markets
      </Button>
    </div>
  );
};
