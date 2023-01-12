import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const loadedAd = createSlice({
  name: "loadedAd",
  initialState: { value: initialStateValue },
  reducers: {
    setLoadedAd: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoadedAd } = loadedAd.actions;

export default loadedAd.reducer;
