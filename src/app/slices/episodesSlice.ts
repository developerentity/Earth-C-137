import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { fetchEpisodes } from "../../requests/requests";
import { RootState } from "../store";
import { setRequestError } from "./errorsSlice";
import {
  IEpisode,
  IEpisodesInitialState,
} from "../../interfaces/episodeInterface";
import { getDataByUrl } from "../../requests";
import { ICharacter } from "../../interfaces/characterInterface";

const initialState: IEpisodesInitialState = {
  query: "",
  count: 0,
  page: 0,
  perPage: 20,
  episodes: [],
};

const episodesSlice = createSlice({
  name: "episodesSlice",
  initialState,
  reducers: {
    setEpisodesQuery(state, action: PayloadAction<string | undefined>) {
      state.query = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setEpisodesPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    setEpisodes(state, action: PayloadAction<Array<IEpisode>>) {
      state.episodes = [...action.payload];
    },
    setCharacters(
      state,
      action: PayloadAction<{
        episodeId: string | number;
        residentsData: ICharacter[];
      }>
    ) {
      state.episodes = [
        ...state.episodes.map((episode) => {
          if (episode.id === action.payload.episodeId) {
            return { ...episode, residentsData: action.payload.residentsData };
          } else {
            return episode;
          }
        }),
      ];
    },
  },
});

const { setCount, setEpisodes, setCharacters } = episodesSlice.actions;
export const { setEpisodesQuery, setEpisodesPage } = episodesSlice.actions;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getEpisodes = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { episodesSlice } = getState();
    try {
      const response = await fetchEpisodes({
        page: episodesSlice.page + 1,
        name: episodesSlice.query,
      });
      dispatch(setCount(response.info.count));
      dispatch(setEpisodes(response.results));
    } catch (error) {
      return dispatch(setRequestError(error));
    }
  };
};

export const getResidentsForOneEpisodeById = (
  episodeId: string | number
): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { episodesSlice } = getState();
    const oneEpisodeData = episodesSlice.episodes?.find(
      (episode: IEpisode) => episode.id === episodeId
    );
    const residentsUrlArray = oneEpisodeData?.characters || [];

    if (oneEpisodeData?.residentsData) {
      return;
    }

    try {
      const results = [];
      for (const url of residentsUrlArray) {
        const result = await getDataByUrl(url);
        results.push(result);
      }
      dispatch(
        setCharacters({
          episodeId,
          residentsData: results,
        })
      );
    } catch (error) {
      return dispatch(setRequestError(error));
    }
  };
};

export default episodesSlice.reducer;
