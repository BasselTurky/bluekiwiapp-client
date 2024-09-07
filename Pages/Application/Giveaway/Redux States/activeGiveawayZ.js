import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

// valeu : { info: {id:int, date:DATE, status:'active'/'ended' , type: 'x'}, isUserParticipant: boolean }

const activeGiveawayZ = createSlice({
  name: "activeGiveawayZ",
  initialState: { value: initialStateValue },
  reducers: {
    setActiveGiveawayZ: (state, action) => {
      state.value = {
        info: action.payload.giveaway,
        isUserParticipant: action.payload.isParticipant ?? false,
      };
    },
    updateIsUserParticipantZ: (state, action) => {
      if (state.value) {
        state.value.isUserParticipant = action.payload ?? false;
      }
    },
  },
});

export const { setActiveGiveawayZ, updateIsUserParticipantZ } =
  activeGiveawayZ.actions;

export default activeGiveawayZ.reducer;
