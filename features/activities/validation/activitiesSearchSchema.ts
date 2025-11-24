import { z } from "zod";

export const activitiesSearchSchema = z
  .object({
    id: z.string().min(1, "Location is required"),
    startDate: z.string(),
    endDate: z.string(),
    sortBy: z.string(),
    currency_code: z.string(),
    languagecode: z.string(),
    typeFilters: z.array(z.string()),
    priceFilters: z.array(z.string()),
    ufiFilters: z.array(z.string()),
    labelFilters: z.array(z.string()),
  })
  .refine(
    (values) => {
      if (!values.startDate || !values.endDate) return true;

      const start = new Date(values.startDate);
      const end = new Date(values.endDate);

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return true;
      }

      return end >= start;
    },
    {
      path: ["endDate"],
      message: "End date must be on or after start date",
    }
  )
  .refine(
    (values) => {
      if (!values.startDate) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const start = new Date(values.startDate);
      if (Number.isNaN(start.getTime())) {
        return true;
      }

      return start > today;
    },
    {
      path: ["startDate"],
      message: "Start date must be after today",
    }
  )
  .refine(
    (values) => {
      if (!values.endDate) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const end = new Date(values.endDate);
      if (Number.isNaN(end.getTime())) {
        return true;
      }

      return end > today;
    },
    {
      path: ["endDate"],
      message: "End date must be after today",
    }
  );

export type ActivitiesSearchFormValues = z.infer<typeof activitiesSearchSchema>;
