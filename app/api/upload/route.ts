import { s3ImageService } from "@/lib/s3";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const profile = formData.get("profile") as string;
    const week = formData.get("week") as string;
    const file = formData.get("image") as File;

    console.log("profile is: ", profile);
    console.log("week is: ", week);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await s3ImageService.uploadImage(
      buffer,
      file.name,
      profile,
      week,
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error uploading image: ", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
