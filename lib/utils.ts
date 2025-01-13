import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const profiles = [
  {
    profile: "leftProfile",
    header: "Left Profile",
  },
  {
    profile: "rightProfile",
    header: "Right Profile",
  },
  {
    profile: "frontProfile",
    header: "Front Profile",
  },
  {
    profile: "backProfile",
    header: "Back Profile",
  },
];
