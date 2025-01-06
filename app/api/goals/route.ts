import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]?.emailAddress || "";
    const firstName = user?.firstName;

    const reqData = await request.json();
    console.log("reqData is: ", reqData);

    const createGoal = await db.goals.create({
      data: {
        email: emailAddress,
        name: firstName,
        height: reqData.height,
        weight: reqData.currWeight,
        calories: reqData.goalCalories,
        goalWeight: reqData.goalWeight,
        bodyfat: reqData.currBodyFat,
        goalBodyFat: reqData.goalBodyFat,
        lifestyle: reqData.lifestyle,
        timeframe: reqData.timeframe,
      },
    });
    console.log("data is: ", createGoal);
    return new Response(JSON.stringify(createGoal), { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    console.log("GOALS_UPLOAD", err);
    return new Response("Internal Error", { status: 500 });
  }
}
