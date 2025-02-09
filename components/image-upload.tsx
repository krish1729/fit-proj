"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useProfileStore from "@/store/profileStore";
import useWeekStore from "@/store/weekStore";
import { profileSelectorId } from "@/types/profileTypes";
import { weekSelectorId } from "@/types/weekTypes";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  profileSelectorId: profileSelectorId;
  weekSelectorId: weekSelectorId;
}

export default function ImageUpload({
  profileSelectorId,
  weekSelectorId,
}: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  const profile = useProfileStore((state) => state.profiles[profileSelectorId]);
  const week = useWeekStore((state) => state.weeks[weekSelectorId]);
  console.log("profile is: ", profile);
  console.log("week is: ", week);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
    console.log("image is: ", image);
  };

  const handleSubmit = async () => {
    if (!image || !profile || !week) {
      console.error("Missing required fields: image, profile, week");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("profile", JSON.stringify(profile));
      formData.append("week", JSON.stringify(week));

      const response = await fetch("api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Upload successful: ", result);
      setImage(null);
      console.log("formData is: ", formData);
      toast({ title: "Submitted", description: "Uploaded image" });
    } catch (error) {
      console.error("Error creating FormData:", error);
      toast({ variant: "destructive", title: "Error Uploading" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <Input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          disabled={isUploading}
        />
        <Button
          className="my-4 w-full"
          onClick={handleSubmit}
          disabled={!image || !profile || !week}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {isUploading ? "Uploading ..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}
