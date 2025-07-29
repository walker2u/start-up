import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ADMIN_WALLETS: process.env.ADMIN_WALLET_PUBLIC_KEYS,
  },
};

export default nextConfig;
