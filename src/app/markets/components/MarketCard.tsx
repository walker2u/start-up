import React from "react";
import Image from "next/image";
import { Market, Outcome } from "@/types";

interface MarketCardProps {
  market: Market;
}

const OutcomeButton: React.FC<{ outcome: Outcome }> = ({ outcome }) => (
  <button
    className={`w-full flex justify-between items-center p-3 rounded-md transition-all ${
      outcome.color === "green"
        ? "bg-green-500/10 hover:bg-green-500/20 text-green-400"
        : "bg-red-500/10 hover:bg-red-500/20 text-red-400"
    }`}
  >
    <span className="font-semibold">{outcome.name}</span>
    <span className="font-bold text-lg text-white">
      ${outcome.price.toFixed(2)}
    </span>
  </button>
);

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 transition-all hover:border-gray-600">
      <div className="flex items-start gap-3">
        <Image
          src={market.imageUrl}
          alt={market.question}
          width={40}
          height={40}
          className="rounded-full bg-gray-700"
        />
        <p className="text-white font-semibold flex-1">{market.question}</p>
      </div>
      <div className="text-sm text-gray-400">
        Volume: ${market.volume.toLocaleString()}
      </div>
      <div className="flex gap-3">
        {market.outcomes.map((outcome) => (
          <OutcomeButton key={outcome.name} outcome={outcome} />
        ))}
      </div>
    </div>
  );
};
