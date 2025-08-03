import { Market } from "@/types";

// Image URLs for popular crypto coins. You can find these online.
const SOLANA_IMAGE_URL = "/solana-sol-logo.png";
const BITCOIN_IMAGE_URL = "/bitcoin-btc-logo.png";
const ETHEREUM_IMAGE_URL = "/ethereum-eth-logo.png";

export const mockMarkets: Market[] = [
  {
    id: "ac8ed01f-0838-46fd-b4b5-c607197b172a",
    question: "Will Solana (SOL) price be above $150 on August 1st, 2025?",
    imageUrl: SOLANA_IMAGE_URL,
    category: "Price Prediction",
    volume: 125000,
    outcomes: [
      { name: "Yes", price: 0.65, color: "green" },
      { name: "No", price: 0.35, color: "red" },
    ],
  },
  {
    id: "2",
    question: "Will Bitcoin (BTC) reach $100,000 by the end of 2025?",
    imageUrl: BITCOIN_IMAGE_URL,
    category: "Price Prediction",
    volume: 750000,
    outcomes: [
      { name: "Yes", price: 0.42, color: "green" },
      { name: "No", price: 0.58, color: "red" },
    ],
  },
  {
    id: "3",
    question:
      "Will Ethereum (ETH) process more transactions than Solana today?",
    imageUrl: ETHEREUM_IMAGE_URL,
    category: "Network Activity",
    volume: 45000,
    outcomes: [
      { name: "Yes", price: 0.21, color: "green" },
      { name: "No", price: 0.79, color: "red" },
    ],
  },
  // Add more mock markets as needed
];
