export interface ICharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<ICharacter>;
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

export interface ICharactersInitialState {
  query: string | undefined;
  count: number;
  page: number;
  perPage: number;
  characters: Array<ICharacter>;
}