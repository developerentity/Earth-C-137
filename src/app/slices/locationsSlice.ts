import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { ICharacter, ILocation } from "../../interfaces/characterInterface";
import { getDataByUrl } from "../../requests";
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
    setResidents(
      state,
      action: PayloadAction<{
        locationId: string | number;
        residentsData: ICharacter[];
      }>
    ) {
      state.locations = [
        ...state.locations.map((location) => {
          if (location.id === action.payload.locationId) {
            return { ...location, residentsData: action.payload.residentsData };
          } else {
            return location;
          }
        }),
      ];
    },
  },
});

export const { setLocationsQuery, setLocationsPage } = locationsSlice.actions;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getLocations = (): AppThunk<void> => {
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

export const getResidentsForOneLocationById = (
  locationId: string | number
): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { locations } = getState();
    const oneLocationData = locations.locations?.find(
      (location: ILocation) => location.id === locationId
    );
    const residentsUrlArray = oneLocationData?.residents || [];

    if (oneLocationData?.residentsData) {
      return
    } 

    try {
      const results = [];
      for (const url of residentsUrlArray) {
        const result = await getDataByUrl(url);
        results.push(result);
      }
      dispatch(
        locationsSlice.actions.setResidents({
          locationId,
          residentsData: results,
        })
      );
    } catch (error) {
      //   return dispatch(setRequestError(error));
    }
  };
};

export default locationsSlice.reducer;
