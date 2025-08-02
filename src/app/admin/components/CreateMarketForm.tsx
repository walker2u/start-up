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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !imageUrl.trim()) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/markets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          imageUrl,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMsg =
          data.error?.fieldErrors?.question?.[0] ||
          data.error?.fieldErrors?.imageUrl?.[0] ||
          data.error ||
          "An unknown error occurred.";
        throw new Error(errorMsg);
      }

      alert("Market created successfully!");
      setQuestion("");
      setImageUrl("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isLoading ? "Creating..." : "Create Market"}
      </button>
    </form>
  );
};
