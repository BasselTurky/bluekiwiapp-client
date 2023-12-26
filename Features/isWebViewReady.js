import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const isWebViewReady = createSlice({
  name: "isWebViewReady",
  initialState: { value: initialStateValue },
  reducers: {
    setIsWebViewReady: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsWebViewReady } = isWebViewReady.actions;

export default isWebViewReady.reducer;
