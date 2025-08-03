import { getSession } from "@/lib/session";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const createMarketSchema = z.object({
  question: z
    .string()
    .min(10, "Question Should be at least 10 characters Long!"),
  imageUrl: z.string().url("Please Enter a Valid Url!"),
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is not set");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const user = session.user;

    if (!user || !user.isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const adminWallets = (process.env.ADMIN_WALLET_PUBLIC_KEYS || "").split(
      ","
    );
    if (!adminWallets.includes(user.publicKey)) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const body = await req.json();
    const validationResult = createMarketSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.flatten() },
        { status: 400 }
      );
    }
    const { question, imageUrl } = validationResult.data;

    console.log("[API] Preparing to call the Solana smart contract...");
    //todo real solana contract call

    const simulatedOnChainAddress = `market_pda_${Date.now()}`;
    const simulatedYesTokenMint = `yes_token_${Date.now()}`;
    const simulatedNoTokenMint = `no_token_${Date.now()}`;

    console.log(`[API] Simulating creation:`);
    console.log(`  - Market PDA: ${simulatedOnChainAddress}`);
    console.log(`  - YES Token Mint: ${simulatedYesTokenMint}`);
    console.log(`  - NO Token Mint: ${simulatedNoTokenMint}`);

    const { data: dbData, error: dbError } = await supabase
      .from("markets")
      .insert({
        question,
        image_url: imageUrl,
        onchain_address: simulatedOnChainAddress,
        category: "Price Prediction",
        yes_token_mint: simulatedYesTokenMint,
        no_token_mint: simulatedNoTokenMint,
      })
      .select()
      .single();
    if (dbError) {
      console.error(
        "Database insertion failed after on-chain success:",
        dbError
      );
      throw new Error("Failed to save market to database.");
    }

    console.log("[API] Market saved to database:", dbData);
    return NextResponse.json({ success: true, market: dbData });
  } catch (error) {
    console.error("Error Creating market:", error);
    return NextResponse.json({ error: "Could not create market!" });
  }
}
