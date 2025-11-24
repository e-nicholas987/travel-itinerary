export type FilterOption = {
  label: string;
  value: string;
};

export type ActivityPreview = {
  id: string;
  name: string;
  location: string;
  description: string;
  price: string;
  currencySymbol: string;
  rating: number;
  reviewCount: number;
  duration: string;
  tags: string[];
};

export type SearchLocationParams = {
  query: string;
  languagecode?: string;
};

export type AttractionsProductSuggestion = {
  id: string;
  __typename: "AttractionsSearchProductSuggestion";
  title: string;
  productId: string;
  productSlug: string;
  taxonomySlug: string;
  cityUfi: number;
  cityName: string;
  countryCode: string;
};

export type AttractionsDestinationSuggestion = {
  id: string;
  __typename: "AttractionsSearchDestinationSuggestion";
  ufi: number;
  country: string;
  cityName: string;
  productCount: number;
  cc1: string;
};

export type SearchLocationData = {
  products: AttractionsProductSuggestion[];
  destinations: AttractionsDestinationSuggestion[];
};

export type SearchAttractionLocationResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: SearchLocationData;
};

export type SortBy = "trending" | "attr_book_score" | "lowest_price";

export type SearchAttractionsParams = {
  id: string;
  startDate?: string;
  endDate?: string;
  sortBy?: SortBy;
  page?: number;
  currency_code?: string;
  languagecode?: string;
  typeFilters?: string;
  priceFilters?: string;
  ufiFilters?: string;
  labelFilters?: string;
};

export type AttractionsPrice = {
  __typename: "AttractionsPrice";
  chargeAmount: number;
  currency: string;
  publicAmount: number;
};

export type AttractionsPhoto = {
  __typename: "AttractionsPhoto";
  small: string;
};

export type AttractionsProductCombinedReviewStats = {
  __typename: "AttractionsProductCombinedReviewStats";
  average: number;
  total: number;
};

export type AttractionsProductReviewStats = {
  __typename: "AttractionsProductReviewStats";
  allReviewsCount: number;
  percentage: string;
  combinedNumericStats: AttractionsProductCombinedReviewStats;
};

export type AttractionLocationUrl = {
  __typename: "AttractionLocationUrl";
  country: string;
};

export type AttractionLocationResponse = {
  __typename: "AttractionLocationResponse";
  bCityName: string;
  ufi: number;
  url: AttractionLocationUrl;
};

export type OfferItem = {
  __typename: "OfferItem";
  id: string;
};

export type Offer = {
  __typename: "Offer";
  items: OfferItem[];
};

export type AttractionsProductSupportedFeatures = {
  __typename: "AttractionsProductSupportedFeatures";
  nativeApp: boolean;
};

export type AttractionsProductFlag = {
  __typename: "AttractionsProductFlags";
  flag: string;
  value: boolean;
  rank: number;
};

export type AttractionsCancellationPolicy = {
  __typename: "AttractionsCancellationPolicy";
  hasFreeCancellation: boolean;
};

export type AttractionsProduct = {
  __typename: "AttractionsProduct";
  cancellationPolicy: AttractionsCancellationPolicy;
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  representativePrice: AttractionsPrice;
  primaryPhoto: AttractionsPhoto;
  reviewsStats: AttractionsProductReviewStats;
  ufiDetails: AttractionLocationResponse;
  offers: Offer[];
  supportedFeatures: AttractionsProductSupportedFeatures;
  flags: AttractionsProductFlag[];
};

export type AttractionsSorterOption = {
  __typename: "AttractionsSorterOption";
  name: string;
  value: string;
};

export type AttractionsFilterOption = {
  __typename: "FilterOption";
  name: string;
  tagname: string;
  productCount: number;
};

export type AttractionsFilterStats = {
  __typename: "FilterStats";
  unfilteredProductCount: number;
  filteredProductCount: number;
};

export type AttractionsFilterOptions = {
  __typename: "FilterOptions";
  typeFilters: AttractionsFilterOption[] | null;
  labelFilters: AttractionsFilterOption[] | null;
  ufiFilters: AttractionsFilterOption[] | null;
  priceFilters: AttractionsFilterOption[] | null;
};

export type SearchAttractionsData = {
  __typename: "AttractionsProductSearchResponse";
  products: AttractionsProduct[];
  filterStats: AttractionsFilterStats;
  sorters: AttractionsSorterOption[];
  defaultSorter: AttractionsSorterOption;
  filterOptions: AttractionsFilterOptions;
};

export type SearchAttractionsResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: SearchAttractionsData;
};
