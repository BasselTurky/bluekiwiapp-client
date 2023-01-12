import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = true;

const tipsMenuWallpaper = createSlice({
  name: "tipsMenuWallpaper",
  initialState: { value: initialStateValue },
  reducers: {
    setTipsMenuWallpaper: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTipsMenuWallpaper } = tipsMenuWallpaper.actions;

export default tipsMenuWallpaper.reducer;
