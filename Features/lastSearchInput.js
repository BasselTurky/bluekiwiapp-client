import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

const lastSearchInput = createSlice({
  name: "lastSearchInput",
  initialState: { value: initialStateValue },
  reducers: {
    setLastSearchInput: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLastSearchInput } = lastSearchInput.actions;

export default lastSearchInput.reducer;
