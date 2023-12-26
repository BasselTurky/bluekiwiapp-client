import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const isLoading = createSlice({
  name: "isLoading",
  initialState: { value: initialStateValue },
  reducers: {
    setIsLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoading } = isLoading.actions;

export default isLoading.reducer;
