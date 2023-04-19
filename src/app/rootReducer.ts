import { combineReducers } from "redux";
import errorsSlice from "./slices/errorsSlice";
import charactersSlice from "./slices/charactersSlice";
import locationsSlice from "./slices/locationsSlice";

const rootReducer = combineReducers({
  errorsSlice,
  charactersSlice,
  locationsSlice,
});

export default rootReducer;
