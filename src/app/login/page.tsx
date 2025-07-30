"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function LoginPage() {
  const { connect, connectors } = useWallet();
  const { login, isLoading } = useAuth();

  return (
    <div className="relative bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Sign In to CryptoBee
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Connect Wallet
            </button>

            <button
              onClick={login}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? "Signing Message..." : "Sign In"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
