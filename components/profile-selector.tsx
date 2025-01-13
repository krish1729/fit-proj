import { profiles } from "@/lib/utils";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ProfileSelector() {
  return (
    <div>
      <div>
        <Label htmlFor="profile" className="text-center">
          Select Body Profile
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
  );
}
