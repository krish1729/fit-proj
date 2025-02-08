export const WEEK_SELECTORS = {
  LEFT_WEEK: "LEFT_WEEK",
  RIGHT_WEEK: "RIGHT_WEEK",
  DIALOG_WEEK: "DIALOG_WEEK",
} as const;

export type weekSelectorId = keyof typeof WEEK_SELECTORS;
