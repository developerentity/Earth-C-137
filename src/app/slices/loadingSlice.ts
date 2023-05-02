import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  appLoading: boolean;
};

const initialState: TInitialState = {
  appLoading: false,
};

const slice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.appLoading = action.payload;
    },
  },
});

export const { setLoading } = slice.actions;

export default slice.reducer;
