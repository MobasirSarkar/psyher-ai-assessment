import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const { tier } = await req.json();
    const validTiers = ["free", "silver", "gold", "platinum"];
    if (!validTiers) {
      return NextResponse.json({ error: "invalid tier" }, { status: 400 });
    }
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        tier: tier,
      },
    });
    return NextResponse.json({ success: true, tier }, { status: 200 });
  } catch (error) {
    console.error("Error updating tier:", error);
    return NextResponse.json(
      { error: "Failed to update tier" },
      { status: 500 },
    );
  }
}
