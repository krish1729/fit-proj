import { currentUser } from "@clerk/nextjs/server";
import { SelectItem } from "./ui/select";
import { db } from "@/lib/db";
import { Label } from "./ui/label";
import WeekSelectClient from "./week-select-client";
import { weekSelectorId } from "@/types/weekTypes";

interface WeekSelectorProps {
  weekSelectorId: weekSelectorId;
  weekLabel?: string;
}

export default async function WeekSelector({
  weekSelectorId,
  weekLabel,
}: WeekSelectorProps) {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0].emailAddress;
  const userGoals = await db.goals.findFirst({
    where: {
      email: emailAddress,
    },
  });
  const timeframe = userGoals?.timeframe;
  const numOfMonths = timeframe?.slice(0, 1);
  const numOfWeeks = Number(numOfMonths) * 4;

  const weekSelect = ({ numOfWeeks }: { numOfWeeks: number }) => {
    const weekOptions = [];
    for (let i = 0; i < numOfWeeks; i++) {
      weekOptions.push(
        <SelectItem key={i + 1} value={`week${i + 1}`}>
          Week {i + 1}
        </SelectItem>,
      );
    }
    return weekOptions;
  };

  const weekOptions = weekSelect({ numOfWeeks });
  return (
    <div>
      <div>
        <Label htmlFor="week" className="text-center">
          {weekLabel}
        </Label>
        <WeekSelectClient
          weekSelectorId={weekSelectorId}
          weekOptions={weekOptions}
        />
      </div>
    </div>
  );
}
