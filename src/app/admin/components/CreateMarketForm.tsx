"use client";
import { Market } from "@/types";
import React, { useState } from "react";

interface CreateMarketFormProps {
  onSubmit: (newMarket: Market) => void;
}

export const CreateMarketForm: React.FC<CreateMarketFormProps> = ({
  onSubmit,
}) => {
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !imageUrl) {
      alert("Please fill all fields");
      return;
    }

    // In a real app, this would be a proper API call.
    // Here, we simulate creating a new market object.
    const newMarket: Market = {
      id: `market-${Date.now()}`, // Simple unique ID
      question,
      imageUrl,
      category: "Price Prediction", // Default category
      volume: 0,
      outcomes: [
        { name: "Yes", price: 0.5, color: "green" },
        { name: "No", price: 0.5, color: "red" },
      ],
    };

    onSubmit(newMarket);
    // Reset form
    setQuestion("");
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col gap-4 mt-8"
    >
      <h3 className="text-xl font-bold">Create New Market</h3>
      <input
        type="text"
        placeholder="Market Question (e.g., Will SOL be above $200...)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="bg-gray-900 p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Image URL (e.g., https://.../solana.png)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="bg-gray-900 p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700"
      >
        Create Market
      </button>
    </form>
  );
};
