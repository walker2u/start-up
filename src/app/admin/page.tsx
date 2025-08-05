"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Market } from "@/types";
import { AdminMarketCard } from "./components/AdminMarketCard";
import { CreateMarketForm } from "./components/CreateMarketForm";

export default function AdminPage() {
  // IMPORTANT: We use component state to manage markets.
  // This simulates the database. Changes will reset on refresh.
  const [markets, setMarkets] = useState<Market[]>([]);

  const loadMarkets = useCallback(async () => {
    try {
      const response = await fetch("/api/market");
      if (!response.ok) {
        throw new Error(
          "Failed to fetch markets. Are you logged in with an admin wallet?"
        );
      }
      const data = await response.json();
      setMarkets(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadMarkets();
  }, [loadMarkets]);

  const handleDeleteMarket = (marketId: string) => {
    console.log(
      `DELETING market ${marketId}. In production, this would be an API call.`
    );
    setMarkets((currentMarkets) =>
      currentMarkets.filter((market) => market.id !== marketId)
    );
  };

  const handleCreateMarket = (newMarket: Market) => {
    console.log(
      `CREATING new market: ${newMarket.question}. In production, this would be an API call.`
    );
    setMarkets((currentMarkets) => [newMarket, ...currentMarkets]);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side: Create Form */}
        <div>
          <CreateMarketForm onSubmit={handleCreateMarket} />
        </div>

        {/* Right side: Existing Markets List */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Existing Markets</h2>
          {markets.length > 0 ? (
            markets.map((market) => (
              <AdminMarketCard
                key={market.id}
                market={market}
                onDelete={handleDeleteMarket}
              />
            ))
          ) : (
            <p className="text-gray-500">No markets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
