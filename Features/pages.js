import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  current: "",
  total: "",
};

const pages = createSlice({
  name: "pages",
  initialState: { value: initialStateValue },
  reducers: {
    setPages: (state, action) => {
      state.value.current = action.payload.current;
      state.value.total = action.payload.total;
    },
  },
});

export const { setPages } = pages.actions;

export default pages.reducer;
