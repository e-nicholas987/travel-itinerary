import React, { useMemo } from "react";
import { FilterGroup } from "./FilterGroup";
import { SearchAttractionsResponse } from "../types";
import { useRouteQueryParams } from "@/hooks";

export default function AdvancedFilters({
  response,
}: {
  response: SearchAttractionsResponse | undefined;
}) {
  const { setParams, getAllParams } = useRouteQueryParams();

  const activityTypeFilters = useMemo(() => {
    return (
      response?.data?.filterOptions?.typeFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [response?.data?.filterOptions?.typeFilters]);

  const priceFilters = useMemo(() => {
    return (
      response?.data?.filterOptions?.priceFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [response?.data?.filterOptions?.priceFilters]);

  const ufiFilters = useMemo(() => {
    return (
      response?.data?.filterOptions?.ufiFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [response?.data?.filterOptions?.ufiFilters]);

  const labelFilters = useMemo(() => {
    return (
      response?.data?.filterOptions?.labelFilters?.map((filter) => ({
        label: filter.name,
        value: filter.tagname,
      })) ?? []
    );
  }, [response?.data?.filterOptions?.labelFilters]);

  return (
    <div
      id="activities-advanced-filters"
      className="mt-4 grid gap-4 border-t border-neutral-500/40 pt-4 md:grid-cols-2"
    >
      {Boolean(activityTypeFilters.length) && (
        <FilterGroup
          label="Activity type"
          options={activityTypeFilters}
          selected={getAllParams("type") ?? []}
          onToggle={(value) => {
            setParams({ type: [value] });
          }}
        />
      )}
      {Boolean(priceFilters.length) && (
        <FilterGroup
          label="Price range"
          options={priceFilters}
          selected={getAllParams("price") ?? []}
          onToggle={(value) => {
            setParams({ price: [value] });
          }}
        />
      )}
      {Boolean(ufiFilters.length) && (
        <FilterGroup
          label="Area"
          options={ufiFilters}
          selected={getAllParams("ufi") ?? []}
          onToggle={(value) => {
            setParams({ ufi: [value] });
          }}
        />
      )}
      {Boolean(labelFilters.length) && (
        <FilterGroup
          label="Labels"
          options={labelFilters}
          selected={getAllParams("label") ?? []}
          onToggle={(value) => {
            setParams({ label: [value] });
          }}
        />
      )}
    </div>
  );
}
