import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress || "";
    const name = user?.firstName;

    const data = await request.json();
    const createGoal = await db.user.create({
      data: {
        email,
        name,
        height: data.height,
        weight: data.currWeight,
        calories: data.goalCalories,
        goalWeight: data.goalWeight,
        bodyfat: data.currBodyFat,
        goalBodyFat: data.goalBodyFat,
      },
    });

    return new Response(JSON.stringify(createGoal), { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    console.log("GOALS_UPLOAD", err);
    return new Response("Internal Error", { status: 500 });
  }
}
