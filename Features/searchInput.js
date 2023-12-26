import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

const searchInput = createSlice({
  name: "searchInput",
  initialState: { value: initialStateValue },

  reducers: {
    setSearchInput: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchInput } = searchInput.actions;

export default searchInput.reducer;
