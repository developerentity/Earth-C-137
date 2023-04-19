import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { enqueueSnackbar } from "notistack";

const initialState: any = {
  messages: [],
};

const slice = createSlice({
  name: "errorsSlice",
  initialState,
  reducers: {
    setErrors(state, action) {
      state.messages = action.payload;
    },
  },
});

export default slice.reducer;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const setRequestError = (err: any): AppThunk<void> => {
  return (dispatch, getState) => {
    if (err.data) {
      const message = Object.values(err.data).join("\n");
      enqueueSnackbar(message, { variant: "error" });
    }
    const { errorsSlice } = getState();
    dispatch(slice.actions.setErrors([...errorsSlice.messages, err]));
  };
};
