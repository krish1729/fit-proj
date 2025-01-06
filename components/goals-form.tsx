import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function GoalsForm() {
  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Enter your goals</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
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
                                ? "Height (inches)"
                                : "Height (cm)"
                            }
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.watch("useMetric")
                            ? "Enter height in inches"
                            : "Enter height in centimeters"}
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
                                ? "Weight (lbs)"
                                : "Weight (kg)"
                            }
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.watch("useMetric")
                            ? "Enter weight in pounds"
                            : "Enter weight in kilograms"}
                        </FormDescription>
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
                                ? "Weight (lbs)"
                                : "Weight (kg)"
                            }
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.watch("useMetric")
                            ? "Enter weight in pounds"
                            : "Enter weight in kilograms"}
                        </FormDescription>
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
    </div>
  );
}
