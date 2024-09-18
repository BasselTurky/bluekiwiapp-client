import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const selectedGiveaway = createSlice({
  name: "selectedGiveaway",
  initialState: { value: initialStateValue },
  reducers: {
    setSelectedGiveaway: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedGiveaway } = selectedGiveaway.actions;

export default selectedGiveaway.reducer;
