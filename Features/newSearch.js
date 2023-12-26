import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const newSearch = createSlice({
  name: "newSearch",
  initialState: { value: initialStateValue },
  reducers: {
    setNewSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNewSearch } = newSearch.actions;

export default newSearch.reducer;
