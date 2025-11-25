export interface CurrenciesResponse {
  data: {
    name: string;
    code: string;
    encodedSymbol: string;
  }[];
}

export interface LanguagesResponse {
  data: {
    name: string;
    code: string;
    countryFlag: string;
  }[];
}

export interface LocationsResponse {
  data: string[];
}
