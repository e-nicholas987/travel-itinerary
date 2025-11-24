export type SearchFlightsParams = {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate?: string;
  stops?: "none" | "0" | "1" | "2";
  pageNo?: number;
  adults?: number;
  children?: string;
  sort?: "BEST" | "CHEAPEST" | "FASTEST";
  cabinClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  currency_code?: string;
};

export type FlightMoneyAmount = {
  currencyCode: string;
  units: number;
  nanos: number;
};

export type FlightStopAggregation = {
  numberOfStops: number;
  count: number;
  minPrice: FlightMoneyAmount;
};

export type FlightAirlineAggregation = {
  name: string;
  logoUrl: string;
  iataCode: string;
  count: number;
  minPrice: FlightMoneyAmount;
};

export type FlightTimeInterval = {
  start: string;
  end: string;
};

export type FlightTimeBucket = {
  start: string;
  end: string;
  count: number;
};

export type FlightTimeGroup = {
  arrival: FlightTimeBucket[];
  departure: FlightTimeBucket[];
};

export type FlightBaggageAggregation = {
  paramName: string;
  count: number;
  enabled: boolean;
  baggageType: string;
};

export type FlightBudgetAggregation = {
  paramName: string;
  min: FlightMoneyAmount;
  max: FlightMoneyAmount;
};

export type FlightDurationAggregation = {
  min: number;
  max: number;
  durationType: "JOURNEY" | "LAYOVER" | string;
  enabled: boolean;
  paramName: string;
};

export type FlightsAggregation = {
  totalCount: number;
  filteredTotalCount: number;
  stops: FlightStopAggregation[];
  airlines: FlightAirlineAggregation[];
  departureIntervals: FlightTimeInterval[];
  flightTimes: FlightTimeGroup[];
  durationMin: number;
  durationMax: number;
  minPrice: FlightMoneyAmount;
  minPriceFiltered: FlightMoneyAmount;
  baggage: FlightBaggageAggregation[];
  budget: FlightBudgetAggregation;
  budgetPerAdult: FlightBudgetAggregation;
  duration: FlightDurationAggregation[];
};

export type FlightAirport = {
  type: string;
  code: string;
  city: string;
  cityName: string;
  country: string;
  countryName: string;
  name: string;
};

export type FlightCarrierInfo = {
  operatingCarrier: string;
  marketingCarrier: string;
  operatingCarrierDisclosureText: string;
};

export type FlightCarrierData = {
  name: string;
  code: string;
  logo: string;
};

export type FlightInfo = {
  facilities: Record<string, unknown>[];
  flightNumber: number;
  planeType: string;
  carrierInfo: FlightCarrierInfo;
};

export type FlightCabinLuggageSizeRestrictions = {
  maxLength: number;
  maxWidth: number;
  maxHeight: number;
  sizeUnit: string;
};

export type FlightLuggageAllowance = {
  luggageType: string;
  ruleType?: "PIECE_BASED" | "WEIGHT_BASED" | string;
  maxPiece?: number;
  maxWeightPerPiece?: number;
  maxTotalWeight?: number;
  massUnit?: string;
  sizeRestrictions?: FlightCabinLuggageSizeRestrictions;
};

export type FlightTravellerLuggage = {
  travellerReference: string;
  luggageAllowance: FlightLuggageAllowance;
  personalItem?: boolean;
};

export type FlightLeg = {
  departureTime: string;
  arrivalTime: string;
  departureAirport: FlightAirport;
  arrivalAirport: FlightAirport;
  cabinClass: string;
  flightInfo: FlightInfo;
  carriers: string[];
  carriersData: FlightCarrierData[];
  totalTime: number;
  flightStops: Record<string, unknown>[];
  departureTerminal?: string;
  arrivalTerminal?: string;
};

export type FlightSegment = {
  departureAirport: FlightAirport;
  arrivalAirport: FlightAirport;
  departureTime: string;
  arrivalTime: string;
  legs: FlightLeg[];
  totalTime: number;
  travellerCheckedLuggage: FlightTravellerLuggage[];
  travellerCabinLuggage: FlightTravellerLuggage[];
  isAtolProtected: boolean;
  showWarningDestinationAirport: boolean;
  showWarningOriginAirport: boolean;
};

