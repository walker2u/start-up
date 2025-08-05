"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

export default function LandingPage() {
  const router = useRouter();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      console.log("Wallet connected, redirecting to /markets...");
      router.push("/markets");
    }
  }, [publicKey, router]);

  if (publicKey) {
    return (
      <div className="relative bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Wallet Connected</h1>
          <p className="text-gray-400 mt-2">Redirecting to markets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-700/20 [mask-image:linear-gradient(to_bottom,white_0,transparent_100%)]"></div>
      <Header />
      <main className="relative z-10 p-4">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
