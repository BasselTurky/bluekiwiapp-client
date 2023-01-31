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

    updateDownload_dailyWallpapers: (state, action) => {
      // get wallpaper id
      // loop through the array
      // find image with same Id
      // update downloads +1

      for (let i = 0; i < state.value.value.length; i++) {
        if (state.value.value[i].wallpaper_id === action.payload) {
          state.value.value[i].downloads = state.value.value[i].downloads + 1;
        }
      }
    },
  },
});

export const { setDailyWallpapers, updateDownload_dailyWallpapers } =
  dailyWallpapers.actions;

export default dailyWallpapers.reducer;
