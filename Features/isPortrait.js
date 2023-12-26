import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const isPortrait = createSlice({
  name: "isPortrait",
  initialState: { value: initialStateValue },
  reducers: {
    setIsPortrait: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsPortrait } = isPortrait.actions;

export default isPortrait.reducer;
