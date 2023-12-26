import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = true;

const available = createSlice({
  name: "available",
  initialState: { value: initialStateValue },
  reducers: {
    setAvailable: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAvailable } = available.actions;

export default available.reducer;
