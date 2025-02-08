import { profileSelectorId } from "@/types/profileTypes";
import { weekSelectorId } from "@/types/weekTypes";
import { Suspense } from "react";
import ImageUpload from "./image-upload";

interface ImageUploadWrapperProps {
  profileSelectorId: profileSelectorId;
  weekSelectorId: weekSelectorId;
}

export default async function ImageUploadWrapper({
  profileSelectorId,
  weekSelectorId,
}: ImageUploadWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageUpload
        profileSelectorId={profileSelectorId}
        weekSelectorId={weekSelectorId}
      />
    </Suspense>
  );
}
