import React from "react";
import { Header } from "../components/Header"; // Re-use the existing header
import { MarketCard } from "./components/MarketCard";
import { mockMarkets } from "./mockData";

export default function MarketsPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Markets</h1>
          <p className="text-gray-400">Bet on the outcomes of crypto events.</p>
        </div>

        {/* In a real app, filters would go here */}
        <div className="mb-8">{/* Placeholder for filter buttons */}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </main>
    </div>
  );
}
