import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const giveawayZ = createSlice({
  name: "giveawayZ",
  initialState: { value: initialStateValue },
  reducers: {
    setGiveawayZ: (state, action) => {
      state.value = action.payload;
    },
    addUserToGiveawayListZ: (state, action) => {
      state.value.participants.unshift(action.payload);
    },
  },
});

export const { setGiveawayZ, addUserToGiveawayListZ } = giveawayZ.actions;

export default giveawayZ.reducer;
