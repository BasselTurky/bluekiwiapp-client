import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const isWebviewLoaded = createSlice({
  name: "isWebviewLoaded",
  initialState: { value: initialStateValue },
  reducers: {
    setIsWebviewLoaded: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsWebviewLoaded } = isWebviewLoaded.actions;

export default isWebviewLoaded.reducer;
