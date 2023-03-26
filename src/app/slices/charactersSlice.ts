import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { ICharacter } from "../../interfaces/characterInterface";
import { fetchCharacters } from "../../requests/characters";
import { RootState } from "../store";

interface IInitialState {
  count: number;
  page: number;
  perPage: number;
  characters: Array<ICharacter>;
}

const initialState: IInitialState = {
  count: 0,
  page: 1,
  perPage: 20,
  characters: [],
};

const charactersSlice = createSlice({
  name: "charactersSlice",
  initialState,
  reducers: {
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

export const { setCount, setPage, setCharacters } = charactersSlice.actions;

export const getCharacters = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const { characters } = getState();
    try {
      const response = await fetchCharacters({page: characters.page});
      dispatch(setCount(response.info.count));
      dispatch(setCharacters(response.results));
    } catch (error) {
      //   return dispatch(setRequestError(error));
    }
  };
};

export default charactersSlice.reducer;
