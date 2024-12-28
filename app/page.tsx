import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-muted p-6">
      <h1 className="text-4xl font-bold">Welcome to FitProj</h1>
      <h1 className="text-2xl font-bold">Track your fitness journey</h1>
      <div className="flex flex-row justify-evenly gap-3">
        <div>
          <a href="/goals">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Enter your goals</CardTitle>
                <CardDescription>
                  Enter your Height/Weight, Calories, etc.
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        </div>
        <div>
          <a href="/workout">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Workout Progress</CardTitle>
                <CardDescription>
                  Track your workout goals and progression
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        </div>
        <div>
          <a href="/progress">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Visual Progress</CardTitle>
                <CardDescription>
                  Track your visual progress with meal and body photos
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}
