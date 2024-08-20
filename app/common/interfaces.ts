export interface ICountry {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
}

export interface ICountriesResponse {
  error: boolean;
  msg: string;
  data: ICountry[];
}
