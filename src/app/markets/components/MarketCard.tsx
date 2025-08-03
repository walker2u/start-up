"use client";

import React from "react";
import Image from "next/image";
import { Market } from "@/types";
import { OutcomeButton } from "./OutcomeButton";

interface MarketCardProps {
  market: Market;
}

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
          <OutcomeButton
            key={outcome.name}
            outcome={outcome}
            marketId={market.id}
          />
        ))}
      </div>
    </div>
  );
};
