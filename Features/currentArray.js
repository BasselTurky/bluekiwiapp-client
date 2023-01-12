import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const currentArray = createSlice({
  name: "currentArray",
  initialState: { value: initialStateValue },
  reducers: {
    setCurrentArray: (state, action) => {
      state.value = action.payload;
    },
    updateCurrentArray: (state, action) => {
      state.value[action.payload.index].fav = action.payload.value;
    },
  },
});

export const { setCurrentArray, updateCurrentArray } = currentArray.actions;

export default currentArray.reducer;
