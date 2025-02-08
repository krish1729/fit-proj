"use client";

import { profiles } from "@/lib/utils";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { profileSelectorId } from "@/types/profileTypes";
import useProfileStore from "@/store/profileStore";

interface ProfileSelectOptions {
  profileSelectorId: profileSelectorId;
  placeholder?: string;
}

export default function ProfileSelector({
  profileSelectorId,
  placeholder,
}: ProfileSelectOptions) {
  const profile = useProfileStore((state) => state.profiles[profileSelectorId]);
  const setProfileValue = useProfileStore((state) => state.setProfiles);

  return (
    <div>
      <div>
        <Label htmlFor="profile" className="text-center">
          Select Body Profile
        </Label>
        <Select
          value={profile}
          onValueChange={(value) => setProfileValue(profileSelectorId, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
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
