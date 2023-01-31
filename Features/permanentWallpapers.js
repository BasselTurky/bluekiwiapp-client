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
    updateDownloads_permanentWallpapers: (state, action) => {
      for (
        let i = 0;
        i < state.value.value[action.payload.year][action.payload.month].length;
        i++
      ) {
        if (
          state.value.value[action.payload.year][action.payload.month][i]
            .wallpaper_id === action.payload.wallpaper_id
        ) {
          state.value.value[action.payload.year][action.payload.month][
            i
          ].downloads =
            state.value.value[action.payload.year][action.payload.month][i]
              .downloads + 1;
        }
      }
    },
  },
});

export const { setPermanentWallpapers, updateDownloads_permanentWallpapers } =
  permanentWallpapers.actions;

export default permanentWallpapers.reducer;
