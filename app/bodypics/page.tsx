import BodyPicsUpload from "@/components/bodypics-upload";
import ComparisonSection from "@/components/comparison-section";
import ProfileSelector from "@/components/profile-selector";
import WeekSelector from "@/components/week-selector";

export default function BodyPics() {
  return (
    <div className="gap-3 p-4">
      <div>
        <BodyPicsUpload />
      </div>
      <div className="flex flex-row items-center justify-center p-4 gap-6">
        <WeekSelector weekSelectorId="LEFT_WEEK" weekLabel="Start Week" />
        <ProfileSelector
          profileSelectorId="COMPARE_PROFILE"
          placeholder="Select Profile"
        />
        <WeekSelector weekSelectorId="RIGHT_WEEK" weekLabel="End Week" />
      </div>

      <div className="mt-8">
        <ComparisonSection />
      </div>
    </div>
  );
}
