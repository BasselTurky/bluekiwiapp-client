import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

const urlData = createSlice({
  name: "urlData",
  initialState: { value: initialStateValue },
  reducers: {
    setUrlData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUrlData } = urlData.actions;

export default urlData.reducer;
