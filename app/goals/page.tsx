"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateCalories } from "@/lib/calculate-calories";
import { formSchema } from "@/lib/form-schema";

export default function Goals() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   useMetric: false,
    //   height: 0,
    //   currWeight: 0,
    //   currBodyFat: 0,
    //   goalWeight: 0,
    //   goalBodyFat: 0,
    //   lifestyle: "sedentary",
    //   timeframe: "3months",
    //   goalCalories: 0,
    // },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (
        name &&
        [
          "height",
          "currWeight",
          "goalWeight",
          "lifestyle",
          "timeframe",
          "useMetric",
        ].includes(name)
      ) {
        const formValues = form.getValues();
        // Only calculate if we have all required values
        if (
          formValues.height &&
          formValues.currWeight &&
          formValues.goalWeight
        ) {
          const calories = calculateCalories(formValues);
          form.setValue("goalCalories", calories);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center gap-6 bg-muted min-h-svh">
      <h1 className="text-4xl font-mono">Enter your goals!</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter your Goals</CardTitle>
          <CardDescription>
            Enter your weight, and caloric goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="useMetric"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base">Freedom Units</FormLabel>
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your height</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={
                            form.watch("useMetric")
                              ? "Height (cm)"
                              : "Height (inches)"
                          }
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        {form.watch("useMetric")
                          ? "Enter height in centimeters"
                          : "Enter height in inches"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current weight</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={
                            form.watch("useMetric")
                              ? "Weight (kg)"
                              : "Weight (lbs)"
                          }
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currBodyFat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approximate Body Fat %</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Body fat percentage"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="goalWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Weight</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={
                            form.watch("useMetric")
                              ? "Weight (kg)"
                              : "Weight (lbs)"
                          }
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goalBodyFat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Body Fat %</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Goal body fat percentage"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goalCalories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Calories</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          disabled
                          value={field.value || 0}
                        />
                      </FormControl>
                      <FormDescription>
                        Daily calorie target based on your goals
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="lifestyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lifestyle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Lifestyle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="veryActive">
                            Very Active
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeframe</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Timeframe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3months">3 months</SelectItem>
                          <SelectItem value="6months">6 months</SelectItem>
                          <SelectItem value="1year">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
