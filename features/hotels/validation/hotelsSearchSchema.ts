import { nonRequiredString, requiredString } from "@/lib/utils/zodHelpers";
import { z } from "zod";

export const hotelsSearchSchema = z
  .object({
    dest_id: requiredString("Destination is required  "),
    search_type: requiredString("Search type is required"),
    arrival_date: requiredString("Check-in date is required"),
    departure_date: requiredString("Check-out date is required"),
    children_age: nonRequiredString.refine(
      (value) => {
        if (!value) return true;

        const num = Number(value);
        if (Number.isNaN(num)) return false;

        return num >= 1 && num <= 17;
      },
      {
        message: "Children age must be between 0 and 17",
      }
    ),
    adults: nonRequiredString,
    room_qty: nonRequiredString,
    categories_filter: nonRequiredString,
    languagecode: nonRequiredString,
    units: nonRequiredString,
    temperature_unit: nonRequiredString,
    currency_code: nonRequiredString,
    location: nonRequiredString,
  })
  .refine(
    (values) => {
      if (!values.arrival_date || !values.departure_date) return true;

      const start = new Date(values.arrival_date);
      const end = new Date(values.departure_date);

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return true;
      }

      return end >= start;
    },
    {
      path: ["departure_date"],
      message: "Check-out date must be on or after check-in date",
    }
  )
  .refine(
    (values) => {
      if (!values.arrival_date) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const arrival = new Date(values.arrival_date);
      if (Number.isNaN(arrival.getTime())) {
        return true;
      }

      return arrival > today;
    },
    {
      path: ["arrival_date"],
      message: "Check-in date must be after today",
    }
  )
  .refine(
    (values) => {
      if (!values.departure_date) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const departure = new Date(values.departure_date);
      if (Number.isNaN(departure.getTime())) {
        return true;
      }

      return departure > today;
    },
    {
      path: ["departure_date"],
      message: "Check-out date must be after today",
    }
  );

export type HotelsSearchFormValues = z.infer<typeof hotelsSearchSchema>;
