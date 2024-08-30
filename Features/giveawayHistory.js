import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

const giveawayHistory = createSlice({
  name: "giveawayHistory",
  initialState: {
    value: initialStateValue,
    reversed: null,
  },
  reducers: {
    setHistory: (state, action) => {
      state.value = action.payload;
      state.reversed = [...Object.values(action.payload)].reverse();
    },
  },
});

export const { setHistory } = giveawayHistory.actions;

export default giveawayHistory.reducer;
