// src/lib/markets.ts
import { createClient } from "@supabase/supabase-js";
import { Market } from "@/types";

// NOTE: We are initializing a new client here using the SERVICE key
// because this is secure server-side logic.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// This function contains the logic that used to be in your API route.
export async function getActiveMarkets(): Promise<Market[]> {
  const { data: dbData, error } = await supabase
    .from("markets")
    .select("*")
    .is("resolved_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database error fetching active markets:", error);
    // In a real app, you might want more robust error handling
    throw new Error(error.message);
  }

  if (!dbData) return [];

  // Transform the data to match the frontend's expected shape
  const markets: Market[] = dbData.map((market) => ({
    ...market,
    image_url: market.image_url || "", // Ensure image_url is not null
    outcomes: [
      { name: "Yes", price: 0.5, color: "green" },
      { name: "No", price: 0.5, color: "red" },
    ],
  }));

  return markets;
}
