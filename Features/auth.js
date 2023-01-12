import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const auth = createSlice({
  name: "auth",
  initialState: { value: initialStateValue },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuth } = auth.actions;

export default auth.reducer;
