import { combineReducers } from "redux";
import errorsSlice from "./slices/errorsSlice";
import charactersSlice from "./slices/charactersSlice";
import locationsSlice from "./slices/locationsSlice";
import episodesSlice from "./slices/errorsSlice";

const rootReducer = combineReducers({
  errorsSlice,
  charactersSlice,
  locationsSlice,
  episodesSlice,
});

export default rootReducer;
