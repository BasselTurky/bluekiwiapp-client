import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

const giveawayHistory = createSlice({
  name: "giveawayHistory",
  initialState: { value: initialStateValue },
  reducers: {
    setHistory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHistory } = giveawayHistory.actions;

export default giveawayHistory.reducer;
