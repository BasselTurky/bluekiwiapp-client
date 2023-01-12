import { createSlice } from "@reduxjs/toolkit";

const initialStateVale = 1;

const searchPage = createSlice({
  name: "searchPage",
  initialState: { value: initialStateVale },
  reducers: {
    increasePageNumber: (state, action) => {
      state.value = state.value + 1;
    },
    resetPageNumber: (state, action) => {
      state.value = 1;
    },
  },
});

export const { increasePageNumber, resetPageNumber } = searchPage.actions;

export default searchPage.reducer;
