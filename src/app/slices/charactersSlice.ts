import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  ICharacter,
  ICharactersInitialState,
} from "../../interfaces/characterInterface";
import { fetchCharacters } from "../../requests/requests";
import { RootState } from "../store";

const initialState: ICharactersInitialState = {
  query: "",
  count: 0,
  page: 1,
  perPage: 20,
  characters: [],
};

const charactersSlice = createSlice({
  name: "charactersSlice",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string | undefined>) {
      state.query = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    setCharacters(state, action: PayloadAction<Array<ICharacter>>) {
      state.characters = [...action.payload];
    },
  },
});

export const { setQuery, setCount, setPage, setCharacters } =
  charactersSlice.actions;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getCharacters = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { charactersSlice } = getState();
    try {
      const response = await fetchCharacters({
        page: charactersSlice.page,
        name: charactersSlice.query,
      });
      dispatch(setCount(response.info.count));
      dispatch(setCharacters(response.results));
    } catch (error) {
      //   return dispatch(setRequestError(error));
    }
  };
};

export default charactersSlice.reducer;
