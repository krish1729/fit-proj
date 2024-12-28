import { z } from "zod";
import { ACTIVITY_MULTIPLIERS, formSchema } from "./form-schema";

export const calculateCalories = (values: z.infer<typeof formSchema>) => {
  const weight = values.useMetric
    ? values.currWeight
    : values.currWeight * 0.453592; // Convert lbs to kg if needed
  const height = values.useMetric ? values.height : values.height * 2.54; // Convert inches to cm if needed

  // Using Mifflin-St Jeor Formula for BMR
  const bmr = 10 * weight + 6.25 * height - 5;

  // Calculate TDEE based on activity level
  const tdee = bmr * ACTIVITY_MULTIPLIERS[values.lifestyle];

  // Calculate deficit/surplus based on goal weight and timeframe
  const weightDiff = values.goalWeight - values.currWeight;
  const timeframeInWeeks = {
    "3months": 12,
    "6months": 24,
    "1year": 52,
  }[values.timeframe];

  // Each pound of weight change requires approximately 3500 calories
  const calorieAdjustment = (weightDiff * 3500) / (timeframeInWeeks * 7);

  // Final goal calories
  return Math.round(tdee + calorieAdjustment);
};
