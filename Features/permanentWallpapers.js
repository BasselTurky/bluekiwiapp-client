import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  date: null,
  value: {},
};

const permanentWallpapers = createSlice({
  name: "permanentWallpapers",
  initialState: { value: initialStateValue },
  reducers: {
    setPermanentWallpapers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPermanentWallpapers } = permanentWallpapers.actions;

export default permanentWallpapers.reducer;
