import BodyPicsUpload from "@/components/bodypics-upload";
import ProfileSelector from "@/components/profile-selector";
import WeekSelector from "@/components/week-selector";

export default function BodyPics() {
  return (
    <div className="gap-3 p-4">
      <div>
        <BodyPicsUpload />
      </div>
      <div className="flex flex-row items-center justify-center p-4 gap-6">
        <WeekSelector />
        <ProfileSelector />
        <WeekSelector />
      </div>
    </div>
  );
}
