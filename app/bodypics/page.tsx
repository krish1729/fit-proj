import BodyPicsUpload from "@/components/bodypics-upload";
import WeekSelector from "@/components/week-selector";
import { useState } from "react";

export default function BodyPics() {
  // const [firstWeek, setFirstWeek] = useState("");
  // const [secondWeek, setSecondWeek] = useState("");
  //
  // const handleFirstWeek = (event) => {
  //   setFirstWeek(event.target.value);
  //   console.log("First Week Target Value: ", event.target.value);
  // };
  //
  // const handleSecondWeek = (event) => {
  //   setSecondWeek(event.target.value);
  //   console.log("Second Week Target Value: ", event.target.value);
  // };

  return (
    <div className="gap-3 p-4">
      <div>
        <BodyPicsUpload />
      </div>
      <div className="flex flex-row items-center justify-center p-4 gap-6">
        <WeekSelector />
        <WeekSelector />
      </div>
    </div>
  );
}
