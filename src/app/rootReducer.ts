import { combineReducers } from "redux";
import errorsSlice from "./slices/errorsSlice";
import charactersSlice from "./slices/charactersSlice";
import locationsSlice from "./slices/locationsSlice";
import episodesSlice from "./slices/episodesSlice";
import loadingSlice from "./slices/loadingSlice";

const rootReducer = combineReducers({
  loadingSlice,
  errorsSlice,
  charactersSlice,
  locationsSlice,
  episodesSlice,
});

export default rootReducer;
