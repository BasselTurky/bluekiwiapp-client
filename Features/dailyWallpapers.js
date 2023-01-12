import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  date: null,
  value: [],
};

const dailyWallpapers = createSlice({
  name: "dailyWallpapers",
  initialState: { value: initialStateValue },
  reducers: {
    setDailyWallpapers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDailyWallpapers } = dailyWallpapers.actions;

export default dailyWallpapers.reducer;