export type FlightPriceBreakdown = {
  total: FlightMoneyAmount;
  baseFare: FlightMoneyAmount;
  fee: FlightMoneyAmount;
  tax: FlightMoneyAmount;
  totalRounded?: FlightMoneyAmount;
  moreTaxesAndFees: Record<string, unknown>;
  discount: FlightMoneyAmount;
  totalWithoutDiscount: FlightMoneyAmount;
  totalWithoutDiscountRounded?: FlightMoneyAmount;
  carrierTaxBreakdown?: {
    carrier: FlightCarrierData;
    avgPerAdult?: FlightMoneyAmount;
    avgPerChild?: FlightMoneyAmount;
    avgPerInfant?: FlightMoneyAmount;
  }[];
};

export type FlightTravellerPriceBreakdown = FlightPriceBreakdown;

export type FlightTravellerPrice = {
  travellerPriceBreakdown: FlightTravellerPriceBreakdown;
  travellerReference: string;
  travellerType: string;
};

export type FlightIncludedProducts = {
  areAllSegmentsIdentical: boolean;
  segments: FlightLuggageAllowance[][];
};

export type FlightExtraProduct = {
  type: string;
  priceBreakdown: FlightPriceBreakdown;
};

export type FlightFlexibleTicketAncillary = {
  airProductReference: string;
  travellers: string[];
  priceBreakdown: FlightPriceBreakdown;
  preSelected?: boolean;
};

export type FlightOfferExtras = {
  flexibleTicket?: FlightFlexibleTicketAncillary;
  [key: string]: unknown;
};

export type FlightAncillaries = {
  flexibleTicket?: FlightFlexibleTicketAncillary;
  [key: string]: unknown;
};

export type FlightSeatAvailability = {
  numberOfSeatsAvailable: number;
};

export type FlightBrandedFareInfo = {
  fareName: string;
  cabinClass: string;
  features: unknown[];
  fareAttributes: unknown[];
  nonIncludedFeatures: unknown[];
};

export type FlightOffer = {
  token: string;
  segments: FlightSegment[];
  priceBreakdown: FlightPriceBreakdown;
  travellerPrices: FlightTravellerPrice[];
  priceDisplayRequirements: unknown[];
  pointOfSale: string;
  tripType: string;
  posMismatch: {
    detectedPointOfSale: string;
    isPOSMismatch: boolean;
    offerSalesCountry: string;
  };
  includedProducts: FlightIncludedProducts;
  extraProducts: FlightExtraProduct[];
  offerExtras: FlightOfferExtras;
  ancillaries: FlightAncillaries;
  appliedDiscounts: unknown[];
  offerKeyToHighlight: string;
  seatAvailability?: FlightSeatAvailability;
  extraProductDisplayRequirements: Record<string, unknown>;
  brandedFareInfo?: FlightBrandedFareInfo;
};

export type FlightDeal = {
  key: "CHEAPEST" | "FASTEST" | "BEST" | string;
  offerToken: string;
  price: FlightMoneyAmount;
  travellerPrices: FlightTravellerPrice[];
};

export type FlightBaggagePolicy = {
  code: string;
  name: string;
  url: string;
};

export type SearchFlightsData = {
  aggregation: FlightsAggregation;
  flightOffers: FlightOffer[];
  flightDeals: FlightDeal[];
  atolProtectedStatus: string;
  isOffersCabinClassExtended: boolean;
  baggagePolicies: FlightBaggagePolicy[];
};

export type SearchFlightsResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: SearchFlightsData;
};

export type SearchFlightDestinationsParams = {
  query: string;
};

export type FlightDestinationDistanceToCity = {
  value: number;
  unit: string;
};

export type FlightDestination = {
  id: string;
  type: string;
  name: string;
  code: string;
  city?: string;
  cityName?: string;
  region?: string;
  regionName?: string;
  country: string;
  countryName: string;
  countryNameShort?: string;
  photoUri?: string;
  distanceToCity?: FlightDestinationDistanceToCity;
  parent?: string;
};

export type SearchFlightDestinationsResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data?: FlightDestination[];
};
