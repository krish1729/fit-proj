import { profileSelectorId } from "@/types/profileTypes";
import { create } from "zustand";

interface ProfileStoreState {
  profiles: Record<profileSelectorId, string>;
  setProfiles: (id: profileSelectorId, profile: string) => void;
  getProfiles: (id: profileSelectorId) => string;
  resetProfiles: (id: profileSelectorId) => void;
}

const useProfileStore = create<ProfileStoreState>((set, get) => ({
  profiles: {
    COMPARE_PROFILE: "",
    UPLOAD_PROFILE: "",
  },
  setProfiles: (id, profile) => {
    set((state) => ({
      profiles: { ...state.profiles, [id]: profile },
    }));
  },
  getProfiles: (id) => get().profiles[id],
  resetProfiles: (id) => {
    set((state) => ({
      profiles: { ...state.profiles, [id]: "" },
    }));
  },
}));

export default useProfileStore;
