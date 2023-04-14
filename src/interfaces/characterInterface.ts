export interface ICharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<ICharacter>;
}

export interface ILocationsResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<ILocation>;
}

export interface ICharacter {
  id: number | string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export interface ILocation {
  name: string;
  created: string;
  dimension: string;
  id: number;
  residents: string[];
  type: string;
  url: string;
}
