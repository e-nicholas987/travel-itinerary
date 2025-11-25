import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { FilterGroup } from "./FilterGroup";
import { SearchAttractionsData } from "../types";
import type { ActivitiesSearchFormValues } from "../validation/activitiesSearchSchema";

type AdvancedFiltersProps = {
  attractions: SearchAttractionsData | undefined;
};

export default function AdvancedFilters({ attractions }: AdvancedFiltersProps) {
  const { watch, setValue } = useFormContext<ActivitiesSearchFormValues>();

  const typeFilters = watch("typeFilters") ?? [];
  const priceFilters = watch("priceFilters") ?? [];
  const ufiFilters = watch("ufiFilters") ?? [];
  const labelFilters = watch("labelFilters") ?? [];

  const activityTypeFilterOptions = useMemo(() => {
    return (
      attractions?.filterOptions?.typeFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [attractions?.filterOptions?.typeFilters]);

  const priceFilterOptions = useMemo(() => {
    return (
      attractions?.filterOptions?.priceFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [attractions?.filterOptions?.priceFilters]);

  const ufiFilterOptions = useMemo(() => {
    return (
      attractions?.filterOptions?.ufiFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [attractions?.filterOptions?.ufiFilters]);

  const labelFilterOptions = useMemo(() => {
    return (
      attractions?.filterOptions?.labelFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [attractions?.filterOptions?.labelFilters]);

  const handleToggle = (
    key: keyof ActivitiesSearchFormValues,
    value: string
  ) => {
    const current = (watch(key) as string[] | undefined) ?? [];
    const exists = current.includes(value);
    const next = exists
      ? current.filter((item) => item !== value)
      : [...current, value];
    setValue(key, next);
  };

  return (
    <div
      id="activities-advanced-filters"
      className="mt-4 grid gap-4 border-t border-neutral-500/40 pt-4 md:grid-cols-2"
    >
      {Boolean(activityTypeFilterOptions.length) && (
        <FilterGroup
          label="Activity type"
          options={activityTypeFilterOptions}
          selected={typeFilters}
          onToggle={(value) => handleToggle("typeFilters", value)}
        />
      )}
      {Boolean(priceFilterOptions.length) && (
        <FilterGroup
          label="Price range"
          options={priceFilterOptions}
          selected={priceFilters}
          onToggle={(value) => handleToggle("priceFilters", value)}
        />
      )}
      {Boolean(ufiFilterOptions.length) && (
        <FilterGroup
          label="Area"
          options={ufiFilterOptions}
          selected={ufiFilters}
          onToggle={(value) => handleToggle("ufiFilters", value)}
        />
      )}
      {Boolean(labelFilterOptions.length) && (
        <FilterGroup
          label="Labels"
          options={labelFilterOptions}
          selected={labelFilters}
          onToggle={(value) => handleToggle("labelFilters", value)}
        />
      )}
    </div>
  );
}
