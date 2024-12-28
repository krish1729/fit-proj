import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]?.emailAddress || "";
    console.log("email is: ", emailAddress);
    const firstName = user?.firstName;
    console.log("name is: ", firstName);

    const reqData = await request.json();
    console.log("height is: ", reqData.height);
    console.log("currWeight is: ", reqData.currWeight);
    console.log("currBodyFat is: ", reqData.currBodyFat);
    console.log("goalWeight is: ", reqData.goalWeight);
    console.log("goalBodyFat is: ", reqData.goalBodyFat);
    console.log("goalCalories is: ", reqData.goalCalories);

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
