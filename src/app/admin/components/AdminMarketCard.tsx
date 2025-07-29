import React from "react";
import { Market } from "@/types";

interface AdminMarketCardProps {
  market: Market;
  onDelete: (marketId: string) => void;
}

export const AdminMarketCard: React.FC<AdminMarketCardProps> = ({
  market,
  onDelete,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700">
      <p className="text-white">{market.question}</p>
      <button
        onClick={() => onDelete(market.id)}
        className="bg-red-600 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};
