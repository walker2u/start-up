import { getSession } from "@/lib/session";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is not set");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ marketId: string }> }
) {
  try {
    const session = await getSession();
    if (!session.user || !session.user.isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const adminWallets = (process.env.ADMIN_WALLET_PUBLIC_KEYS || "").split(
      ","
    );
    if (!adminWallets.includes(session.user.publicKey)) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { winningOutcome } = await req.json();
    const { marketId } = await context.params;

    if (winningOutcome !== "Yes" && winningOutcome !== "No") {
      return NextResponse.json(
        { error: "Invalid winning outcome." },
        { status: 400 }
      );
    }

    // === CONCEPTUAL SMART CONTRACT INTERACTION ===
    // Here you would call on-chain program's `resolve_market` instruction.

    console.log(
      `[API] Admin resolving market ${marketId} to "${winningOutcome}"`
    );
    const { data, error } = await supabase
      .from("markets")
      .update({
        winning_outcome: winningOutcome,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", marketId)
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, resolvedMarket: data });
  } catch (error) {
    console.error("Failed to resolve market:", error);
    return NextResponse.json(
      { error: "Failed to resolve market." },
      { status: 500 }
    );
  }
}
