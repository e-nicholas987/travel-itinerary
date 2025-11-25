export type SearchHotelsPriceValue = {
  value: number;
  currency: string;
};

export type SearchHotelsBenefitBadge = {
  variant?: string;
  identifier?: string;
  explanation?: string;
  text?: string;
};

export type SearchHotelsPriceBreakdown = {
  grossPrice: SearchHotelsPriceValue;
  excludedPrice: SearchHotelsPriceValue;
  taxExceptions: unknown[];
  benefitBadges: SearchHotelsBenefitBadge[];
  strikethroughPrice?: SearchHotelsPriceValue;
};

export type SearchHotelsCheckTime = {
  fromTime: string;
  untilTime: string;
};

export type SearchHotelsProperty = {
  id: number;
  ufi?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  countryCode?: string;
  wishlistName?: string;
  mainPhotoId?: number;
  photoUrls?: string[];
  position?: number;
  rankingPosition?: number;
  isFirstPage?: boolean;
  isPreferred?: boolean;
  propertyClass?: number;
  accuratePropertyClass?: number;
  qualityClass?: number;
  currency?: string;
  optOutFromGalleryChanges?: number;
  reviewScore?: number;
  reviewScoreWord?: string;
  reviewCount?: number;
  checkinDate?: string;
  checkoutDate?: string;
  checkin?: SearchHotelsCheckTime;
  checkout?: SearchHotelsCheckTime;
  priceBreakdown?: SearchHotelsPriceBreakdown;
  blockIds?: string[];
};

export type SearchHotelsHotel = {
  hotel_id: number;
  accessibilityLabel: string;
  property: SearchHotelsProperty;
};

export type SearchHotelsMeta = {
  title: string;
};

export type SearchHotelsAppearComponent = {
  props: Record<string, unknown>;
};

export type SearchHotelsAppearItem = {
  id?: string;
  component?: SearchHotelsAppearComponent;
  contentUrl?: string;
};

export type SearchHotelsData = {
  hotels: SearchHotelsHotel[];
  meta: SearchHotelsMeta[];
  appear: SearchHotelsAppearItem[];
};

export type SearchHotelsResponse = {
  status: boolean;
  message:
    | string
    | {
        code: string;
        message: string;
      };
  timestamp: number;
  data?: SearchHotelsData;
};

export type SearchHotelsParams = {
  dest_id: number;
  search_type: string;
  arrival_date: string;
  departure_date: string;
  adults?: number;
  children_age?: string;
  room_qty?: number;
  price_min?: number;
  price_max?: number;
  sort_by?: string;
  categories_filter?: string;
  units?: "metric" | "imperial";
  temperature_unit?: "c" | "f";
  languagecode?: string;
  currency_code?: string;
  location?: string;
};

export type HotelDestination = {
  dest_id: string;
  search_type: string;
  dest_type: string;
  cc1: string;
  type: string;
  name: string;
  hotels: number;
  label: string;
  lc: string;
  nr_hotels: number;
  latitude: number;
  longitude: number;
  image_url: string;
  city_name: string;
  roundtrip: string;
  country: string;
  city_ufi: number | null;
  region: string;
};

export type SearchHotelDestinationsResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: HotelDestination[];
};

export type HotelSortOption = {
  id: string;
  title: string;
};

export type GetHotelSortByResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: HotelSortOption[];
};

export type HotelFilterAndSortParams = Pick<
  SearchHotelsParams,
  | "dest_id"
  | "search_type"
  | "arrival_date"
  | "departure_date"
  | "adults"
  | "children_age"
  | "room_qty"
  | "categories_filter"
  | "languagecode"
>;

export type GetHotelFilterParams = HotelFilterAndSortParams;
export type GetHotelSortByParams = HotelFilterAndSortParams;

export type HotelFilterBase = {
  title: string;
  field: string;
  filterStyle: "SLIDER" | "CHECKBOX";
};

export type HotelFilterCheckboxOption = {
  title: string;
  genericId: string;
  countNotAutoextended: number;
};

export type HotelCheckboxFilter = HotelFilterBase & {
  filterStyle: "CHECKBOX";
  options: HotelFilterCheckboxOption[];
};

export type HotelSliderFilter = HotelFilterBase & {
  filterStyle: "SLIDER";
  options: HotelFilterCheckboxOption[];
  min: string;
  max: string;
  minPriceStep: string;
  minSelected: string;
  histogram: number[];
  currency: string;
};

export type HotelFilter = HotelCheckboxFilter | HotelSliderFilter;

export type GetHotelFilterData = {
  pagination: {
    nbResultsTotal: number;
  };
  availabilityInfo: {
    totalAvailableNotAutoextended: number;
  };
  filters: HotelFilter[];
};

export type GetHotelFilterResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: GetHotelFilterData;
};
