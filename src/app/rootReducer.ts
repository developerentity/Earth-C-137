import { combineReducers } from "redux";
import charactersSlice from "./slices/charactersSlice";
import locationsSlice from "./slices/locationsSlice";

const rootReducer = combineReducers({
  characters: charactersSlice,
  locations: locationsSlice,
});

export default rootReducer;
