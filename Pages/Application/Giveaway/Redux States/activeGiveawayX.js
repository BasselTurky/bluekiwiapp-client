import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

// valeu : { info: {id:int, date:DATE, status:'active'/'ended' , type: 'x'}, isUserParticipant: boolean }

const activeGiveawayX = createSlice({
  name: "activeGiveawayX",
  initialState: { value: initialStateValue },
  reducers: {
    setActiveGiveawayX: (state, action) => {
      state.value = {
        info: action.payload.giveaway,
        isUserParticipant: action.payload.isParticipant ?? false,
      };
    },
    updateIsUserParticipantX: (state, action) => {
      if (state.value) {
        state.value.isUserParticipant = action.payload ?? false;
      }
    },
  },
});

export const { setActiveGiveawayX, updateIsUserParticipantX } =
  activeGiveawayX.actions;

export default activeGiveawayX.reducer;
