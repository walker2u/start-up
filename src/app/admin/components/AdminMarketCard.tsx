import React, { useState } from "react";
import { Market } from "@/types";

interface AdminMarketCardProps {
  market: Market;
  onDelete: (marketId: string) => void;
}

export const AdminMarketCard: React.FC<AdminMarketCardProps> = ({
  market,
  onDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResolve = async (outcome: "Yes" | "No") => {
    if (
      !confirm(
        `Are you sure you want to resolve this market to "${outcome}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/markets/${market.id}/resolve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winningOutcome: outcome,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Resolving market failed.");
      }
      alert(`Successfully resolved market to "${outcome}"!`);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
      <p className="text-white">{market.question}</p>
      <div className="flex gap-2">
        <button
          onClick={() => handleResolve("Yes")}
          disabled={isLoading}
          className="bg-green-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-500"
        >
          Resolve YES
        </button>
        <button
          onClick={() => handleResolve("No")}
          disabled={isLoading}
          className="bg-red-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-500"
        >
          Resolve NO
        </button>
      </div>
    </div>
  );
};
