"use client";

import useWeekStore from "@/store/weekStore";
import useProfileStore from "@/store/profileStore";
import ComparisionPlaceholder from "./comparision-placeholder";
import ComparisionComponent from "./comparision-component";

export default function ComparisonSection() {
  const { weeks } = useWeekStore();
  const { profiles } = useProfileStore();

  const isReadyToCompare =
    weeks.LEFT_WEEK !== "" &&
    weeks.RIGHT_WEEK !== "" &&
    profiles.COMPARE_PROFILE !== "";

  return isReadyToCompare ? (
    <div>
      <ComparisionComponent
        startWeek={weeks.LEFT_WEEK}
        endWeek={weeks.RIGHT_WEEK}
        profile={profiles.COMPARE_PROFILE}
      />
    </div>
  ) : (
    <ComparisionPlaceholder
      hasStartWeek={weeks.LEFT_WEEK !== ""}
      hasEndWeek={weeks.RIGHT_WEEK !== ""}
      hasProfile={profiles.COMPARE_PROFILE !== ""}
    />
  );
}
