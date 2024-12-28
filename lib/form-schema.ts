import { z } from "zod";

export const formSchema = z.object({
  useMetric: z.boolean().default(false),
  height: z.number().min(3, "Height is required"),
  currWeight: z.number().min(2, "Current weight is required"),
  currBodyFat: z.number().min(2, "Current body fat percentage is required"),
  goalWeight: z.number().min(2, "Goal weight is required"),
  goalBodyFat: z
    .number()
    .min(1, "Goal body fat percentage must be at least 1%")
    .max(40, "Goal body fat percentage must be less than 40%"),
  lifestyle: z.enum(["sedentary", "active", "veryActive"], {
    required_error: "Please select a lifestyle",
  }),
  timeframe: z.enum(["3months", "6months", "1year"], {
    required_error: "Please select a timeframe",
  }),
  goalCalories: z.number(),
});

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  active: 1.5,
  veryActive: 1.75,
};
