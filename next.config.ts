import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ADMIN_WALLETS: process.env.ADMIN_WALLET_PUBLIC_KEYS,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        port: "",
        pathname: "/logos/**", // This makes it more secure by only allowing images from the /logos/ path
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/commons/thumb/**",
      },
      // You can add more trusted domains here in the future
      // For example, if you use CoinGecko for images:
      // {
      //   protocol: 'https',
      //   hostname: 'assets.coingecko.com',
      //   port: '',
      //   pathname: '/coins/images/**',
      // }
    ],
  },
};

export default nextConfig;
