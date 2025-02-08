export const PROFILE_SELECTORS = {
  COMPARE_PROFILE: "COMPARE_PROFILE",
  UPLOAD_PROFILE: "UPLOAD_PROFILE",
} as const;

export type profileSelectorId = keyof typeof PROFILE_SELECTORS;
