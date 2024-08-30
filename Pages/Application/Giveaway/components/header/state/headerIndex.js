import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 0;

const headerIndex = createSlice({
  name: "headerIndex",
  initialState: { value: initialStateValue },
  reducers: {
    setHeaderIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHeaderIndex } = headerIndex.actions;

export default headerIndex.reducer;
