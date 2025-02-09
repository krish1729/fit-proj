import { s3ImageService } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const profile = searchParams.get("profile");
    const week = searchParams.get("week");
    console.log("profile is: ", profile);
    console.log("week is: ", week);

    if (!profile || !week) {
      return NextResponse.json(
        { error: "Profile and Week are required" },
        { status: 400 },
      );
    }

    const result = await s3ImageService.getImage(profile, week);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error retrieving the image: ", error);
    return NextResponse.json(
      { error: "Failed to retrieve image" },
      { status: 500 },
    );
  }
}
