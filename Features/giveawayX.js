import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const giveawayX = createSlice({
  name: "giveawayX",
  initialState: { value: initialStateValue },
  reducers: {
    setGiveawayX: (state, action) => {
      state.value = action.payload;
    },
    addUserToGiveawayListX: (state, action) => {
      state.value.participants.unshift(action.payload);
    },
  },
});

export const { setGiveawayX, addUserToGiveawayListX } = giveawayX.actions;

export default giveawayX.reducer;
