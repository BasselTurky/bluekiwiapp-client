import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = true;

const tipsMenu = createSlice({
  name: "tipsMenu",
  initialState: { value: initialStateValue },
  reducers: {
    setTipsMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTipsMenu } = tipsMenu.actions;

export default tipsMenu.reducer;
