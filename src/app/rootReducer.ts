import { combineReducers } from "redux";
import charactersSlice from "./slices/charactersSlice";

const rootReducer = combineReducers({
  characters: charactersSlice,
});

export default rootReducer;
