import { ImagePlus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ImageUpload() {
  return (
    <div>
      <div>
        <Input type="file" />
        <Button className="my-4 w-full">
          <ImagePlus />
          Submit
        </Button>
      </div>
    </div>
  );
}
