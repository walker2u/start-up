import { Market } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is not set");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("markets")
      .select("*")
      .is("resolved_at", null)
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (!data) {
      return NextResponse.json([]);
    }
    const markets: Market[] = data.map((market) => {
      return {
        ...market,
        outcomes: [
          { name: "Yes", price: 0.5, color: "green" },
          { name: "No", price: 0.5, color: "red" },
        ],
      };
    });
    return NextResponse.json(markets);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
