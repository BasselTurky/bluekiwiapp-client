import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const deleteAccountModal = createSlice({
  name: "deleteAccountModal",
  initialState: { value: initialStateValue },
  reducers: {
    setDeleteAccountModal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDeleteAccountModal } = deleteAccountModal.actions;

export default deleteAccountModal.reducer;
