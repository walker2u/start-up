import { Outcome } from "@/types";
import { useState } from "react";

export const OutcomeButton: React.FC<{
  outcome: Outcome;
  marketId: string;
}> = ({ outcome, marketId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBet = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marketId,
          outcome: outcome.name,
          amount: outcome.price,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Betting failed.");
      }
      alert(`Successfully bet ${outcome.price} SOL on ${outcome.name}!`);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBet}
      disabled={isLoading}
      className={`w-full flex justify-between items-center p-3 rounded-md transition-all disabled:opacity-50 ${
        outcome.color === "green"
          ? "bg-green-500/10 hover:bg-green-500/20 text-green-400"
          : "bg-red-500/10 hover:bg-red-500/20 text-red-400"
      }`}
    >
      <span className="font-semibold">
        {isLoading ? "Placing Bet..." : `Bet ${outcome.name}`}
      </span>
      <span className="font-bold text-lg text-white">
        ${outcome.price.toFixed(2)}
      </span>
    </button>
  );
};
