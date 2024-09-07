import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const participantsGiveawayZ = createSlice({
  name: "participantsGiveawayZ",
  initialState: { value: initialStateValue, giveawayId: null },
  reducers: {
    setParticipantsZ: (state, action) => {
      state.value = action.payload.participants;
      state.giveawayId = action.payload.giveawayId;
    },
    addParticipantsZ: (state, action) => {
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

export const { setParticipantsZ, addParticipantsZ } =
  participantsGiveawayZ.actions;

export default participantsGiveawayZ.reducer;
