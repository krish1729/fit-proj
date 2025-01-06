import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import WeekSelector from "./week-selector";

export default async function BodyPicsUpload() {
  const profiles = [
    {
      profile: "leftProfile",
      header: "Left Profile",
    },
    {
      profile: "rightProfile",
      header: "Right Profile",
    },
    {
      profile: "frontProfile",
      header: "Front Profile",
    },
    {
      profile: "backProfile",
      header: "Back Profile",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add your Body Pictures</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your Body Pictures</DialogTitle>
              <DialogDescription>
                Add Body Pics for the Selected Week
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid grid-cols-1 items-center p-4">
                <div className="flex flex-col">
                  <div>
                    <WeekSelector />
                  </div>
                  <div>
                    <Label htmlFor="profile" className="text-center">
                      Profile
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Profile" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((item) => (
                          <SelectItem key={item.profile} value={item.profile}>
                            {item.header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>Image Upload</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
