export interface Outcome {
  name: "Yes" | "No";
  price: number; // A value between 0.01 and 0.99, representing the probability
  color: "green" | "red";
}

export interface Market {
  id: string;
  created_at: string;
  question: string;
  image_url: string;
  category: string;
  volume: number;

  // On-Chain Address Fields (Crucial for interacting with the smart contract)
  onchain_address: string; // The address of the market's on-chain account (PDA)
  yes_token_mint: string; // The address of the "YES" share token mint
  no_token_mint: string; // The address of the "NO" share token mint

  // Resolution Fields (Populated when the market is closed)
  resolved_at: string | null; // A timestamp of when the market was resolved, or null if active
  winning_outcome: "Yes" | "No" | null; // The final outcome, or null if active

  // UI-Specific Fields (Derived or for display purposes)
  // NOTE: In a production app, the `price` within outcomes would be dynamically
  // calculated based on the yes/no pools in the smart contract.
  outcomes: [Outcome, Outcome];
}
