import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  image_api: 0,
  wallpaper_api: 0,
  archive_api: 0,
  giveaways: 0,
};

const userApis = createSlice({
  name: "userApis",
  initialState: { value: initialStateValue },
  reducers: {
    setUserApis: (state, action) => {
      state.value = action.payload;
    },
    updateUserApis: (state, action) => {
      if (state.value) {
        state.value[action.payload.api] = action.payload.booleanValue;
      }
    },
  },
});

export const { setUserApis, updateUserApis } = userApis.actions;

export default userApis.reducer;
