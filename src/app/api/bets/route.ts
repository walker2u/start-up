import { getSession } from "@/lib/session";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase server environment variables are not set.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Schema to validate incoming bet data
const placeBetSchema = z.object({
  marketId: z.string().uuid(),
  outcome: z.enum(["Yes", "No"]),
  amount: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate the user
    const session = await getSession();
    if (!session.user?.isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const publicKey = session.user.publicKey;

    // 2. Validate the incoming data
    const body = await req.json();
    const validation = placeBetSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten() },
        { status: 400 }
      );
    }
    const { marketId, outcome, amount } = validation.data;

    // 3. === CONCEPTUAL SMART CONTRACT INTERACTION ===
    //todo call real smart contract
    // It would take the user's SOL and mint them the correct share token.
    console.log(
      `[API] User ${publicKey} is placing a bet of ${amount} on '${outcome}' for market ${marketId}`
    );

    // 4. Update the market's volume in the database
    // We use a Postgres function `increment_volume` for this to avoid race conditions.
    const { error: rpcError } = await supabase.rpc("increment_volume", {
      market_id: marketId,
      amount_to_add: amount,
    });

    if (rpcError) {
      console.error("Failed to update volume:", rpcError);
      throw new Error("Could not update market volume.");
    }

    return NextResponse.json({
      success: true,
      message: `Successfully placed bet.`,
    });
  } catch (error) {
    console.error("Betting failed:", error);
    return NextResponse.json(
      { error: "Could not place bet." },
      { status: 500 }
    );
  }
}
