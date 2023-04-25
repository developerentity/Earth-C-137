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

const initialState: IEpisodesInitialState = {
  query: "",
  count: 0,
  page: 1,
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
  },
});

const { setCount, setEpisodes } = episodesSlice.actions;
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
        page: episodesSlice.page,
        name: episodesSlice.query,
      });
      dispatch(setCount(response.info.count));
      dispatch(setEpisodes(response.results));
    } catch (error) {
      return dispatch(setRequestError(error));
    }
  };
};

export default episodesSlice.reducer;
