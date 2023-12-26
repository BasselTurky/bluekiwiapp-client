import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "gallery";

const active = createSlice({
  name: "active",
  initialState: { value: initialStateValue },
  reducers: {
    setActive: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActive } = active.actions;

export default active.reducer;
