import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setHistoryGiveaways, addHistoryGiveaaway } =
  historyGiveaways.actions;

export default historyGiveaways.reducer;
