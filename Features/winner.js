import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 0;

const winner = createSlice({
  name: "winner",
  initialState: { value: initialStateValue },
  reducers: {
    setWinner: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setWinner } = winner.actions;

export default winner.reducer;
