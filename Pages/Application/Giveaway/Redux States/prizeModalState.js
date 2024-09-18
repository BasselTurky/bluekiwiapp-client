import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const prizeModalState = createSlice({
  name: "prizeModalState",
  initialState: { value: initialStateValue },
  reducers: {
    displayPrizeModal: (state, action) => {
      state.value = action.payload;
    },
    hidePrizeModal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { displayPrizeModal, hidePrizeModal } = prizeModalState.actions;

export default prizeModalState.reducer;
