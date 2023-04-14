import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { ILocation } from "../../interfaces/characterInterface";
import { fetchLocations } from "../../requests/requests";
import { RootState } from "../store";

interface IInitialState {
  query: string | undefined;
  count: number;
  page: number;
  perPage: number;
  locations: Array<ILocation>;
}

const initialState: IInitialState = {
  query: "",
  count: 0,
  page: 1,
  perPage: 20,
  locations: [],
};

const locationsSlice = createSlice({
  name: "locationsSlice",
  initialState,
  reducers: {
    setLocationsQuery(state, action: PayloadAction<string | undefined>) {
      state.query = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setLocationsPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLocations(state, action: PayloadAction<Array<ILocation>>) {
      state.locations = [...action.payload];
    },
  },
});

export const { setLocationsQuery, setLocationsPage } = locationsSlice.actions;

export const getLocations = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch, getState) => {
    const { locations } = getState();
    try {
      const response = await fetchLocations({
        page: locations.page,
        name: locations.query,
      });
      dispatch(locationsSlice.actions.setCount(response.info.count));
      dispatch(locationsSlice.actions.setLocations(response.results));
    } catch (error) {
      //   return dispatch(setRequestError(error));
    }
  };
};

export default locationsSlice.reducer;
