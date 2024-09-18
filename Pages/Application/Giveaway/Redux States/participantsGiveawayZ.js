import { createSlice } from "@reduxjs/toolkit";
import { globalReset } from "../../../../GlobalActions-Redux/globalActions";

const initialStateValue = null;

const participantsGiveawayZ = createSlice({
  name: "participantsGiveawayZ",
  initialState: { value: initialStateValue, giveawayId: initialStateValue },
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
  extraReducers: (builder) => {
    builder.addCase(globalReset, (state) => {
      state.value = initialStateValue;
      state.giveawayId = initialStateValue;
    });
  },
});

export const { setParticipantsZ, addParticipantsZ } =
  participantsGiveawayZ.actions;

export default participantsGiveawayZ.reducer;
