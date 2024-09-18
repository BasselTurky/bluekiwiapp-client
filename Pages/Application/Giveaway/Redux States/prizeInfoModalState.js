import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const prizeInfoModalState = createSlice({
  name: "prizeInfoModalState",
  initialState: { value: initialStateValue },
  reducers: {
    displayInfoModal: (state, action) => {
      state.value = action.payload;
    },
    hideInfoModal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { displayInfoModal, hideInfoModal } = prizeInfoModalState.actions;

export default prizeInfoModalState.reducer;
