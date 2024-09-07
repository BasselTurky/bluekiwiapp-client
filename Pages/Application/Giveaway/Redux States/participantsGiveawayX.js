import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const participantsGiveawayX = createSlice({
  name: "participantsGiveawayX",
  initialState: { value: initialStateValue, giveawayId: null },
  reducers: {
    setParticipantsX: (state, action) => {
      state.value = action.payload.participants;
      state.giveawayId = action.payload.giveawayId;
    },
    addParticipantsX: (state, action) => {
      if (state.value) {
        if (Array.isArray(action.payload)) {
          // If payload is an array, add all elements
          state.value.push(...action.payload);
        } else {
          // If payload is a single item, add it directly
          state.value.push(action.payload);
        }
      }
    },
  },
});

export const { setParticipantsX, addParticipantsX } =
  participantsGiveawayX.actions;

export default participantsGiveawayX.reducer;
