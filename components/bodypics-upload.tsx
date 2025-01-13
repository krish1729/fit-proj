import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WeekSelector from "./week-selector";
import ProfileSelector from "./profile-selector";
import { Label } from "./ui/label";
import ImageUpload from "./image-upload";

export default function BodyPicsUpload() {
  return (
    <div>
      <div className="flex flex-col items-center p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add your Body Pictures</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your Body Pictures</DialogTitle>
              <DialogDescription>
                Add Body Pics for the Selected Week
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid grid-cols-1 items-center">
                <div className="flex flex-col w-auto m-4 p-4 gap-6">
                  <div>
                    <WeekSelector />
                  </div>
                  <div>
                    <ProfileSelector />
                  </div>
                  <div>
                    <Label htmlFor="bodyPic">Upload Body Picture</Label>
                    <ImageUpload />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
