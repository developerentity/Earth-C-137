import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { ICharacter } from "../../interfaces/characterInterface";
import {
  ILocation,
  ILocationsInitialState,
} from "../../interfaces/locationInterface";
import { getDataByUrl } from "../../requests";
import { fetchLocations } from "../../requests/requests";
import { RootState } from "../store";
import { setRequestError } from "./errorsSlice";
import { setLoading } from "./loadingSlice";

const initialState: ILocationsInitialState = {
  query: "",
  count: 0,
  page: 0,
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

const { setCount, setLocations, setResidents } = locationsSlice.actions;
export const { setLocationsQuery, setLocationsPage } = locationsSlice.actions;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getLocations = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { locationsSlice } = getState();
    try {
      dispatch(setLoading(true));
      const response = await fetchLocations({
        page: locationsSlice.page + 1,
        name: locationsSlice.query,
      });
      dispatch(setCount(response.info.count));
      dispatch(setLocations(response.results));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setRequestError(error));
      dispatch(setLoading(false));
    }
  };
};

export const getResidentsForOneLocationById = (
  locationId: string | number
): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { locationsSlice } = getState();
    const oneLocationData = locationsSlice.locations?.find(
      (location: ILocation) => location.id === locationId
    );
    const residentsUrlArray = oneLocationData?.residents || [];

    if (oneLocationData?.residentsData) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const results = [];
      for (const url of residentsUrlArray) {
        const result = await getDataByUrl(url);
        results.push(result);
      }
      dispatch(
        setResidents({
          locationId,
          residentsData: results,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setRequestError(error));
      dispatch(setLoading(false));
    }
  };
};

export default locationsSlice.reducer;
