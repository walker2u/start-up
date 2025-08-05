import React from "react";
import { Header } from "../components/Header";
import { MarketCard } from "./components/MarketCard";
import { Market } from "@/types";

async function getMarkets(): Promise<Market[]> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${siteUrl}/api/market`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch markets");
    }

    const markets = await response.json();
    return markets;
  } catch (error) {
    console.error("Error in getMarkets:", error);
    return [];
  }
}

export default async function MarketsPage() {
  const markets = await getMarkets();

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Markets</h1>
          <p className="text-gray-400">Bet on the outcomes of crypto events.</p>
        </div>

        <div className="mb-8">{/* Placeholder for filter buttons */}</div>

        {markets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No active markets found.</p>
        )}
      </main>
    </div>
  );
}
