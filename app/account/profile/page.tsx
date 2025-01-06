"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Profile() {
  const [goalsData, setGoalsData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("goalsData is: ", data);
        setGoalsData(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Error loading profile data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Card className="w-full">
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-4">
      <Card className="w-full">
        <CardTitle className="p-4">Your Profile</CardTitle>
        <CardContent>
          {goalsData ? (
            <div>
              <div>Calories: {goalsData.calories || "Not set"}</div>
              <div>Current BodyWeight: {goalsData.weight || "Not Set"}</div>
              <div>Current BodyFat: {goalsData.bodyfat || "Not Set"} %</div>
              <div>Goal BodyWeight: {goalsData.goalWeight || "Not Set"}</div>
              <div>Goal BodyFat: {goalsData.goalBodyFat || "Not Set"} %</div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
