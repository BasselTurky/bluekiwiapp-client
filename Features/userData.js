import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const userData = createSlice({
  name: "userData",
  initialState: { value: initialStateValue },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserData } = userData.actions;

export default userData.reducer;
