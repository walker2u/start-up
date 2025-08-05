import React from "react";
import { Header } from "../components/Header";
import { MarketCard } from "./components/MarketCard";
import { getActiveMarkets } from "@/lib/markets"; // <-- IMPORT THE NEW FUNCTION

export default async function MarketsPage() {
  // Call the function directly! No more `fetch` or `siteUrl`.
  const markets = await getActiveMarkets();

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Markets</h1>
          <p className="text-gray-400">Bet on the outcomes of crypto events.</p>
        </div>

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
