import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICharacter } from "../../interfaces/characterInterface";
import { fetchCharacters } from "../../requests/characters";

interface IInitialState {
  count: number;
  pages: number;
  prevPage: string | null;
  nextPage: string | null;
  perPage: number;
  characters: Array<ICharacter>;
}

const initialState: IInitialState = {
  count: 0,
  pages: 0,
  prevPage: "",
  nextPage: "",
  perPage: 20,
  characters: [],
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setPages(state, action: PayloadAction<number>) {
      state.pages = action.payload;
    },
    setPrevPage(state, action: PayloadAction<string | null>) {
      state.prevPage = action.payload;
    },
    setNextPage(state, action: PayloadAction<string | null>) {
      state.nextPage = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    setCharacters(state, action: PayloadAction<Array<ICharacter>>) {
      state.characters = [...action.payload];
    },
  },
});

const {
  setCount,
  setPages,
  setPrevPage,
  setNextPage,
  setPerPage,
  setCharacters,
} = charactersSlice.actions;

export const getCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (_, { dispatch }) => {
    // dispatch({ type: "FETCH_CHARACTERS_REQUEST" });
    try {
      const response = await fetchCharacters();
      dispatch(setCount(response.info.count));
      dispatch(setPages(response.info.pages));
      dispatch(setPrevPage(response.info.prev));
      dispatch(setNextPage(response.info.next));
      dispatch(setCharacters(response.results));
    } catch (error) {
      //   return dispatch(setRequestError(error));
    }
  }
);

export default charactersSlice.reducer;
