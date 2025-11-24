import type React from "react";
import { useState } from "react";

import { Button, InputField, SelectField } from "@/components/ui";
import { CaretUpDownIcon } from "@/components/ui/icons";
import CurrencyField from "@/components/shared/CurrencyField";
import { SORT_OPTIONS } from "../constants/selectOptions";
import AdvancedFilters from "./AdvancedFilters";
import LocationField from "./LocationField";
import type {
  SearchAttractionsParams,
  SearchAttractionsResponse,
  SortBy,
} from "../types";
import { useRouteQueryParams } from "@/hooks";
import { useLanguages } from "@/queries";

type ActivitiesSearchFormProps = {
  onSearch: (params: SearchAttractionsParams) => void;
  isLoadingLocations: boolean;
  locations?: SearchAttractionsResponse;
};

export default function ActivitiesSearchForm({
  onSearch,
  isLoadingLocations,
  locations,
}: ActivitiesSearchFormProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const { setParams, getParam, getAllParams, clearAllParams } =
    useRouteQueryParams();
  const { data: languages, isLoading: isLoadingLanguages } = useLanguages();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const params: SearchAttractionsParams = {
      id: getParam("locationId") || "",
      startDate: getParam("startDate") || undefined,
      endDate: getParam("endDate") || undefined,
      sortBy: getParam<SortBy>("sortBy") || undefined,
      currency_code: getParam("currencyCode") || undefined,
      languagecode: getParam("languageCode") || undefined,
      typeFilters: getAllParams("type").join(",") || undefined,
      priceFilters: getAllParams("price").join(",") || undefined,
      ufiFilters: getAllParams("ufi").join(",") || undefined,
      labelFilters: getAllParams("label").join(",") || undefined,
    };

    if (!params.id) {
      return;
    }

    onSearch(params);
  };

  const clearAdvancedFilters = () => {
    clearAllParams();
    setShowAdvancedFilters(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-5 rounded-sm bg-neutral-300 p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <LocationField />

        <div className="flex flex-1 gap-4">
          <InputField
            id="activities-start-date"
            label="Start date"
            type="date"
            value={getParam("startDate")}
            onChange={(event) => setParams({ startDate: event.target.value })}
          />
          <InputField
            id="activities-end-date"
            label="End date"
            type="date"
            value={getParam("endDate")}
            onChange={(event) => setParams({ endDate: event.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <SelectField
          id="activities-sort-by"
          label="Sort by"
          placeholder="Select sort by"
          value={getParam<SortBy>("sortBy")}
          onChange={(value) => setParams({ sortBy: value })}
          options={SORT_OPTIONS}
          containerClassName="md:flex-[2]"
        />

        <div className="flex flex-1 gap-4">
          <CurrencyField />

          <SelectField
            id="activities-language"
            label="Language"
            value={getParam("languageCode")}
            placeholder="Select language"
            onChange={(value) => setParams({ languageCode: value })}
            options={
              languages?.data
                ? languages.data.map((language) => ({
                    label: language.name,
                    value: language.code,
                  }))
                : []
            }
            isLoading={isLoadingLanguages}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-neutral-500/40 pt-4">
        {locations?.data && (
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black-secondary"
            onClick={() => setShowAdvancedFilters((prev) => !prev)}
            aria-expanded={showAdvancedFilters}
            aria-controls="activities-advanced-filters"
          >
            <CaretUpDownIcon className="size-4" />
            Advanced filters
          </button>
        )}

        <div className="flex gap-3 ml-auto">
          <Button
            type="button"
            variant="tertiary"
            size="md"
            onClick={clearAdvancedFilters}
            className="hover:underline"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoadingLocations}
            disabled={!getParam("locationId")}
          >
            Search activities
          </Button>
        </div>
      </div>

      {showAdvancedFilters && <AdvancedFilters response={locations} />}
    </form>
  );
}


