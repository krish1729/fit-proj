import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const emailAddress = user?.emailAddresses[0]?.emailAddress || "";
    const goalsData = await db.goals.findFirst({
      where: {
        email: emailAddress,
      },
    });
    return NextResponse.json(goalsData);
  } catch (err) {
    console.log("GOALS_RETRIEVAL", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
