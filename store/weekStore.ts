import { weekSelectorId } from "@/types/weekTypes";
import { create } from "zustand";

interface WeekStoreState {
  weeks: Record<weekSelectorId, string>;
  setWeeks: (id: weekSelectorId, week: string) => void;
  getWeeks: (id: weekSelectorId) => string;
  resetWeeks: (id: weekSelectorId) => void;
}

const useWeekStore = create<WeekStoreState>((set, get) => ({
  weeks: {
    LEFT_WEEK: "",
    RIGHT_WEEK: "",
    DIALOG_WEEK: "",
  },
  setWeeks: (id, week) => {
    set((state) => ({
      weeks: { ...state.weeks, [id]: week },
    }));
  },
  getWeeks: (id) => get().weeks[id],
  resetWeeks: (id) => {
    set((state) => ({
      weeks: { ...state.weeks, [id]: "" },
    }));
  },
}));

export default useWeekStore;
