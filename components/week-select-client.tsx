"use client";

import { weekSelectorId } from "@/types/weekTypes";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import useWeekStore from "@/store/weekStore";

interface WeekSelectOptions {
  weekOptions: React.ReactNode[];
  weekSelectorId: weekSelectorId;
  placeholder?: string;
}

export default function WeekSelectClient({
  weekSelectorId,
  weekOptions,
  placeholder = "Select Week",
}: WeekSelectOptions) {
  const week = useWeekStore((state) => state.weeks[weekSelectorId]);
  const setWeekValue = useWeekStore((state) => state.setWeeks);

  return (
    <div>
      <Select
        value={week}
        onValueChange={(value) => setWeekValue(weekSelectorId, value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{weekOptions}</SelectContent>
      </Select>
    </div>
  );
}
