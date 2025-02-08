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
import ImageUploadWrapper from "./image-upload-wrapper";
import { PROFILE_SELECTORS } from "@/types/profileTypes";
import { WEEK_SELECTORS } from "@/types/weekTypes";

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
                    <WeekSelector
                      weekSelectorId="DIALOG_WEEK"
                      weekLabel="Select Week"
                    />
                  </div>
                  <div>
                    <ProfileSelector
                      profileSelectorId="UPLOAD_PROFILE"
                      placeholder="Select Profile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bodyPic">Upload Body Picture</Label>
                    <ImageUploadWrapper
                      profileSelectorId={PROFILE_SELECTORS.UPLOAD_PROFILE}
                      weekSelectorId={WEEK_SELECTORS.DIALOG_WEEK}
                    />
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
