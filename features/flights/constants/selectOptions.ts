import type { SelectOption } from "@/types/common";

export const FLIGHTS_CABIN_CLASS_OPTIONS: SelectOption[] = [
  { label: "Economy", value: "ECONOMY" },
  { label: "Premium economy", value: "PREMIUM_ECONOMY" },
  { label: "Business", value: "BUSINESS" },
  { label: "First", value: "FIRST" },
];

export const FLIGHTS_SORT_OPTIONS: SelectOption[] = [
  { label: "Best", value: "BEST" },
  { label: "Cheapest", value: "CHEAPEST" },
  { label: "Fastest", value: "FASTEST" },
];

export const FLIGHTS_STOPS_OPTIONS: SelectOption[] = [
  { label: "No preference", value: "none" },
  { label: "Non-stop", value: "0" },
  { label: "1 stop", value: "1" },
  { label: "2 stops", value: "2" },
];
