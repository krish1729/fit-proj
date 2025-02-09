"use server";

import { s3ImageService } from "@/lib/s3";

export async function getComparisionImages(
  profile: string,
  startWeek: string,
  endWeek: string,
) {
  try {
    const [firstImage, secondImage] = await Promise.all([
      s3ImageService.getImage(profile, startWeek),
      s3ImageService.getImage(profile, endWeek),
    ]);

    return {
      startWeekImage: firstImage.imageUrl,
      endWeekImage: secondImage.imageUrl,
    };
  } catch (error) {
    console.error("Error fetching images: ", error);
    throw new Error("Failed to fetch comparision images");
  }
}
