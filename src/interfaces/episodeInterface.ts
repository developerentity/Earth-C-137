import { ICharacter } from "./characterInterface";

export interface IEpisodesResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<IEpisode>;
}

export interface IEpisode {
  name: string;
  created: string;
  id: number;
  air_date: string;
  episode: string;
  url: string;
  characters: string[];
  residentsData: ICharacter[] | null;
}

export interface IEpisodesInitialState {
  query: string | undefined;
  count: number;
  page: number;
  perPage: number;
  episodes: Array<IEpisode>;
}
