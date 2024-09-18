import { createSlice } from "@reduxjs/toolkit";
import { globalReset } from "../../../../GlobalActions-Redux/globalActions";

const initialStateValue = null;

const historyGiveaways = createSlice({
  name: "historyGiveaways",
  initialState: { value: initialStateValue },
  reducers: {
    setHistoryGiveaways: (state, action) => {
      state.value = action.payload;
    },
    addHistoryGiveaaway: (state, action) => {
      if (state.value) {
        state.value.push(action.payload);
      }
    },
    updateHistoryGiveaway: (state, action) => {
      const { giveawayId, key, value } = action.payload;

      if (state.value) {
        const giveaway = state.value.find((g) => g.giveawayId === giveawayId);

        if (giveaway && (key === "received" || key === "inProgress")) {
          giveaway[key] = value; // Dynamically updating either 'received' or 'inProgress'
        }
      }
    },
    resetHistoryGiveaway: (state, action) => {
      state.value = initialStateValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(globalReset, (state) => {
      state.value = initialStateValue;
    });
  },
});

export const {
  setHistoryGiveaways,
  addHistoryGiveaaway,
  updateHistoryGiveaway,
  resetHistoryGiveaway,
} = historyGiveaways.actions;

export default historyGiveaways.reducer;
