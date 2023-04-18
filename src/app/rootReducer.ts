import { combineReducers } from "redux";
import charactersSlice from "./slices/charactersSlice";
import locationsSlice from "./slices/locationsSlice";

const rootReducer = combineReducers({
  charactersSlice,
  locationsSlice,
});

export default rootReducer;
