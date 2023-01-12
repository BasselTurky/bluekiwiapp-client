import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const previousArray = createSlice({
  name: "previousArray",
  initialState: { value: initialStateValue },
  reducers: {
    setPreviousArray: (state, action) => {
      state.value = action.payload;
    },
    updatePreviousArray: (state, action) => {
      state.value[action.payload.index].fav = action.payload.value;
    },
  },
});

export const { setPreviousArray, updatePreviousArray } = previousArray.actions;

export default previousArray.reducer;
