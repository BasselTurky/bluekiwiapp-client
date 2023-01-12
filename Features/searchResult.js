import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const searchResult = createSlice({
  name: "searchResult",
  initialState: { value: initialStateValue },
  reducers: {
    setSearchResult: (state, action) => {
      state.value = [...action.payload];
      //   state.value = [...state.value, ...action.payload];
    },
    updateSearchResult: (state, action) => {
      state.value[action.payload.index].fav = action.payload.value;
    },

    resetFavInSearchResult: (state, action) => {
      let result = state.value.findIndex(
        (item, index) => item.value === action.payload.value
      );

      if (result !== -1) {
        state.value[result].fav = false;
      }
    },
  },
});

export const { setSearchResult, updateSearchResult, resetFavInSearchResult } =
  searchResult.actions;

export default searchResult.reducer;
