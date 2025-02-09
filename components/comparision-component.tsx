import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import { getComparisionImages } from "@/app/actions/getImages";

interface ComparisionStateProps {
  startWeek: string;
  endWeek: string;
  profile: string;
}

function LoadingState() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-24 mt-4 mx-auto" />
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-24 mt-4 mx-auto" />
        </CardContent>
      </Card>
    </div>
  );
}

async function ComparisionImages({
  startWeek,
  endWeek,
  profile,
}: ComparisionStateProps) {
  const { startWeekImage, endWeekImage } = await getComparisionImages(
    profile,
    startWeek,
    endWeek,
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="relative aspect-square">
            <Image
              src={startWeekImage}
              alt={`${profile} - ${startWeek}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 text-center font-medium">{startWeek}</div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="relative aspect-square">
            <Image
              src={endWeekImage}
              alt={`${profile} - ${endWeek}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 text-center font-medium">{endWeek}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ComparisionComponent(props: ComparisionStateProps) {
  return (
    <Suspense fallback={<LoadingState />}>
      <ComparisionImages {...props} />
    </Suspense>
  );
}
