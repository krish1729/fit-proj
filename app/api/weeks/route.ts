import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Named export for the GET method
export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const emailAddress = user?.emailAddresses[0].emailAddress;
    const userGoals = await db.goals.findFirst({
      where: {
        email: emailAddress,
      },
    });
    if (!userGoals) {
      return NextResponse.json(
        { error: "User Goals not found" },
        { status: 404 },
      );
    }
    const timeframe = userGoals.timeframe;
    const numOfMonths = parseInt(timeframe?.slice(0, 1) || "0", 10);
    const numOfWeeks = numOfMonths * 4;
    return NextResponse.json({ numOfWeeks }, { status: 200 });
  } catch (err) {
    console.error("Error calculating number of weeks", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
