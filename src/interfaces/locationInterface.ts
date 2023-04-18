import { ICharacter } from "./characterInterface";

export interface ILocationsResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<ILocation>;
}

export interface ILocation {
  name: string;
  created: string;
  dimension: string;
  id: number;
  residents: string[];
  residentsData: ICharacter[] | null;
  type: string;
  url: string;
}

export interface ILocationsInitialState {
  query: string | undefined;
  count: number;
  page: number;
  perPage: number;
  locations: Array<ILocation>;
}