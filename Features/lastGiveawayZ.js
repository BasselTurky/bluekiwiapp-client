import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const lastGiveawayZ = createSlice({
  name: "lastGiveawayZ",
  initialState: { value: initialStateValue },
  reducers: {
    setLastGiveawayZ: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLastGiveawayZ } = lastGiveawayZ.actions;

export default lastGiveawayZ.reducer;
