import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const colorsArray = createSlice({
  name: "colorsArray",
  initialState: { value: initialStateValue },
  reducers: {
    addColor: (state, action) => {
      state.value.push(action.payload);
    },
    setColorsArray: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addColor, setColorsArray } = colorsArray.actions;

export default colorsArray.reducer;
