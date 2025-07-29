"use client";

import React, { ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Header } from "../components/Header"; // We can reuse the main header

const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { publicKey } = useWallet();

  // Fetch the allowlist from environment variables.
  // Note: For client components, we need to expose this via next.config.js
  // Or, preferably, have an API endpoint check this. For simplicity here, we use a trick.
  // In a real app, this check should happen in middleware or an API route for max security.
  const adminWallets = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || "").split(",");

  if (!publicKey || !adminWallets.includes(publicKey.toBase58())) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="text-gray-400 mt-4">
            You do not have permission to view this page. Please connect an
            admin wallet.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <AdminGuard>{children}</AdminGuard>
      </main>
    </div>
  );
}
