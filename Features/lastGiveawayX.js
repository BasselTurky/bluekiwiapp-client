import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const lastGiveawayX = createSlice({
  name: "lastGiveawayX",
  initialState: { value: initialStateValue },
  reducers: {
    setLastGiveawayX: (state, action) => {
      state.value = action.payload;
    },
    // addUserToGiveawayListX: (state, action) => {
    //   state.value.participants.unshift(action.payload);
    // },
  },
});

export const { setLastGiveawayX } = lastGiveawayX.actions;

export default lastGiveawayX.reducer;
